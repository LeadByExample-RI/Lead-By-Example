import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { sendEventRegistrationConfirmation } from '@/lib/email-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    const event = await db.event.findUnique({
      where: { slug: slug as string },
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
        createdAt: true,
      },
    });

    if (!event) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json({ event });
  }

  if (req.method === 'POST') {
    // Register for event — requires authentication
    const session = await auth(req as any, res as any);
    if (!session?.user) return res.status(401).json({ error: 'Sign in to register for events' });

    const event = await db.event.findUnique({ where: { slug: slug as string } });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.maxAttendees && event.registeredCount >= event.maxAttendees) {
      return res.status(409).json({ error: 'Event is at capacity' });
    }

    const existing = await db.eventRegistration.findUnique({
      where: { userId_eventId: { userId: session.user.id!, eventId: event.id } },
    });
    if (existing) return res.status(409).json({ error: 'Already registered for this event' });

    const { guestCount = 1, specialRequests } = req.body;

    const registration = await db.eventRegistration.create({
      data: {
        userId: session.user.id!,
        eventId: event.id,
        guestCount: parseInt(guestCount),
        specialRequests,
      },
    });

    await db.event.update({
      where: { id: event.id },
      data: { registeredCount: { increment: 1 } },
    });

    if (session.user.email) {
      await sendEventRegistrationConfirmation({
        email: session.user.email,
        name: session.user.name ?? undefined,
        eventTitle: event.title,
        eventDate: event.startDate,
        eventLocation: event.location ?? undefined,
      });
    }

    return res.status(201).json({ registration });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
