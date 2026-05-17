import { GetServerSideProps } from 'next';
import { db } from '@/lib/db';
import DOMPurify from 'isomorphic-dompurify';
import EventDetailClient from '@/components/events/EventDetailClient';

interface Event {
  id: string;
  title: string;
  description: string | null;
  sanitizedDescription: string;
  slug: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  eventType: string;
  maxAttendees: number | null;
  registeredCount: number;
  goal: string | null;
  raisedAmount: string;
  image: string | null;
  tags: string[];
}

interface EventDetailPageProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailPageProps) {
  return <EventDetailClient event={event} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  const rawEvent = await db.event.findUnique({
    where: { slug },
    select: {
      id: true, title: true, description: true, slug: true,
      startDate: true, endDate: true, location: true, eventType: true,
      maxAttendees: true, registeredCount: true, goal: true, raisedAmount: true,
      image: true, tags: true,
    },
  });

  if (!rawEvent) {
    return { notFound: true };
  }

  const serializedEvent: Event = {
    ...rawEvent,
    startDate: rawEvent.startDate.toISOString(),
    endDate: rawEvent.endDate ? rawEvent.endDate.toISOString() : null,
    raisedAmount: rawEvent.raisedAmount.toString(),
    goal: rawEvent.goal ? rawEvent.goal.toString() : null,
    sanitizedDescription: DOMPurify.sanitize(rawEvent.description ?? ''),
  };

  return {
    props: {
      event: serializedEvent,
    },
  };
};
