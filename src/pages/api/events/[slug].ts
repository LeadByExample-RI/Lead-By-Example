import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { sendEventRegistrationConfirmation } from '@/lib/email-service';
import { ensureJsonContentType } from '@/lib/api-utils';

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
    // Validate Content-Type before processing
    if (!ensureJsonContentType(req, res)) return;

    // Register for event — requires authentication
    const session = await auth(req as any, res as any);
    if (!session?.user) return res.status(401).json({ error: 'Sign in to register for events' });

    const { guestCount = 1, specialRequests } = req.body;
    const userId = session.user.id!;
    const slugStr = slug as string;
    const requestedGuests = Number.parseInt(String(guestCount), 10) || 1;

    try {
      const registrationResult = await db.$transaction(async (tx) => {
        const currentEvent = await tx.event.findUnique({
          where: { slug: slugStr },
          select: {
            id: true,
            title: true,
            startDate: true,
            location: true,
            maxAttendees: true,
            registeredCount: true,
          },
        });

        if (!currentEvent) {
          throw new Error('Event not found');
        }

        const existing = await tx.eventRegistration.findUnique({
          where: { userId_eventId: { userId, eventId: currentEvent.id } },
        });
        if (existing) {
          throw new Error('Already registered');
        }

        const capacityLimit =
          currentEvent.maxAttendees !== null ? currentEvent.maxAttendees - requestedGuests + 1 : null;

        const updateResult = await tx.event.updateMany({
          where: {
            id: currentEvent.id,
            ...(capacityLimit !== null
              ? {
                  registeredCount: { lt: capacityLimit },
                }
              : {}),
          },
          data: {
            registeredCount: { increment: requestedGuests },
          },
        });

        if (updateResult.count === 0) {
          throw new Error('Capacity reached');
        }

        const newRegistration = await tx.eventRegistration.create({
          data: {
            userId,
            eventId: currentEvent.id,
            guestCount: requestedGuests,
            specialRequests: specialRequests?.substring(0, 500),
          },
        });

        return { newRegistration, event: currentEvent };
      });

      if (session.user.email) {
        await sendEventRegistrationConfirmation({
          email: session.user.email,
          name: session.user.name ?? undefined,
          eventTitle: registrationResult.event.title,
          eventDate: registrationResult.event.startDate,
          eventLocation: registrationResult.event.location ?? undefined,
        });
      }

      return res.status(201).json({ registration: registrationResult.newRegistration });
    } catch (error: any) {
      if (error.message === 'Capacity reached') {
        return res.status(409).json({ error: 'Event is at capacity' });
      }
      if (error.message === 'Already registered') {
        return res.status(409).json({ error: 'Already registered for this event' });
      }
      if (error.message === 'Event not found') {
        return res.status(404).json({ error: 'Event not found' });
      }
      return res.status(500).json({ error: 'Failed to register' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
