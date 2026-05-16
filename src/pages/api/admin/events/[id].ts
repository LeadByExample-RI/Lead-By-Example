import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const event = await db.event.findUnique({
    where: { id: id as string },
    include: {
      registrations: { include: { user: { select: { id: true, name: true, email: true } } } },
      donations: { where: { status: 'completed' }, orderBy: { createdAt: 'desc' } },
    },
  });

  if (!event) return res.status(404).json({ error: 'Event not found' });

  if (req.method === 'GET') {
    return res.status(200).json({ event });
  }

  if (req.method === 'PATCH') {
    const { title, description, startDate, endDate, location, eventType, maxAttendees, goal, image, tags } = req.body;

    const updated = await db.event.update({
      where: { id: id as string },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(location !== undefined && { location }),
        ...(eventType && { eventType }),
        ...(maxAttendees !== undefined && { maxAttendees: maxAttendees ? parseInt(maxAttendees) : null }),
        ...(goal !== undefined && { goal: goal ? parseFloat(goal) : null }),
        ...(image !== undefined && { image }),
        ...(tags && { tags }),
      },
    });

    return res.status(200).json({ event: updated });
  }

  if (req.method === 'DELETE') {
    await db.event.delete({ where: { id: id as string } });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default withAdminAuth(handler);
