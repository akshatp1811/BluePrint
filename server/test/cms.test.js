import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { createApp } from '../src/app.js';
import { createSeed } from '../src/seed.js';
import { validateContent } from '../src/validation.js';
import * as original from '../../src/data/seed.js';

async function fixture(t, options = {}) {
  const dataDir = await mkdtemp(join(tmpdir(), 'blueprint-cms-test-'));
  const app = await createApp({ dataDir, ...options });
  t.after(async () => { await app.close(); await rm(dataDir, { recursive: true, force: true }); });
  const response = await app.inject({ method: 'POST', url: '/api/v1/admin/auth/setup', payload: { email: 'owner@example.test', password: 'a-secure-test-password' } });
  const cookie = response.headers['set-cookie']?.split(';')[0]; const csrf = response.json().csrf;
  const request = (method, url, payload, extra = {}) => app.inject({ method, url, payload, headers: { cookie, 'x-csrf-token': csrf, ...extra } });
  return { app, dataDir, request, cookie, csrf };
}

test('seed preserves every original project, studio value and initial visible selection', () => {
  const seed = createSeed(); assert.equal(seed.projects.length, 7); assert.equal(seed.team.length, 6);
  for (const [key, value] of Object.entries(original)) {
    if (key === 'projects') assert.deepEqual(seed.projects.map(({ _key, heroAlt, hidden, ...p }) => p), value);
    else assert.deepEqual(seed[key], value);
  }
  assert.deepEqual(seed.copy.home.featuredIds, original.projects.slice(0, 3).map(p => p.id));
  assert.equal(seed.copy.about.visibleTeamCount, 4);
  assert.deepEqual(seed.categories, ['Interiors', 'Architecture', 'Commercial']);
  assert.deepEqual(validateContent(seed, true), []);
});

test('private drafts require authentication and writes require CSRF', async t => {
  const { app, cookie } = await fixture(t);
  assert.equal((await app.inject('/api/v1/admin/draft')).statusCode, 401);
  assert.equal((await app.inject('/api/v1/admin/preview')).statusCode, 401);
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/admin/publish', payload: { version: 1 }, headers: { cookie } })).statusCode, 403);
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/admin/auth/setup', payload: { email: 'other@example.test', password: 'a-secure-test-password' } })).statusCode, 409);
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/admin/auth/login', payload: { email: 'owner@example.test', password: 'a-secure-test-password' }, headers: { origin: 'https://untrusted.example' } })).statusCode, 403);
});

test('draft changes stay private, stale edits conflict, and publication updates live content', async t => {
  const { app, request } = await fixture(t);
  const draft = (await request('GET', '/api/v1/admin/draft')).json(); const originalTitle = draft.content.projects[0].title;
  draft.content.projects[0].title = 'Edited <script>title</script>';
  assert.equal((await request('PUT', '/api/v1/admin/draft', { version: draft.version, content: draft.content })).statusCode, 200);
  assert.equal((await app.inject('/api/v1/public/site')).json().content.projects[0].title, originalTitle);
  assert.equal((await request('PUT', '/api/v1/admin/draft', { version: draft.version, content: draft.content })).statusCode, 409);
  assert.equal((await request('POST', '/api/v1/admin/publish', { version: draft.version })).statusCode, 409);
  assert.equal((await request('POST', '/api/v1/admin/publish', { version: draft.version + 1 })).statusCode, 200);
  assert.equal((await app.inject('/api/v1/public/site')).json().content.projects[0].title, 'Edited <script>title</script>');
  const html = await app.inject(`/project/${draft.content.projects[0].id}`);
  if (html.statusCode === 200) { assert.ok(html.body.includes('&lt;script&gt;')); assert.ok(!html.body.includes('<script>title</script>')); }
});

test('invalid shape, duplicate slugs and unsafe image URLs cannot enter the draft', async t => {
  const { request } = await fixture(t);
  const draft = (await request('GET', '/api/v1/admin/draft')).json();
  for (const mutate of [c => { c.projects = {}; }, c => { c.copy.home = {}; }, c => { c.projects[1].id = c.projects[0].id; }, c => { c.projects[0].heroImage = 'javascript:alert(1)'; }, c => { c.copy.home.workUrl = '//untrusted.example'; }, c => { c.team[0].image = '/assets/../secret'; }]) {
    const content = structuredClone(draft.content); mutate(content);
    assert.equal((await request('PUT', '/api/v1/admin/draft', { version: draft.version, content })).statusCode, 400);
  }
  assert.equal((await request('GET', '/api/v1/admin/draft')).json().version, draft.version);
});

