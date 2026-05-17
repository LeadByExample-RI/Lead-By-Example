import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { getToken } from 'next-auth/jwt';
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

    // Register for event — requires authentication.
    // getToken reads the NextAuth JWT cookie directly, which works in the Pages
    // Router without the App Router auth() wrapper that needs Node adapters.
    // NextApiRequest doesn't satisfy the v5 getToken signature (expects Web Request);
    // casting via unknown is the Pages Router compatibility shim.
    const token = await getToken({ req: req as unknown as Request });
    if (!token) return res.status(401).json({ error: 'Sign in to register for events' });

    const { guestCount = 1, specialRequests } = req.body;
    const userId = (token.id as string) ?? (token.sub as string);
    const userEmail = token.email as string | undefined;
    const userName = token.name as string | undefined;
    const slugStr = slug as string;
    const requestedGuests = Number.parseInt(String(guestCount), 10) || 1;

    if (requestedGuests < 1) {
      return res.status(400).json({ error: 'Guest count must be at least 1' });
    }

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

      if (userEmail) {
        await sendEventRegistrationConfirmation({
          email: userEmail,
          name: userName ?? undefined,
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
