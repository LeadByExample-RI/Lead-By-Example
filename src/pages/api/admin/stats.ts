import { NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (_req, res: NextApiResponse) => {
  const [donations, subscribers, events, users] = await Promise.all([
    db.donation.findMany({ where: { status: 'completed' } }),
    db.newsletter.count({ where: { subscribed: true } }),
    db.event.findMany({ orderBy: { startDate: 'asc' } }),
    db.user.count(),
  ]);

  const totalRaised = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalDonations = donations.length;
  const avgDonation = totalDonations > 0 ? totalRaised / totalDonations : 0;

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recentDonations = donations.filter((d) => new Date(d.createdAt) >= thirtyDaysAgo);
  const recentRaised = recentDonations.reduce((sum, d) => sum + Number(d.amount), 0);

  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= now);
  const pastEvents = events.filter((e) => new Date(e.startDate) < now);

  const campaignMap: Record<string, number> = {};
  donations.forEach((d) => {
    if (d.campaign) campaignMap[d.campaign] = (campaignMap[d.campaign] || 0) + Number(d.amount);
  });
  const topCampaigns = Object.entries(campaignMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, amount]) => ({ name, amount }));

  return res.status(200).json({
    totalRaised,
    totalDonations,
    avgDonation,
    recentRaised,
    recentDonations: recentDonations.length,
    subscribers,
    totalUsers: users,
    upcomingEvents: upcomingEvents.length,
    pastEvents: pastEvents.length,
    topCampaigns,
  });
};

export default withAdminAuth(handler);
