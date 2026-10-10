import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';
import sharp from 'sharp';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase, published, audit } from './db.js';
import { hashPassword, verifyPassword, createSession, authenticate } from './auth.js';
import { validateContent } from './validation.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const escape = text => String(text ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const error = (reply, code, message, details) => reply.code(code).send({ error: message, ...(details ? { details } : {}) });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const now = () => new Date().toISOString();

export async function createApp(options = {}) {
  const production = options.production ?? process.env.NODE_ENV === 'production';
  const dataDir = options.dataDir || process.env.CMS_DATA_DIR || join(root, '.cms');
  const db = openDatabase(join(dataDir, 'content.sqlite'));
  const mediaDir = join(dataDir, 'media'); await mkdir(mediaDir, { recursive: true });
  const app = Fastify({ logger: options.logger ?? false, bodyLimit: 4 * 1024 * 1024, trustProxy: false });
  app.decorate('db', db);
  await app.register(cookie);
  await app.register(multipart, { limits: { fileSize: 15 * 1024 * 1024, files: 1, fields: 0 } });
  await app.register(rateLimit, { global: false });
  const allowSetup = options.allowSetup ?? !production;
  const origins = (process.env.CMS_ORIGINS || 'http://127.0.0.1:3000,http://127.0.0.1:3001,http://localhost:3000,http://localhost:3001,http://127.0.0.1:4000,http://localhost:4000').split(',');

  app.addHook('onRequest', async (request, reply) => {
    reply.header('X-Content-Type-Options', 'nosniff').header('Referrer-Policy', 'strict-origin-when-cross-origin').header('X-Frame-Options', 'SAMEORIGIN');
    if (production) reply.header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data: blob:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'");
    if (request.url.startsWith('/api/v1/admin')) reply.header('Cache-Control', 'no-store');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method) && request.headers.origin && !origins.includes(request.headers.origin)) return error(reply, 403, 'Origin is not allowed');
    if (request.url.startsWith('/api/v1/admin') && !request.url.startsWith('/api/v1/admin/auth/')) {
      const session = authenticate(db, request); if (!session) return error(reply, 401, 'Please sign in');
      request.session = session;
      if (!['GET', 'HEAD'].includes(request.method) && request.headers['x-csrf-token'] !== session.csrf) return error(reply, 403, 'Invalid security token. Sign in again.');
    }
  });
  app.setErrorHandler((err, request, reply) => {
    request.log.error({ err, requestId: request.id }, 'Request failed');
    return error(reply, err.statusCode || 500, err.statusCode && err.statusCode < 500 ? err.message : 'The request could not be completed');
  });
  app.addHook('onClose', async () => { db.close(); });
  app.get('/health/ready', async () => { db.prepare('SELECT 1').get(); return { ready: true }; });

  const isLocal = request => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(request.ip);
  app.get('/api/v1/admin/auth/status', async request => ({ setupAvailable: allowSetup && isLocal(request) && !db.prepare('SELECT id FROM users LIMIT 1').get() }));
  const credentials = { body: { type: 'object', required: ['email', 'password'], additionalProperties: false, properties: { email: { type: 'string', maxLength: 254 }, password: { type: 'string', minLength: 12, maxLength: 256 } } } };
  app.post('/api/v1/admin/auth/setup', { schema: credentials, config: { rateLimit: { max: 5, timeWindow: '1 minute' } } }, async (request, reply) => {
    if (!allowSetup || !isLocal(request)) return error(reply, 403, 'Create the owner account locally before production deployment');
    const email = request.body.email.trim().toLowerCase(); if (!emailPattern.test(email)) return error(reply, 400, 'Enter a valid email address');
    const password = await hashPassword(request.body.password);
    const user = db.transaction(() => {
      if (db.prepare('SELECT id FROM users LIMIT 1').get()) return null;
      const result = db.prepare('INSERT INTO users(email,password,created_at) VALUES(?,?,?)').run(email, password, now());
      audit(db, result.lastInsertRowid, 'owner.create'); return { id: result.lastInsertRowid, email };
    })();
    if (!user) return error(reply, 409, 'An owner account already exists');
    return createSession(db, user, reply, production);
  });
  app.post('/api/v1/admin/auth/login', { schema: credentials, config: { rateLimit: { max: 8, timeWindow: '1 minute' } } }, async (request, reply) => {
    const user = db.prepare('SELECT * FROM users WHERE email=?').get(request.body.email.trim().toLowerCase());
    const valid = await verifyPassword(request.body.password, user?.password || '0123456789abcdef0123456789abcdef:'.concat('00'.repeat(64)));
    if (!user || !valid) { audit(db, null, 'login.failed'); return error(reply, 401, 'Email or password is incorrect'); }
    audit(db, user.id, 'login.success'); return createSession(db, user, reply, production);
  });
  app.get('/api/v1/admin/auth/me', async (request, reply) => {
    const session = authenticate(db, request); if (!session) return error(reply, 401, 'Please sign in');
    return { email: session.email, csrf: session.csrf, expires: session.expires_at };
  });
  app.post('/api/v1/admin/auth/logout', async (request, reply) => {
    const session = authenticate(db, request); if (!session || request.headers['x-csrf-token'] !== session.csrf) return error(reply, 403, 'Invalid security token');
    db.prepare('DELETE FROM sessions WHERE token=?').run(session.token); reply.clearCookie('blueprint_session', { path: '/api' }); return { ok: true };
  });
  app.post('/api/v1/admin/auth/password', { schema: { body: { type: 'object', required: ['currentPassword', 'password'], additionalProperties: false, properties: { currentPassword: { type: 'string', maxLength: 256 }, password: { type: 'string', minLength: 12, maxLength: 256 } } } } }, async (request, reply) => {
    const session = authenticate(db, request); if (!session || request.headers['x-csrf-token'] !== session.csrf) return error(reply, 403, 'Invalid security token');
    const user = db.prepare('SELECT * FROM users WHERE id=?').get(session.user_id);
    if (!(await verifyPassword(request.body.currentPassword, user.password))) return error(reply, 401, 'Current password is incorrect');
    const password = await hashPassword(request.body.password);
    db.transaction(() => { db.prepare('UPDATE users SET password=? WHERE id=?').run(password, user.id); db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id); audit(db, user.id, 'password.change'); })();
    return createSession(db, user, reply, production);
  });

  app.get('/api/v1/admin/draft', async () => { const row = db.prepare('SELECT * FROM draft WHERE id=1').get(); return { ...row, content: JSON.parse(row.content) }; });
  app.put('/api/v1/admin/draft', { schema: { body: { type: 'object', required: ['version', 'content'], additionalProperties: false, properties: { version: { type: 'integer', minimum: 1 }, content: { type: 'object' } } } } }, async (request, reply) => {
    const issues = validateContent(request.body.content); if (issues.length) return error(reply, 400, 'Content needs correction', issues);
    const changed = db.transaction(() => {
      const result = db.prepare('UPDATE draft SET content=?,version=version+1,updated_at=? WHERE id=1 AND version=?').run(JSON.stringify(request.body.content), now(), request.body.version);
      if (result.changes) audit(db, request.session.user_id, 'draft.save'); return result.changes;
    })();
    if (!changed) return error(reply, 409, 'The draft changed in another session. Reload before saving.');
    return { version: request.body.version + 1 };
  });
  app.get('/api/v1/admin/preview', async () => { const row = db.prepare('SELECT * FROM draft WHERE id=1').get(); return { version: row.version, content: JSON.parse(row.content), preview: true }; });
  app.post('/api/v1/admin/publish', { schema: { body: { type: 'object', required: ['version'], additionalProperties: false, properties: { version: { type: 'integer' } } } } }, async (request, reply) => {
    const result = db.transaction(() => {
      const draft = db.prepare('SELECT * FROM draft WHERE id=1').get();
      if (draft.version !== request.body.version) return { conflict: true };
      const content = JSON.parse(draft.content); const issues = validateContent(content, true);
      const serialized = draft.content;
      for (const match of serialized.matchAll(/\/media\/([a-f0-9-]+)\//g)) if (!db.prepare('SELECT id FROM media WHERE id=?').get(match[1])) issues.push(`Media ${match[1]} is missing`);
      if (issues.length) return { issues };
      const result = db.prepare('INSERT INTO publications(content,created_at,user_id) VALUES(?,?,?)').run(serialized, now(), request.session.user_id);
      const previous = JSON.parse(published(db).content);
      for (const oldProject of previous.projects) {
        const next = content.projects.find(project => project._key && project._key === oldProject._key);
        if (next && oldProject.id !== next.id) db.prepare('INSERT OR REPLACE INTO redirects VALUES(?,?)').run(oldProject.id, next._key);
      }
      db.prepare("UPDATE settings SET value=? WHERE key='activePublication'").run(String(result.lastInsertRowid)); audit(db, request.session.user_id, `publish.${result.lastInsertRowid}`);
      return { version: Number(result.lastInsertRowid), publishedAt: now() };
    })();
    if (result.conflict) return error(reply, 409, 'The draft changed. Reload before publishing.');
    if (result.issues) return error(reply, 400, 'Publication validation failed', result.issues);
    return result;
  });
  app.get('/api/v1/admin/history', async () => ({ active: published(db).id, items: db.prepare('SELECT id,created_at,user_id FROM publications ORDER BY id DESC LIMIT 100').all() }));
  app.post('/api/v1/admin/restore/:id', { schema: { body: { type: 'object', required: ['version'], properties: { version: { type: 'integer' } } } } }, async (request, reply) => {
    const publication = db.prepare('SELECT * FROM publications WHERE id=?').get(Number(request.params.id)); if (!publication) return error(reply, 404, 'Version not found');
    const result = db.transaction(() => {
      const update = db.prepare('UPDATE draft SET content=?,version=version+1,updated_at=? WHERE id=1 AND version=?').run(publication.content, now(), request.body.version);
      if (update.changes) audit(db, request.session.user_id, `restore.draft.${publication.id}`); return update.changes;
    })();
    if (!result) return error(reply, 409, 'Draft changed. Reload first.'); return { ok: true };
  });
  app.get('/api/v1/admin/audit', async () => ({ items: db.prepare('SELECT id,action,created_at FROM audit ORDER BY id DESC LIMIT 100').all() }));

  function publicReply(request, reply, payload, version) {
    const etag = `"publication-${version}-${request.url}"`; reply.header('ETag', etag).header('Cache-Control', 'public, max-age=0, must-revalidate');
    if (request.headers['if-none-match'] === etag) return reply.code(304).send(); return { version, ...payload };
  }
  app.get('/api/v1/public/site', async (request, reply) => {
    const row = published(db); const content = JSON.parse(row.content);
    // Summary list intentionally excludes galleries and long project documents.
    const projects = content.projects.filter(p => !p.hidden).map(({ id, title, category, location, heroImage, heroAlt }) => ({ id, title, category, location, heroImage, heroAlt }));
    return publicReply(request, reply, { content: { ...content, projects } }, row.id);
  });
  app.get('/api/v1/public/projects/:slug', async (request, reply) => {
    const row = published(db); const project = JSON.parse(row.content).projects.find(p => p.id === request.params.slug && !p.hidden);
    if (!project) {
      const redirect = db.prepare('SELECT * FROM redirects WHERE old_slug=?').get(request.params.slug);
      const next = redirect && JSON.parse(row.content).projects.find(p => p._key === redirect.project_key && !p.hidden);
      if (next) return reply.code(308).redirect(`/api/v1/public/projects/${next.id}`);
      return error(reply, 404, 'Project not found');
    }
    return publicReply(request, reply, { project }, row.id);
  });
  app.post('/api/v1/public/enquiries', { config: { rateLimit: { max: 5, timeWindow: '10 minutes' } }, schema: { body: { type: 'object', required: ['name', 'email', 'discipline', 'message'], additionalProperties: false, properties: { name: { type: 'string', minLength: 1, maxLength: 150 }, email: { type: 'string', maxLength: 254 }, discipline: { type: 'string', maxLength: 100 }, message: { type: 'string', minLength: 1, maxLength: 5000 }, website: { type: 'string', maxLength: 100 } } } } }, async (request, reply) => {
    const { name, email, discipline, message, website } = request.body;
    if (website) return { ok: true };
    if (!name.trim() || !message.trim() || !emailPattern.test(email) || !JSON.parse(published(db).content).copy.contact.disciplines.includes(discipline)) return error(reply, 400, 'Please check the enquiry fields');
    db.transaction(() => {
      const enquiry = db.prepare('INSERT INTO enquiries(name,email,discipline,message,created_at) VALUES(?,?,?,?,?)').run(name.trim(), email.trim(), discipline, message.trim(), now());
      db.prepare('INSERT INTO notification_jobs(enquiry_id) VALUES(?)').run(enquiry.lastInsertRowid);
    })();
    return reply.code(201).send({ ok: true });
  });
  app.get('/api/v1/admin/enquiries', async () => ({ emailConfigured: !!process.env.SMTP_HOST, items: db.prepare('SELECT e.*,n.status AS notification_status FROM enquiries e LEFT JOIN notification_jobs n ON n.enquiry_id=e.id ORDER BY e.id DESC LIMIT 200').all() }));
  app.patch('/api/v1/admin/enquiries/:id', { schema: { body: { type: 'object', required: ['status'], additionalProperties: false, properties: { status: { enum: ['new', 'read', 'closed'] } } } } }, async (request, reply) => {
    const result = db.prepare('UPDATE enquiries SET status=? WHERE id=?').run(request.body.status, Number(request.params.id)); if (!result.changes) return error(reply, 404, 'Enquiry not found'); return { ok: true };
  });

  let processing = false;
  app.get('/api/v1/admin/media', async () => {
    const existing = [];
    for (const folder of ['projects', 'team']) for (const name of await readdir(join(root, 'public/assets', folder))) {
      if (/\.(jpe?g|png|webp)$/i.test(name)) existing.push({ id: `seed-${folder}-${name}`, name, url: `/assets/${folder}/${name}`, thumbnail: `/assets/${folder}/${name}`, existing: true });
    }
    return { items: [...db.prepare('SELECT * FROM media ORDER BY created_at DESC').all().map(row => ({ ...row, url: `/media/${row.id}/1280.webp`, thumbnail: `/media/${row.id}/320.webp` })), ...existing] };
  });
  app.post('/api/v1/admin/media', { config: { rateLimit: { max: 30, timeWindow: '1 minute' } } }, async (request, reply) => {
    if (processing) return error(reply, 429, 'An image is processing. Please retry in a moment.'); processing = true;
    const id = randomUUID(); const directory = join(mediaDir, id);
    try {
      const file = await request.file(); if (!file) return error(reply, 400, 'Choose a photograph');
      const buffer = await file.toBuffer(); const image = sharp(buffer, { limitInputPixels: 40000000, animated: false }); const metadata = await image.metadata();
      if (!['jpeg', 'png', 'webp'].includes(metadata.format)) return error(reply, 400, 'Use a JPEG, PNG or WebP image');
      const quota = Number(process.env.CMS_MEDIA_QUOTA_MB || 2048) * 1024 * 1024;
      const used = db.prepare('SELECT COALESCE(SUM(bytes),0) AS bytes FROM media').get().bytes;
      if (used + buffer.length * 3 > quota) return error(reply, 413, 'Media storage quota reached');
      await mkdir(directory, { recursive: true });
      for (const width of [320, 640, 1280, 1920]) await sharp(buffer, { limitInputPixels: 40000000 }).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(directory, `${width}.webp`));
      let bytes = 0; for (const name of await readdir(directory)) bytes += (await stat(join(directory, name))).size;
      if (used + bytes > quota) { await rm(directory, { recursive: true, force: true }); return error(reply, 413, 'Media storage quota reached'); }
      const safeName = file.filename.replace(/[<>\u0000-\u001f]/g, '').slice(0, 200);
      db.prepare('INSERT INTO media VALUES(?,?,?,?,?,?,?)').run(id, safeName, 'image/webp', bytes, metadata.width, metadata.height, now());
      audit(db, request.session.user_id, `media.upload.${id}`); return reply.code(201).send({ id, name: safeName, url: `/media/${id}/1280.webp`, thumbnail: `/media/${id}/320.webp` });
    } catch (err) {
      await rm(directory, { recursive: true, force: true }); return error(reply, err.statusCode || 400, err.code === 'FST_REQ_FILE_TOO_LARGE' ? 'Image exceeds 15 MB' : 'Image upload failed. Use a valid image under 15 MB.');
    } finally { processing = false; }
  });
  app.delete('/api/v1/admin/media/:id', async (request, reply) => {
    const id = request.params.id; if (!/^[a-f0-9-]{36}$/.test(id)) return error(reply, 400, 'Invalid asset');
    const needle = `/media/${id}/`;
    const documents = [...db.prepare('SELECT content FROM draft').all(), ...db.prepare('SELECT content FROM publications').all()];
    if (documents.some(row => row.content.includes(needle))) return error(reply, 409, 'This image is referenced by a draft or retained publication. Remove its references before deleting.');
    if (!db.prepare('SELECT id FROM media WHERE id=?').get(id)) return error(reply, 404, 'Image not found');
    await rm(join(mediaDir, id), { recursive: true, force: true }); db.prepare('DELETE FROM media WHERE id=?').run(id); audit(db, request.session.user_id, `media.delete.${id}`); return { ok: true };
  });
  app.get('/media/:id/:variant', async (request, reply) => {
    const { id, variant } = request.params;
    if (!/^[a-f0-9-]{36}$/.test(id) || !/^(320|640|1280|1920)\.webp$/.test(variant)) return error(reply, 404, 'Image not found');
    const isPublic = published(db).content.includes(`/media/${id}/`);
    if (!isPublic && !authenticate(db, request)) return error(reply, 404, 'Image not found');
    // Preview image requests outside /api do not carry the session cookie; use the protected proxy endpoint below.
    try { const buffer = await readFile(join(mediaDir, id, variant)); return reply.type('image/webp').header('Cache-Control', isPublic ? 'public, max-age=3600' : 'no-store').send(buffer); } catch { return error(reply, 404, 'Image not found'); }
  });
  app.get('/api/v1/admin/media-file/:id/:variant', async (request, reply) => {
    const { id, variant } = request.params;
    if (!/^[a-f0-9-]{36}$/.test(id) || !/^(320|640|1280|1920)\.webp$/.test(variant)) return error(reply, 404, 'Image not found');
    try { return reply.type('image/webp').send(await readFile(join(mediaDir, id, variant))); } catch { return error(reply, 404, 'Image not found'); }
  });

  const dist = join(root, 'dist'); const adminDist = join(root, 'admin/dist');
  const assets = existsSync(join(dist, 'assets')) ? join(dist, 'assets') : join(root, 'public/assets');
  await app.register(staticFiles, { root: assets, prefix: '/assets/', decorateReply: false });
  if (existsSync(adminDist)) await app.register(staticFiles, { root: adminDist, prefix: '/admin/', decorateReply: false });
  const renderSite = async (request, reply) => {
    if (!existsSync(join(dist, 'index.html'))) return reply.code(503).type('text/plain').send('Build the website with npm run build, or use npm run dev.');
    const content = JSON.parse(published(db).content); const path = request.url.split('?')[0];
    const pages = { '/': 'home', '/about': 'about', '/projects': 'projects', '/contact': 'contact' };
    const project = path.startsWith('/project/') ? content.projects.find(p => p.id === decodeURIComponent(path.slice(9)) && !p.hidden) : null;
    if (path.startsWith('/project/') && !project) {
      const redirect = db.prepare('SELECT * FROM redirects WHERE old_slug=?').get(path.slice(9));
      const next = redirect && content.projects.find(p => p._key === redirect.project_key && !p.hidden);
      if (next) return reply.code(308).redirect(`/project/${next.id}`);
    }
    const page = pages[path]; if (!page && !project) reply.code(404);
    let html = await readFile(join(dist, 'index.html'), 'utf8');
    const title = project?.title || (page ? content.copy[page].title : content.copy.detail.missingHeading);
    const description = project?.description || content.copy.seo.description;
    html = html.replace(/<title>.*?<\/title>/s, `<title>${title ? `${escape(title)} | ${escape(content.copy.branding.titleSuffix)}` : escape(content.copy.seo.title)}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}">`);
    html = html.replace('</head>', `<meta property="og:title" content="${escape(title || content.copy.seo.title)}"><meta property="og:description" content="${escape(description)}">${content.copy.seo.image ? `<meta property="og:image" content="${escape(content.copy.seo.image)}">` : ''}</head>`);
    return reply.type('text/html').header('Cache-Control', 'no-cache').send(html);
  };
  app.get('/', renderSite); app.get('/about', renderSite); app.get('/projects', renderSite); app.get('/contact', renderSite); app.get('/project/:slug', renderSite);
  app.get('/robots.txt', async (request, reply) => reply.type('text/plain').send('User-agent: *\nDisallow: /admin/\nDisallow: /api/v1/admin/\n'));
  app.get('/sitemap.xml', async (request, reply) => {
    const base = process.env.CMS_PUBLIC_URL; if (!base) return error(reply, 503, 'Set CMS_PUBLIC_URL before deploying');
    const paths = ['/', '/about', '/projects', '/contact', ...JSON.parse(published(db).content).projects.filter(p => !p.hidden).map(p => `/project/${p.id}`)];
    return reply.type('application/xml').send(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escape(base.replace(/\/$/, '') + path)}</loc></url>`).join('')}</urlset>`);
  });
  app.setNotFoundHandler((request, reply) => request.url.startsWith('/api/') ? error(reply, 404, 'Endpoint not found') : renderSite(request, reply));
  return app;
}
