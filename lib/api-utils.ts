import { NextApiRequest, NextApiResponse } from 'next';
import { ZodSchema } from 'zod';

function clientIp(req: NextApiRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  // x-forwarded-for may be a comma-separated string or an array of strings
  const raw = Array.isArray(fwd) ? fwd[0] : fwd?.split(',')[0];
  return raw?.trim() ?? req.socket.remoteAddress ?? 'unknown';
}

/**
 * Verify that the request carries an application/json Content-Type.
 * Pass `{ bypass: true }` for webhook routes that intentionally use raw bodies.
 * Returns false (and sends 400) on violation; returns true when the check passes.
 */
export function ensureJsonContentType(
  req: NextApiRequest,
  res: NextApiResponse,
  options: { bypass?: boolean } = {}
): boolean {
  if (options.bypass) return true;
  const ct = req.headers['content-type'] ?? '';
  if (!ct.includes('application/json')) {
    console.warn(`[api-utils] Non-JSON Content-Type from ${clientIp(req)}: "${ct}"`);
    res.status(415).json({ error: 'Content-Type must be application/json' });
    return false;
  }
  return true;
}

/**
 * Parse and validate a request body with a Zod schema.
 * Returns the parsed data or sends a 400 response and returns null.
 */
export function parseAndValidate<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  schema: ZodSchema<T>
): T | null {
  const ct = req.headers['content-type'] ?? '';

  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch {
      console.warn('[api-utils] Malformed JSON body', { ip: clientIp(req), contentType: ct });
      res.status(400).json({ error: 'Malformed JSON body' });
      return null;
    }
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Invalid request body';
    console.warn('[api-utils] Validation failed', { ip: clientIp(req), message });
    res.status(400).json({ error: message });
    return null;
  }

  return parsed.data;
}

export default {
  ensureJsonContentType,
  parseAndValidate,
};
