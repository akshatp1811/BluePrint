import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import Database from 'better-sqlite3';
import { createApp } from '../src/app.js';
import { seedDemoAdmin } from '../src/seed-admin.js';
import { hashPassword, verifyPassword } from '../src/auth.js';

for (const existing of [false, true]) {
  test(`demo admin login and one-time seeding (${existing ? 'existing owner database' : 'new database'})`, async t => {
    const dataDir = await mkdtemp(join(tmpdir(), 'blueprint-admin-'));
    if (existing) {
      const legacy = new Database(join(dataDir, 'content.sqlite'));
      legacy.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at TEXT NOT NULL)');
      legacy.prepare('INSERT INTO users VALUES(1,?,?,?)').run('owner@example.test', await hashPassword('old-owner-password'), new Date().toISOString());
      legacy.close();
    }
    const app = await createApp({ dataDir, production: true });
    t.after(async () => { await app.close(); await rm(dataDir, { recursive: true, force: true }); });
    const draftBefore = app.db.prepare('SELECT * FROM draft').get();
    assert.equal(await seedDemoAdmin(app.db), true);
    assert.deepEqual(app.db.prepare('SELECT * FROM draft').get(), draftBefore);
    const owner = app.db.prepare('SELECT * FROM users').all();
    assert.equal(owner.length, 1);
    assert.equal(owner[0].username, 'admin');
    assert.notEqual(owner[0].password, 'admin@123');
    if (existing) assert.equal(owner[0].email, 'owner@example.test');
    const origin = 'https://deepskyblue-okapi-398996.hostingersite.com';
    const login = password => app.inject({ method: 'POST', url: '/api/v1/admin/auth/login', headers: { origin }, payload: { username: 'admin', password } });
    for (const untrusted of ['https://untrusted.example', `${origin}.evil.example`, 'null']) {
      const blocked = await app.inject({ method: 'POST', url: '/api/v1/admin/auth/login', headers: { origin: untrusted, host: new URL(untrusted === 'null' ? origin : untrusted).host, 'x-forwarded-host': new URL(origin).host }, payload: { username: 'admin', password: 'admin@123' } });
      assert.equal(blocked.statusCode, 403);
      assert.equal(blocked.json().error, 'Origin is not allowed');
    }
    assert.equal((await login('wrong')).statusCode, 401);
    const response = await login('admin@123');
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().username, 'admin');
    assert.match(response.headers['set-cookie'], /Secure/);
    const cookie = response.headers['set-cookie'].split(';')[0];
    const changed = await app.inject({ method: 'POST', url: '/api/v1/admin/auth/password', headers: { origin, cookie, 'x-csrf-token': response.json().csrf }, payload: { currentPassword: 'admin@123', password: 'new-demo-password-123' } });
    assert.equal(changed.statusCode, 200);
    assert.equal(await seedDemoAdmin(app.db), false);
    assert.equal((await login('admin@123')).statusCode, 401);
    assert.equal((await login('new-demo-password-123')).statusCode, 200);
    assert.equal((await app.inject({ url: '/api/v1/admin/auth/me', headers: { cookie } })).statusCode, 401);
    assert.equal(await verifyPassword('new-demo-password-123', app.db.prepare('SELECT password FROM users').get().password), true);
  });
}
