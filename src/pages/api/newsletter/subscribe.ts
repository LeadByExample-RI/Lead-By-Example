/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { newsletterQueries } from '@/lib/db-queries';

const schema = z.object({
  email: z.string().email('Valid email address required'),
  interests: z.array(z.string()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { email, interests } = parsed.data;

  try {
    await newsletterQueries.subscribe(email, { interests });
    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Newsletter subscribe error:', message);
    return res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
}
