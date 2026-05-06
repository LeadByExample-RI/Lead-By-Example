/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { db } from '@/lib/db';

const schema = z.object({
  email: z.string().email('Valid email address required'),
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

  const { email } = parsed.data;

  try {
    // updateMany avoids throwing when the email is not found.
    // Always return 200 regardless of whether the email existed —
    // returning 404 for unknown emails would allow enumeration of subscriber addresses.
    await db.newsletter.updateMany({
      where: { email },
      data: { subscribed: false, unsubscribedAt: new Date() },
    });
    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Newsletter unsubscribe error:', message);
    return res.status(500).json({ error: 'Unsubscribe failed. Please try again.' });
  }
}
