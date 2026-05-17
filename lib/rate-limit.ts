/**
 * Lightweight in-memory rate limiter.
 *
 * Works within a single warm serverless function instance. Each invocation
 * that shares process memory (warm Vercel lambda, local dev server) will
 * correctly throttle repeated callers. Cold starts get a fresh Map — which is
 * the correct behaviour for serverless: a brand-new process is not "abusing"
 * anything yet.
 *
 * If you need cross-instance rate limiting, swap the Map for an Upstash Redis
 * store and replace the logic below with `@upstash/ratelimit`.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

/**
 * Returns true if the caller is within their quota, false if throttled.
 *
 * @param key       Unique identifier for the caller (e.g. IP address + route).
 * @param limit     Maximum number of requests allowed in the window.
 * @param windowMs  Rolling window duration in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Evict all expired entries on each call to prevent unbounded Map growth.
  for (const [k, v] of store) {
    if (now > v.resetAt) store.delete(k);
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count += 1;
  return true;
}
