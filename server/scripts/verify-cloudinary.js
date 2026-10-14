import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { createApp } from '../src/app.js';
import { cloudinaryConfig, createCloudinaryClient, createMediaStorage } from '../src/media-storage.js';

const config = cloudinaryConfig();
if (!config) throw new Error('Set CLOUDINARY_URL in server/.env first');
const directory = await mkdtemp(join(tmpdir(), 'blueprint-cloudinary-check-'));
let app;
try {
  app = await createApp({ dataDir: directory, production: false, allowSetup: true });
  const setup = await app.inject({ method: 'POST', url: '/api/v1/admin/auth/setup', payload: { email: 'cloudinary-check@example.test', password: 'temporary-cloudinary-check-password' } });
  const headers = { cookie: setup.headers['set-cookie'].split(';')[0], 'x-csrf-token': setup.json().csrf };
  const image = await sharp({ create: { width: 40, height: 20, channels: 3, background: '#123456' } }).png().toBuffer();
  const boundary = 'blueprint-cloudinary-check';
  const payload = Buffer.concat([Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="cloudinary-check.png"\r\nContent-Type: image/png\r\n\r\n`), image, Buffer.from(`\r\n--${boundary}--\r\n`)]);
  const uploaded = await app.inject({ method: 'POST', url: '/api/v1/admin/media', headers: { ...headers, 'content-type': `multipart/form-data; boundary=${boundary}` }, payload });
  assert.equal(uploaded.statusCode, 201, 'CMS upload failed');
  const asset = uploaded.json();
  assert.equal((await app.inject(asset.url)).statusCode, 404, 'Draft photograph must remain private');
  for (const width of [320, 640, 1280, 1920]) {
    const preview = await app.inject({ url: `/api/v1/admin/media-file/${asset.id}/${width}.webp`, headers });
    assert.equal(preview.statusCode, 200, 'Cloudinary preview download failed');
    assert.equal((await sharp(preview.rawPayload).metadata()).format, 'webp');
  }
  const draft = (await app.inject({ url: '/api/v1/admin/draft', headers })).json();
  draft.content.projects[0].heroImage = asset.url;
  assert.equal((await app.inject({ method: 'PUT', url: '/api/v1/admin/draft', headers, payload: { version: draft.version, content: draft.content } })).statusCode, 200);
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/admin/publish', headers, payload: { version: draft.version + 1 } })).statusCode, 200);
  const publicImage = await app.inject(asset.url);
  assert.equal(publicImage.statusCode, 200, 'Published Cloudinary download failed');
  assert.equal((await sharp(publicImage.rawPayload).metadata()).format, 'webp');
  assert.equal((await app.inject({ method: 'DELETE', url: `/api/v1/admin/media/${asset.id}`, headers })).statusCode, 409);
  console.log('Verified real Cloudinary CMS upload, all four previews, draft privacy, publication delivery and reference protection.');
} catch {
  console.error('Cloudinary verification failed. Check the cloud name, API key/secret, account permissions and connectivity. No credentials were printed.');
  process.exitCode = 1;
} finally {
  if (app) {
    const storage = createMediaStorage(app.db, join(directory, 'media'), createCloudinaryClient(config));
    for (const { key } of app.db.prepare('SELECT key FROM cloud_media').all()) {
      try { await storage.delete(key); }
      catch { console.error('A temporary verification asset could not be deleted. Remove blueprint verification assets in Cloudinary.'); process.exitCode = 1; }
    }
    await app.close();
  }
  await rm(directory, { recursive: true, force: true });
}
