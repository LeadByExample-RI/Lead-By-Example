import { NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (_req, res: NextApiResponse) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [donationStats, recentStats, subscribers, events, users, topCampaigns] = await Promise.all([
    db.donation.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
      _avg: { amount: true },
      _count: { _all: true },
    }),
    db.donation.aggregate({
      where: { status: 'completed', createdAt: { gte: thirtyDaysAgo } },
      _sum: { amount: true },
      _count: { _all: true },
    }),
    db.newsletter.count({ where: { subscribed: true } }),
    db.event.findMany({ orderBy: { startDate: 'asc' } }),
    db.user.count(),
    db.donation.groupBy({
      by: ['campaign'],
      where: { status: 'completed', campaign: { not: null } },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 5,
    }),
  ]);

  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= now);
  const pastEvents = events.filter((e) => new Date(e.startDate) < now);

  return res.status(200).json({
    totalRaised: Number(donationStats._sum.amount || 0),
    totalDonations: donationStats._count._all,
    avgDonation: Number(donationStats._avg.amount || 0),
    recentRaised: Number(recentStats._sum.amount || 0),
    recentDonations: recentStats._count._all,
    subscribers,
    totalUsers: users,
    upcomingEvents: upcomingEvents.length,
    pastEvents: pastEvents.length,
    topCampaigns: topCampaigns.map((campaign) => ({
      name: campaign.campaign!,
      amount: Number(campaign._sum.amount || 0),
    })),
  });
};

export default withAdminAuth(handler);
