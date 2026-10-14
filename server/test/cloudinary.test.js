import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, mkdir, writeFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { createApp } from '../src/app.js';
import { cloudinaryConfig, createMediaStorage } from '../src/media-storage.js';
import { migrateMedia } from '../src/migrate-media.js';

function fakeCloud() {
  const files = new Map();
  return {
    files, uploads: 0, failUpload: 0, failDelete: false, failRead: false,
    async upload(buffer, publicId) {
      this.uploads++;
      if (this.uploads === this.failUpload) throw new Error('Upload unavailable');
      files.set(publicId, buffer);
      return { publicId, format: 'webp', bytes: buffer.length };
    },
    async read(asset) { if (this.failRead || !files.has(asset.publicId)) throw new Error('Read unavailable'); return files.get(asset.publicId); },
    async destroy(asset) { if (this.failDelete) throw new Error('Delete unavailable'); files.delete(asset.publicId); }
  };
}

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'blueprint-cloud-tests-'));
  const cloud = fakeCloud();
  const app = await createApp({ dataDir: directory, cloudinaryUrl: '', cloudinaryClient: cloud });
  t.after(async () => { await app.close(); await rm(directory, { recursive: true, force: true }); });
  const setup = await app.inject({ method: 'POST', url: '/api/v1/admin/auth/setup', payload: { email: 'test@example.test', password: 'cloudinary-test-password' } });
  const headers = { cookie: setup.headers['set-cookie'].split(';')[0], 'x-csrf-token': setup.json().csrf };
  const request = (method, url, payload) => app.inject({ method, url, headers, payload });
  const image = await sharp({ create: { width: 40, height: 20, channels: 3, background: '#123456' } }).png().toBuffer();
  const boundary = 'cloud-test-boundary';
  const payload = Buffer.concat([Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="sample.png"\r\nContent-Type: image/png\r\n\r\n`), image, Buffer.from(`\r\n--${boundary}--\r\n`)]);
  const upload = () => app.inject({ method: 'POST', url: '/api/v1/admin/media', headers: { ...headers, 'content-type': `multipart/form-data; boundary=${boundary}` }, payload });
  return { app, cloud, directory, request, upload, image, headers };
}

test('Cloudinary credentials are validated without exposing their values', () => {
  assert.equal(cloudinaryConfig(''), null);
  assert.equal(cloudinaryConfig('cloudinary://key:secret@example').cloud_name, 'example');
  assert.throws(() => cloudinaryConfig('https://key:secret@example'), { message: 'CLOUDINARY_URL must contain the cloud name, API key and API secret' });
});

test('Cloudinary serves every CMS image field, protects drafts/history and survives an app restart', async t => {
  const { app, cloud, directory, request, upload, headers } = await fixture(t);
  const uploaded = await upload(); assert.equal(uploaded.statusCode, 201, uploaded.body);
  const asset = uploaded.json(); assert.equal(cloud.files.size, 4);
  assert.deepEqual(await readdir(join(directory, 'media')), []);
  const library = (await request('GET', '/api/v1/admin/media')).json().items;
  assert.ok(library.some(item => item.url === asset.url && item.thumbnail === asset.thumbnail));
  assert.equal((await app.inject(asset.url)).statusCode, 404);
  assert.equal((await app.inject(asset.url.replace('/media/', '/api/v1/admin/media-file/'))).statusCode, 401);
  for (const width of [320, 640, 1280, 1920]) {
    const preview = await request('GET', `/api/v1/admin/media-file/${asset.id}/${width}.webp`);
    assert.equal(preview.statusCode, 200); assert.equal(preview.headers['cache-control'], 'no-store');
    assert.equal((await sharp(preview.rawPayload).metadata()).format, 'webp');
  }
  const draft = (await request('GET', '/api/v1/admin/draft')).json();
  // Replace every existing photograph field, including galleries, drawings,
  // renders, stories, comparisons, team and SEO, through the same library URL.
  const replace = value => typeof value === 'string' ? value.startsWith('/assets/') ? asset.url : value : Array.isArray(value) ? value.map(replace) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replace(item)])) : value;
  draft.content = replace(draft.content);
  assert.equal((await request('PUT', '/api/v1/admin/draft', { version: draft.version, content: draft.content })).statusCode, 200);
  assert.equal((await request('POST', '/api/v1/admin/publish', { version: draft.version + 1 })).statusCode, 200);
  assert.equal((await app.inject('/api/v1/public/site')).json().content.team[0].image, asset.url);
  assert.equal((await app.inject(`/api/v1/public/projects/${draft.content.projects[0].id}`)).json().project.heroImage, asset.url);
  assert.equal((await app.inject(asset.url)).statusCode, 200);
  assert.equal((await request('DELETE', `/api/v1/admin/media/${asset.id}`)).statusCode, 409);
  cloud.failRead = true; assert.equal((await app.inject(asset.url)).statusCode, 502); cloud.failRead = false;
  await request('POST', '/api/v1/admin/restore/1', { version: draft.version + 1 });
  await request('POST', '/api/v1/admin/publish', { version: draft.version + 2 });
  assert.equal((await app.inject(asset.url)).statusCode, 404);
  assert.equal((await request('DELETE', `/api/v1/admin/media/${asset.id}`)).statusCode, 409);
  // A second instance reads the persisted cloud mapping, with no local variants.
  const restarted = await createApp({ dataDir: directory, cloudinaryUrl: '', cloudinaryClient: cloud });
  try { assert.equal((await restarted.inject({ url: asset.url.replace('/media/', '/api/v1/admin/media-file/'), headers })).statusCode, 200); }
  finally { await restarted.close(); }
});

test('partial Cloudinary uploads roll back and failed deletion keeps a retryable library record', async t => {
  const { app, cloud, request, upload } = await fixture(t);
  cloud.failUpload = 3;
  assert.equal((await upload()).statusCode, 502);
  assert.equal(cloud.files.size, 0); assert.equal(app.db.prepare('SELECT COUNT(*) AS count FROM media').get().count, 0);
  assert.equal(app.db.prepare('SELECT COUNT(*) AS count FROM cloud_media').get().count, 0);
  cloud.failUpload = 0;
  const asset = (await upload()).json();
  cloud.failDelete = true;
  assert.equal((await request('DELETE', `/api/v1/admin/media/${asset.id}`)).statusCode, 502);
  assert.ok(app.db.prepare('SELECT id FROM media WHERE id=?').get(asset.id));
  cloud.failDelete = false;
  assert.equal((await request('DELETE', `/api/v1/admin/media/${asset.id}`)).statusCode, 200);
  assert.equal(cloud.files.size, 0); assert.equal(app.db.prepare('SELECT COUNT(*) AS count FROM cloud_media').get().count, 0);
});

test('existing uploads and seed photographs migrate idempotently without changing content or removing local files', async t => {
  const { app, cloud, directory, image } = await fixture(t);
  const id = '12345678-1234-1234-1234-123456789abc';
  await mkdir(join(directory, 'media', id));
  const webp = await sharp(image).webp().toBuffer();
  for (const width of [320, 640, 1280, 1920]) await writeFile(join(directory, 'media', id, `${width}.webp`), webp);
  app.db.prepare('INSERT INTO media VALUES(?,?,?,?,?,?,?)').run(id, 'existing.png', 'image/webp', webp.length * 4, 40, 20, new Date().toISOString());
  const assets = join(directory, 'assets');
  for (const folder of ['projects', 'team']) { await mkdir(join(assets, folder), { recursive: true }); await writeFile(join(assets, folder, 'existing.png'), image); }
  const draftBefore = app.db.prepare('SELECT content FROM draft').get().content;
  const storage = createMediaStorage(app.db, join(directory, 'media'), cloud);
  assert.deepEqual(await migrateMedia(app.db, storage, join(directory, 'media'), assets), { migrated: 3, skipped: 0 });
  assert.deepEqual(await migrateMedia(app.db, storage, join(directory, 'media'), assets), { migrated: 0, skipped: 3 });
  assert.equal(app.db.prepare('SELECT content FROM draft').get().content, draftBefore);
  assert.equal((await readdir(join(directory, 'media', id))).length, 4);
  const result = await app.inject('/assets/team/existing.png');
  assert.equal(result.statusCode, 200); assert.equal((await sharp(result.rawPayload).metadata()).format, 'webp');
  assert.equal((await app.inject('/assets/team/%2e%2e%2f.env')).statusCode, 404);
});
