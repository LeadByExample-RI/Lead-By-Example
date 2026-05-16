import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/auth';

export type AdminHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { id: string; email: string; name?: string | null; role: string } },
) => Promise<void>;

/**
 * Wraps an API handler with admin-only authentication.
 * Returns 401 if unauthenticated, 403 if role !== 'admin'.
 */
export function withAdminAuth(handler: AdminHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await auth(req as any, res as any);

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const role = (session.user as any).role as string;
    if (role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: admin access required' });
    }

    return handler(req, res, session as any);
  };
}
