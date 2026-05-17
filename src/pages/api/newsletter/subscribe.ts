/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { newsletterQueries } from '@/lib/db-queries';
import { parseAndValidate } from '@/lib/api-utils';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({
  email: z.string().email('Valid email address required'),
  interests: z.array(z.string()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 10 subscribe attempts per IP per hour
  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd?.split(',')[0])?.trim() ?? 'unknown';
  if (!rateLimit(`newsletter:${ip}`, 10, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const data = parseAndValidate(req, res, schema);
  if (!data) return;

  const { email, interests } = data;

  try {
    await newsletterQueries.subscribe(email, { interests });
    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Newsletter subscribe error:', message);
    return res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
}