test('projects support empty and large galleries, optional comparisons, hiding and old-slug redirects', async t => {
  const { app, request } = await fixture(t);
  const draft = (await request('GET', '/api/v1/admin/draft')).json(); const oldSlug = draft.content.projects[0].id;
  draft.content.projects[0].id = 'renamed-project'; draft.content.copy.home.featuredIds[0] = 'renamed-project';
  draft.content.projects[0].galleryImages = []; draft.content.projects[0].story = []; draft.content.projects[0].comparison = null;
  draft.content.projects[1].galleryImages = Array.from({ length: 100 }, (_, i) => ({ url: '/assets/projects/azure_int.jpg', caption: `Photograph ${i}` }));
  draft.content.projects[2].hidden = true;
  assert.equal((await request('PUT', '/api/v1/admin/draft', { version: draft.version, content: draft.content })).statusCode, 200);
  assert.equal((await request('POST', '/api/v1/admin/publish', { version: draft.version + 1 })).statusCode, 200);
  assert.equal((await app.inject('/api/v1/public/projects/renamed-project')).json().project.galleryImages.length, 0);
  assert.equal((await app.inject(`/api/v1/public/projects/${draft.content.projects[1].id}`)).json().project.galleryImages.length, 100);
  assert.equal((await app.inject(`/api/v1/public/projects/${oldSlug}`)).statusCode, 308);
  assert.equal((await app.inject(`/api/v1/public/projects/${draft.content.projects[2].id}`)).statusCode, 404);
  const live = (await app.inject('/api/v1/public/site')).json(); assert.equal(live.content.projects.length, 6); assert.ok(!('galleryImages' in live.content.projects[1]));
});

test('restore changes the draft only, and public ETags change with publication', async t => {
  const { app, request } = await fixture(t);
  const before = await app.inject('/api/v1/public/site');
  assert.equal((await app.inject({ url: '/api/v1/public/site', headers: { 'if-none-match': before.headers.etag } })).statusCode, 304);
  const draft = (await request('GET', '/api/v1/admin/draft')).json(); draft.content.copy.home.workHeading = 'Changed';
  await request('PUT', '/api/v1/admin/draft', { version: 1, content: draft.content }); await request('POST', '/api/v1/admin/publish', { version: 2 });
  assert.notEqual((await app.inject('/api/v1/public/site')).headers.etag, before.headers.etag);
  assert.equal((await request('POST', '/api/v1/admin/restore/1', { version: 2 })).statusCode, 200);
  assert.equal((await app.inject('/api/v1/public/site')).json().content.copy.home.workHeading, 'Changed');
  assert.equal((await request('GET', '/api/v1/admin/draft')).json().content.copy.home.workHeading, 'Selected Work');
});

test('enquiries are durably saved, validated and absent from public content', async t => {
  const { app, request } = await fixture(t);
  const payload = { name: '<b>Visitor</b>', email: 'visitor@example.test', discipline: 'Interiors', message: 'A project brief' };
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/public/enquiries', payload })).statusCode, 201);
  assert.equal((await request('GET', '/api/v1/admin/enquiries')).json().items.length, 1);
  assert.ok(!(await app.inject('/api/v1/public/site')).body.includes('visitor@example.test'));
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/public/enquiries', payload: { ...payload, discipline: 'invalid' } })).statusCode, 400);
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/public/enquiries', payload: { ...payload, website: 'spam' } })).statusCode, 200);
  assert.equal((await request('GET', '/api/v1/admin/enquiries')).json().items.length, 1);
});

test('uploaded images stay private until publication, and retained references block deletion', async t => {
  const { app, request, cookie, csrf } = await fixture(t);
  const bytes = await sharp({ create: { width: 40, height: 20, channels: 3, background: '#123456' } }).png().toBuffer();
  const boundary = 'blueprint-boundary';
  const payload = Buffer.concat([Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.png"\r\nContent-Type: image/png\r\n\r\n`), bytes, Buffer.from(`\r\n--${boundary}--\r\n`)]);
  const uploaded = await app.inject({ method: 'POST', url: '/api/v1/admin/media', payload, headers: { cookie, 'x-csrf-token': csrf, 'content-type': `multipart/form-data; boundary=${boundary}` } });
  assert.equal(uploaded.statusCode, 201, uploaded.body); const asset = uploaded.json();
  assert.equal((await app.inject(asset.url)).statusCode, 404);
  assert.equal((await request('GET', asset.url.replace('/media/', '/api/v1/admin/media-file/'))).statusCode, 200);
  const draft = (await request('GET', '/api/v1/admin/draft')).json(); draft.content.projects[0].heroImage = asset.url;
  await request('PUT', '/api/v1/admin/draft', { version: 1, content: draft.content });
  assert.equal((await request('DELETE', `/api/v1/admin/media/${asset.id}`)).statusCode, 409);
  await request('POST', '/api/v1/admin/publish', { version: 2 }); assert.equal((await app.inject(asset.url)).statusCode, 200);
});

test('production disables first-owner web setup', async t => {
  const { app } = await fixture(t, { production: true });
  assert.equal((await app.inject('/api/v1/admin/auth/status')).json().setupAvailable, false);
  assert.equal((await app.inject({ method: 'POST', url: '/api/v1/admin/auth/setup', payload: { email: 'owner@example.test', password: 'a-secure-test-password' } })).statusCode, 403);
});
