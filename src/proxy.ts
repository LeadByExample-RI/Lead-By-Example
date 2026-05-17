import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Edge proxy (Next.js 16 / Turbopack convention — replaces middleware.ts).
 * Guards /admin/* and /api/admin/* paths.
 *
 * Uses next-auth/jwt getToken (jose-based, Edge-compatible) to read the JWT
 * without touching Prisma or bcrypt. Role is embedded in the token by the
 * jwt callback in lib/auth.ts.
 */
export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const role = (token as Record<string, unknown> | null)?.role;

  const isApi = req.nextUrl.pathname.startsWith('/api/admin');

  if (role !== 'admin') {
    if (isApi) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const signIn = new URL('/auth/signin', req.url);
    signIn.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
