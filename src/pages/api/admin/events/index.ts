import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const events = await db.event.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        _count: { select: { registrations: true, donations: true } },
      },
    });
    return res.status(200).json({ events });
  }

  if (req.method === 'POST') {
    const { title, description, slug, startDate, endDate, location, eventType, maxAttendees, goal, image, tags } =
      req.body;

    if (!title || !slug || !startDate) {
      return res.status(400).json({ error: 'title, slug, and startDate are required' });
    }

    const existing = await db.event.findUnique({ where: { slug } });
    if (existing) return res.status(409).json({ error: 'Slug already in use' });

    const event = await db.event.create({
      data: {
        title,
        description,
        slug,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location,
        eventType: eventType || 'community',
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
        goal: goal ? parseFloat(goal) : null,
        image,
        tags: tags || [],
      },
    });

    return res.status(201).json({ event });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default withAdminAuth(handler);
