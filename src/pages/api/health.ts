/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

type ServiceStatus = 'ok' | 'error';

interface HealthResponse {
  status: 'healthy' | 'degraded';
  checks: Record<string, ServiceStatus>;
  timestamp: string;
}

/**
 * GET /api/health
 *
 * Returns 200 when all required services are reachable, 503 when any are missing.
 * Use this after adding environment variables to Vercel to confirm the deployment
 * is fully wired before directing traffic to it.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const checks: Record<string, ServiceStatus> = {};

  // Database connectivity — a failed query means DATABASE_URL is wrong or DB is unreachable
  try {
    await db.$queryRaw`SELECT 1`;
    checks.database = 'ok';
  } catch {
    checks.database = 'error';
  }

  // Stripe — env var presence only (not a live API call)
  checks.stripe = process.env.STRIPE_SECRET_KEY ? 'ok' : 'error';
  checks.stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_') ? 'ok' : 'error';

  // Resend — env var presence only
  checks.resend = process.env.RESEND_API_KEY ? 'ok' : 'error';

  // Auth — secret presence
  checks.auth = process.env.NEXTAUTH_SECRET ? 'ok' : 'error';

  const allOk = Object.values(checks).every((v) => v === 'ok');

  return res.status(allOk ? 200 : 503).json({
    status: allOk ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
}
