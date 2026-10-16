import { hashPassword } from './auth.js';
import { audit } from './db.js';

// One-time demo bootstrap. Never reapply credentials after a password change.
export async function seedDemoAdmin(db) {
  const key = 'demoAdminSeedV1';
  if (db.prepare('SELECT value FROM settings WHERE key=?').get(key)) return false;
  const password = await hashPassword('admin@123');
  return db.transaction(() => {
    if (db.prepare('SELECT value FROM settings WHERE key=?').get(key)) return false;
    const owner = db.prepare("SELECT id FROM users WHERE username='admin' COLLATE NOCASE").get()
      || db.prepare('SELECT id FROM users ORDER BY id LIMIT 1').get();
    let id = owner?.id;
    if (owner) {
      db.prepare('UPDATE users SET username=?,password=? WHERE id=?').run('admin', password, id);
      db.prepare('DELETE FROM sessions WHERE user_id=?').run(id);
    } else {
      // Internal placeholder only; configure a verified recovery email before adding reset delivery.
      id = db.prepare('INSERT INTO users(email,username,password,created_at) VALUES(?,?,?,?)')
        .run('admin@blueprint.invalid', 'admin', password, new Date().toISOString()).lastInsertRowid;
    }
    db.prepare('INSERT INTO settings(key,value) VALUES(?,?)').run(key, new Date().toISOString());
    audit(db, id, 'owner.demo-seed');
    return true;
  })();
}
