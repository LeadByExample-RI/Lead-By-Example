import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { upcoming, type, limit = '20' } = req.query;
  const pageSize = Math.min(50, parseInt(limit as string));

  const where: any = {};
  if (upcoming === 'true') where.startDate = { gte: new Date() };
  if (type) where.eventType = type;

  const events = await db.event.findMany({
    where,
    orderBy: { startDate: 'asc' },
    take: pageSize,
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      startDate: true,
      endDate: true,
      location: true,
      eventType: true,
      maxAttendees: true,
      registeredCount: true,
      goal: true,
      raisedAmount: true,
      image: true,
      tags: true,
    },
  });

  return res.status(200).json({ events });
}
