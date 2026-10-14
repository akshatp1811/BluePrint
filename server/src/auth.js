import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
const derive = promisify(scrypt);
export const hashToken = token => createHash('sha256').update(token).digest('hex');
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  const candidate = await derive(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return timingSafeEqual(candidate, Buffer.from(key, 'hex'));
}
export function createSession(db, user, reply, secure) {
  const token = randomBytes(32).toString('hex'); const csrf = randomBytes(32).toString('hex');
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());
  db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').run(hashToken(token), user.id, csrf, expires);
  reply.setCookie('blueprint_session', token, { httpOnly: true, secure, sameSite: 'strict', path: '/api', maxAge: 8 * 60 * 60 });
  return { email: user.email, csrf, expires };
}
export function authenticate(db, request) {
  const token = request.cookies.blueprint_session;
  if (!token) return null;
  return db.prepare('SELECT s.*,u.email FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at>?').get(hashToken(token), Date.now());
}
