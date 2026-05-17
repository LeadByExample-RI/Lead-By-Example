import { NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (_req, res: NextApiResponse) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [aggResult, recentAgg, topCampaignsRaw, subscribers, upcomingEvents, pastEvents, users] =
    await Promise.all([
      // Total raised + count + average — single aggregate pass over completed donations
      db.donation.aggregate({
        where: { status: 'completed' },
        _sum: { amount: true },
        _count: { id: true },
        _avg: { amount: true },
      }),
      // Last-30-day slice
      db.donation.aggregate({
        where: { status: 'completed', createdAt: { gte: thirtyDaysAgo } },
        _sum: { amount: true },
        _count: { id: true },
      }),
      // Top-5 campaigns by total amount — sorted + sliced in the DB
      db.donation.groupBy({
        by: ['campaign'],
        where: { status: 'completed', campaign: { not: null } },
        _sum: { amount: true },
        orderBy: { _sum: { amount: 'desc' } },
        take: 5,
      }),
      db.newsletter.count({ where: { subscribed: true } }),
      db.event.count({ where: { startDate: { gte: now } } }),
      db.event.count({ where: { startDate: { lt: now } } }),
      db.user.count(),
    ]);

  const totalRaised = Number(aggResult._sum.amount ?? 0);
  const totalDonations = aggResult._count.id;
  const avgDonation = Number(aggResult._avg.amount ?? 0);
  const recentRaised = Number(recentAgg._sum.amount ?? 0);
  const topCampaigns = topCampaignsRaw.map((row) => ({
    name: row.campaign as string,
    amount: Number(row._sum.amount ?? 0),
  }));

  return res.status(200).json({
    totalRaised,
    totalDonations,
    avgDonation,
    recentRaised,
    recentDonations: recentAgg._count.id,
    subscribers,
    totalUsers: users,
    upcomingEvents,
    pastEvents,
    topCampaigns,
  });
};

export default withAdminAuth(handler);
