/**
 * Prisma Client Singleton
 *
 * Ensures a single instance of Prisma Client is used throughout the application.
 * This prevents connection pool exhaustion in serverless environments (like Vercel).
 *
 * Usage:
 * ```typescript
 * import { db } from '@/lib/db';
 *
 * const user = await db.user.findUnique({ where: { id: 'user-id' } });
 * ```
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Graceful shutdown
if (typeof window === 'undefined') {
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await db.$disconnect();
    process.exit(0);
  });
  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await db.$disconnect();
    process.exit(0);
  });
}

export default db;
