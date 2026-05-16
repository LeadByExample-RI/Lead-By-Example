import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '@/lib/db';

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
  import { db } from '@/lib/db';
  import EventDetailClient from '@/components/events/EventDetailClient';

interface Props {
  event: Event;
}

const TYPE_COLORS: Record<string, string> = {
  community: 'bg-verdean-500/20 text-verdean-300',
  fundraiser: 'bg-gold/20 text-gold',
  mentorship: 'bg-royal-500/20 text-royal-300',
  workshop: 'bg-coral-accent/20 text-coral-accent',
};

export default function EventDetail({ event }: Props) {
  const { data: session } = useSession();
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const isPast = new Date(event.startDate) < new Date();
  const isFull = event.maxAttendees !== null && event.registeredCount >= event.maxAttendees;
  const progress = event.goal ? Math.min(100, (Number(event.raisedAmount) / Number(event.goal)) * 100) : null;

  const handleRegister = async () => {
    setRegistering(true);
    setError('');
    const r = await fetch(`/api/events/${event.slug}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    const data = await r.json();
    if (r.ok) {
      setRegistered(true);
  export default function EventDetail({ event }: Props) {
    return <EventDetailClient event={event} />;
                    </button>
                  </>
                ) : (
                  <Link href={`/auth/signin?callbackUrl=/events/${event.slug}`}
                    className="flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-semibold text-gray-900 transition hover:bg-gold/80 w-fit">
                    <LogIn size={16} /> Sign In to Register
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
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
