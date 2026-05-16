import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const fundraisers = await db.event.findMany({
      where: { goal: { not: null } },
      orderBy: { startDate: 'desc' },
      include: {
        donations: { where: { status: 'completed' }, select: { amount: true } },
        _count: { select: { registrations: true } },
      },
    });

    const enriched = fundraisers.map((f) => ({
      ...f,
      raisedAmount: f.donations.reduce((sum, d) => sum + Number(d.amount), 0),
      goalAmount: Number(f.goal),
      progress: f.goal ? (f.donations.reduce((sum, d) => sum + Number(d.amount), 0) / Number(f.goal)) * 100 : 0,
    }));

    return res.status(200).json({ fundraisers: enriched });
  }

  if (req.method === 'POST') {
    const { title, description, slug, startDate, endDate, location, goal, image, tags } = req.body;

    if (!title || !slug || !startDate || !goal) {
      return res.status(400).json({ error: 'title, slug, startDate, and goal are required' });
    }

    const existing = await db.event.findUnique({ where: { slug } });
    if (existing) return res.status(409).json({ error: 'Slug already in use' });

    const fundraiser = await db.event.create({
      data: {
        title,
        description,
        slug,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location,
        eventType: 'fundraiser',
        goal: parseFloat(goal),
        image,
        tags: tags || [],
      },
    });

    return res.status(201).json({ fundraiser });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default withAdminAuth(handler);
