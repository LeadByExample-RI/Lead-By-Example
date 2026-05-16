import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { page = '1', limit = '20', status, campaign, search } = req.query;
  const pageNum = Math.max(1, parseInt(page as string));
  const pageSize = Math.min(100, parseInt(limit as string));
  const skip = (pageNum - 1) * pageSize;

  const where: any = {};
  if (status) where.status = status;
  if (campaign) where.campaign = campaign;
  if (search) {
    where.OR = [
      { donorName: { contains: search as string, mode: 'insensitive' } },
      { donorEmail: { contains: search as string, mode: 'insensitive' } },
      { stripePaymentIntentId: { contains: search as string } },
    ];
  }

  const [donations, total] = await Promise.all([
    db.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    db.donation.count({ where }),
  ]);

  return res.status(200).json({
    donations,
    pagination: { page: pageNum, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
};

export default withAdminAuth(handler);
