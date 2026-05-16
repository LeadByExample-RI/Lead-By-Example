import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { subscribed, page = '1', limit = '50' } = req.query;
  const pageNum = Math.max(1, parseInt(page as string));
  const pageSize = Math.min(200, parseInt(limit as string));
  const skip = (pageNum - 1) * pageSize;

  const where: any = {};
  if (subscribed !== undefined) where.subscribed = subscribed === 'true';

  const [subscribers, total, activeCount, inactiveCount] = await Promise.all([
    db.newsletter.findMany({
      where,
      orderBy: { subscribedAt: 'desc' },
      skip,
      take: pageSize,
      include: { user: { select: { name: true } } },
    }),
    db.newsletter.count({ where }),
    db.newsletter.count({ where: { subscribed: true } }),
    db.newsletter.count({ where: { subscribed: false } }),
  ]);

  return res.status(200).json({
    subscribers,
    pagination: { page: pageNum, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    stats: { active: activeCount, inactive: inactiveCount },
  });
};

export default withAdminAuth(handler);
