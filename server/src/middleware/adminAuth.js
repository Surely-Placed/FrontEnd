import crypto from 'crypto';
import { config } from '../config.js';

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function sign(payload) {
  return crypto.createHmac('sha256', config.admin.tokenSecret).update(payload).digest('hex');
}

export function validateAdminCredentials(email, password) {
  return (
    String(email || '').trim().toLowerCase() === config.admin.email.toLowerCase() &&
    String(password || '') === config.admin.password
  );
}

export function issueAdminToken() {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `webinar-admin:${exp}`;
  return Buffer.from(`${payload}:${sign(payload)}`).toString('base64url');
}

export function verifyAdminToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const exp = Number(parts[1]);
    const signature = parts.slice(2).join(':');
    const payload = `${parts[0]}:${parts[1]}`;
    if (!exp || Date.now() > exp) return false;
    const expected = sign(payload);
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}
