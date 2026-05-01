/**
 * NextAuth API Route — Pages Router adapter for NextAuth v5
 * Endpoint: /api/auth/[...nextauth]
 *
 * NextAuth v5 returns { handlers, auth, signIn, signOut }, not a function.
 * Pages Router requires a default export that is (req, res) => unknown.
 * We unwrap handlers and dispatch by method to satisfy the type constraint.
 */

import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const { handlers } = NextAuth(authConfig);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return (handlers.GET as Function)(req, res);
  if (req.method === 'POST') return (handlers.POST as Function)(req, res);
  res.status(405).end();
}
