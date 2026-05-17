/**
 * NextAuth API Route — Pages Router adapter for NextAuth v5
 * Endpoint: /api/auth/[...nextauth]
 *
 * NextAuth v5 returns { handlers, auth, signIn, signOut }, not a function.
 * Pages Router requires a default export that is (req, res) => unknown.
 * We unwrap handlers and dispatch by method to satisfy the type constraint.
 *
 * The NextAuth instance lives in lib/auth.ts.
 * Import { auth } from '@/lib/auth' to check sessions in other API routes.
 */

import { handlers } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    type HandlerFn = (req: NextApiRequest, res: NextApiResponse) => unknown;
    if (req.method === 'GET') return await (handlers.GET as unknown as HandlerFn)(req, res);
    if (req.method === 'POST') return await (handlers.POST as unknown as HandlerFn)(req, res);
    res.status(405).end();
  } catch (err) {
    console.error('[auth] Unhandled error in NextAuth handler:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Authentication service unavailable. Please try again.' });
    }
  }
}
