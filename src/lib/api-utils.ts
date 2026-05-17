import { NextApiRequest, NextApiResponse } from 'next';
import { ZodSchema } from 'zod';

function clientIp(req: NextApiRequest) {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
}

export function ensureJsonContentType(req: NextApiRequest, res: NextApiResponse) {
  const ct = req.headers['content-type'] || '';
  if (!ct.includes('application/json')) {
    console.warn(`[api-utils] Request from ${clientIp(req)} missing JSON Content-Type: ${ct}`);
    res.status(400).json({ error: 'Expected application/json Content-Type' });
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
  // If the client didn't send a JSON content-type, respond with guidance.
  // Some routes (webhooks) intentionally disable body parsing; handlers can skip this.
  const ct = req.headers['content-type'] || '';

  if (typeof req.body === 'string') {
    try {
      // Try to parse string bodies (robustness for misconfigured clients)
      req.body = JSON.parse(req.body);
    } catch (err) {
      console.warn('[api-utils] Failed to parse string body as JSON', { ip: clientIp(req), contentType: ct });
      res.status(400).json({ error: 'Malformed JSON body' });
      return null;
    }
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message || 'Invalid request body';
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
