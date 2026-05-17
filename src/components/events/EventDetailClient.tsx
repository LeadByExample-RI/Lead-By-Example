"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface Props {
  event: Event;
}

const TYPE_COLORS: Record<string, string> = {
  community: 'bg-verdean-500/20 text-verdean-300',
  fundraiser: 'bg-gold/20 text-gold',
  mentorship: 'bg-royal-500/20 text-royal-300',
  workshop: 'bg-coral-accent/20 text-coral-accent',
};

export default function EventDetailClient({ event }: Props) {
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
    } else {
      setError(data.error || 'Registration failed. Please try again.');
    }
    setRegistering(false);
  };

  return (
    <>
      <Head>
        <title>{event.title} — Lead By Example</title>
        <meta name="description" content={event.description || `Join us for ${event.title}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-verdean-900/30 to-royal-900/30">
        <Navbar />

        <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6">
          <Link href="/events" className="mb-6 flex items-center gap-2 text-sm text-white/50 hover:text-white transition">
            <ArrowLeft size={16} /> Back to Events
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {event.image && (
              <div className="mb-8 h-64 overflow-hidden rounded-2xl">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              </div>
            )}

            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${TYPE_COLORS[event.eventType] || 'bg-white/10 text-white/60'}`}>
                {event.eventType}
              </span>
              {isPast && <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/40">Past Event</span>}
              {isFull && !isPast && <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-300">At Capacity</span>}
            </div>

            <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{event.title}</h1>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gold" />
                <div>
                  <p>{new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  {event.endDate && (
                    <p className="text-white/40">through {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                  )}
                </div>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gold" />
                  {event.location}
                </div>
              )}
              {event.maxAttendees && (
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gold" />
                  {event.registeredCount} / {event.maxAttendees} spots filled
                </div>
              )}
            </div>

            {/* Fundraising progress */}
            <div className="mt-6">
              {progress !== null && (
                <div className="mb-6 w-full rounded-lg bg-white/5 p-3">
                  <div className="mb-1 text-sm text-white/60">Raised ${event.raisedAmount} of ${event.goal}</div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-gold" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div
                className="prose max-w-none text-white/80"
                dangerouslySetInnerHTML={{ __html: event.sanitizedDescription }}
              />
              <div className="mt-8">
                {!isPast && !isFull && (
                  session ? (
                    registered ? (
                      <div className="rounded-lg bg-green-500/10 p-4 text-green-300">You're registered for this event.</div>
                    ) : (
                      <button onClick={handleRegister} disabled={registering}
                        className="rounded-full bg-gold px-6 py-3 font-semibold text-gray-900 hover:bg-gold/90">
                        {registering ? 'Registering…' : 'Register'}
                      </button>
                    )
                  ) : (
                    <Link href={`/auth/signin?callbackUrl=/events/${event.slug}`}
                      className="flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-semibold text-gray-900 transition hover:bg-gold/80 w-fit">
                      <LogIn size={16} /> Sign In to Register
                    </Link>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
