import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createSeed } from './seed.js';

export function openDatabase(filename) {
  mkdirSync(dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON'); db.pragma('busy_timeout = 5000');
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), csrf TEXT NOT NULL, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS draft (id INTEGER PRIMARY KEY CHECK(id=1), version INTEGER NOT NULL, content TEXT NOT NULL, updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS publications (id INTEGER PRIMARY KEY, content TEXT NOT NULL, created_at TEXT NOT NULL, user_id INTEGER REFERENCES users(id));
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS redirects (old_slug TEXT PRIMARY KEY, project_key TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, user_id INTEGER, action TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, name TEXT NOT NULL, mime TEXT NOT NULL, bytes INTEGER NOT NULL, width INTEGER NOT NULL, height INTEGER NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS enquiries (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, discipline TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS notification_jobs (id INTEGER PRIMARY KEY, enquiry_id INTEGER NOT NULL REFERENCES enquiries(id), status TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0, retry_at INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS session_expiry ON sessions(expires_at);
  `);
  db.transaction(() => {
    if (!db.prepare('SELECT version FROM migrations WHERE version=1').get()) db.prepare('INSERT INTO migrations VALUES(1,?)').run(new Date().toISOString());
    if (!db.prepare('SELECT id FROM draft').get()) {
      const content = JSON.stringify(createSeed()); const now = new Date().toISOString();
      db.prepare('INSERT INTO draft VALUES(1,1,?,?)').run(content, now);
      const result = db.prepare('INSERT INTO publications(content,created_at) VALUES(?,?)').run(content, now);
      db.prepare('INSERT INTO settings VALUES(?,?)').run('activePublication', String(result.lastInsertRowid));
    }
  })();
  return db;
}
export function published(db) {
  return db.prepare("SELECT p.* FROM publications p JOIN settings s ON s.key='activePublication' AND p.id=CAST(s.value AS INTEGER)").get();
}
export function audit(db, userId, action) { db.prepare('INSERT INTO audit(user_id,action,created_at) VALUES(?,?,?)').run(userId || null, action, new Date().toISOString()); }
