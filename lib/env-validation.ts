/**
 * Environment Variable Validation
 *
 * Call validateEnv() at the top of any API route that depends on external services.
 * Throws immediately with a descriptive list of missing variables so the deployment
 * fails loudly on first request instead of silently misbehaving.
 *
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is intentionally excluded — Maps is not yet
 * activated. Add it to the required list when the Maps component goes live.
 */

const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'RESEND_API_KEY',
] as const;

export function validateEnv(): void {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n` +
        missing.map((k) => `  - ${k}`).join('\n') +
        `\n\nSet these in .env.local for local development or in the Vercel dashboard for deployments.`,
    );
  }
}
