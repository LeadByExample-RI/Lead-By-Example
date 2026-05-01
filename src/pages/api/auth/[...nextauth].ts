/**
 * NextAuth API Route — Pages Router
 * Endpoint: /api/auth/[...nextauth]
 */

import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth';

export default NextAuth(authConfig);
