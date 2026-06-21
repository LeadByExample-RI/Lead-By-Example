import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { sendEventRegistrationConfirmation } from '@/lib/email-service';

const registrationSchema = z.object({
  guestCount: z.coerce.number().int().min(0).max(10).default(1),
  specialRequests: z.string().trim().max(1000).optional().or(z.literal('')),
});

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

    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const registration = await db.$transaction(async (tx) => {
      const existing = await tx.eventRegistration.findUnique({
        where: { userId_eventId: { userId: session.user.id!, eventId: event.id } },
      });
      if (existing) {
        throw new Error('Already registered for this event');
      }

      if (event.maxAttendees !== null) {
        const updated = await tx.event.updateMany({
          where: {
            id: event.id,
            registeredCount: { lt: event.maxAttendees },
          },
          data: { registeredCount: { increment: 1 } },
        });

        if (updated.count === 0) {
          throw new Error('Event is at capacity');
        }
      } else {
        await tx.event.update({
          where: { id: event.id },
          data: { registeredCount: { increment: 1 } },
        });
      }

      return tx.eventRegistration.create({
        data: {
          userId: session.user.id!,
          eventId: event.id,
          guestCount: parsed.data.guestCount,
          specialRequests: parsed.data.specialRequests || null,
        },
      });
    });

    if (session.user.email) {
      try {
        await sendEventRegistrationConfirmation({
          email: session.user.email,
          name: session.user.name ?? undefined,
          eventTitle: event.title,
          eventDate: event.startDate,
          eventLocation: event.location ?? undefined,
        });
      } catch (emailErr) {
        console.error('Event confirmation email failed (registration succeeded):', emailErr);
      }
    }

    return res.status(201).json({ registration });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
