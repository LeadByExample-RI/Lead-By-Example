import { GetServerSideProps } from 'next';
import { db } from '@/lib/db';
import EventDetailClient from '@/components/events/EventDetailClient';

interface Event {
  id: string;
  title: string;
  description: string | null;
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

interface Props {
  event: Event;
}

export default function EventDetail({ event }: Props) {
  return <EventDetailClient event={event} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  const event = await db.event.findUnique({
    where: { slug },
    select: {
      id: true, title: true, description: true, slug: true,
      startDate: true, endDate: true, location: true, eventType: true,
      maxAttendees: true, registeredCount: true, goal: true, raisedAmount: true,
      image: true, tags: true,
    },
  });

  if (!event) return { notFound: true };

  return {
    props: {
      event: JSON.parse(JSON.stringify(event)),
    },
  };
};
