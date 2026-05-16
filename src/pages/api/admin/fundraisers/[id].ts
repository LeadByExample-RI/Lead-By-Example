import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const fundraiser = await db.event.findFirst({
    where: { id: id as string, goal: { not: null } },
    include: {
      donations: { where: { status: 'completed' }, orderBy: { createdAt: 'desc' } },
    },
  });

  if (!fundraiser) return res.status(404).json({ error: 'Fundraiser not found' });

  if (req.method === 'GET') {
    return res.status(200).json({ fundraiser });
  }

  if (req.method === 'PATCH') {
    const { title, description, startDate, endDate, location, goal, image, tags } = req.body;

    const updated = await db.event.update({
      where: { id: id as string },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(location !== undefined && { location }),
        ...(goal !== undefined && { goal: parseFloat(goal) }),
        ...(image !== undefined && { image }),
        ...(tags && { tags }),
      },
    });

    return res.status(200).json({ fundraiser: updated });
  }

  if (req.method === 'DELETE') {
    await db.event.delete({ where: { id: id as string } });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default withAdminAuth(handler);
