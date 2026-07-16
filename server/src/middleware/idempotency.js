import { getIdempotentResponse, saveIdempotentResponse } from '../services/orders.js';

export function requireIdempotencyKey(req, res, next) {
  const key = req.get('Idempotency-Key');
  if (!key || !String(key).trim()) {
    return res.status(400).json({ error: 'Idempotency-Key header is required' });
  }
  req.idempotencyKey = String(key).trim().slice(0, 100);
  return next();
}

/**
 * Replay identical requests with the same Idempotency-Key.
 * Only successful / client-error responses (< 500) are cached so transient
 * server failures can be retried with the same key.
 */
export function withIdempotency(route) {
  return async (req, res, next) => {
    try {
      const cached = await getIdempotentResponse(req.idempotencyKey, route);
      if (cached) {
        return res.status(cached.statusCode).json(cached.body);
      }

      const originalJson = res.json.bind(res);
      let persisted = false;
      res.json = async (body) => {
        if (!persisted && res.statusCode < 500) {
          persisted = true;
          try {
            await saveIdempotentResponse(req.idempotencyKey, route, res.statusCode || 200, body);
          } catch (saveError) {
            // Another concurrent request may have saved first — still return our body
            console.error('Idempotency save failed:', saveError.message);
          }
        }
        return originalJson(body);
      };

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
