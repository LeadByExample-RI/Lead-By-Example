import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Calendar, MapPin, Users, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

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
  goal: number | null;
  raisedAmount: number;
  image: string | null;
  tags: string[];
}

const TYPE_LABELS: Record<string, string> = {
  community: 'Community',
  fundraiser: 'Fundraiser',
  mentorship: 'Mentorship',
  workshop: 'Workshop',
};

const TYPE_COLORS: Record<string, string> = {
  community: 'bg-verdean-500/20 text-verdean-300',
  fundraiser: 'bg-gold/20 text-gold',
  mentorship: 'bg-royal-500/20 text-royal-300',
  workshop: 'bg-coral-accent/20 text-coral-accent',
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (showUpcoming) params.set('upcoming', 'true');
    if (filter) params.set('type', filter);

    fetch(`/api/events?${params}`)
      .then((r) => r.json())
      .then((d) => setEvents(d.events || []))
      .finally(() => setLoading(false));
  }, [filter, showUpcoming]);

  return (
    <>
      <Head>
        <title>Events — Lead By Example</title>
        <meta name="description" content="Upcoming events, community gatherings, fundraisers, and mentorship workshops from Lead By Example." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-verdean-900/30 to-royal-900/30">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
          {/* Header */}
          <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              Events &amp; <span className="text-gold">Community</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Join us for community gatherings, fundraisers, mentorship sessions, and workshops that strengthen our mission.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Filter size={16} className="text-white/40" />
            <button
              onClick={() => setShowUpcoming(!showUpcoming)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${showUpcoming ? 'bg-gold text-gray-900' : 'border border-white/20 text-white/60 hover:text-white'}`}
            >
              {showUpcoming ? 'Upcoming' : 'All Events'}
            </button>
            {['', 'community', 'fundraiser', 'mentorship', 'workshop'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === t ? 'bg-verdean-500/40 text-verdean-200' : 'border border-white/10 text-white/50 hover:text-white'}`}
              >
                {t === '' ? 'All Types' : TYPE_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Events grid */}
          {loading && (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-16 text-center text-white/40">
              <Calendar size={40} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No events found</p>
              <p className="mt-1 text-sm">Check back soon for upcoming events.</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => {
              const isPast = new Date(event.startDate) < new Date();
              const progress = event.goal ? Math.min(100, (event.raisedAmount / Number(event.goal)) * 100) : null;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`group flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-gold/30 hover:bg-white/10 ${isPast ? 'opacity-60' : ''}`}
                >
                  {event.image && (
                    <div className="h-44 overflow-hidden rounded-t-2xl bg-gradient-to-br from-verdean-800 to-royal-900">
                      <img src={event.image} alt={event.title} className="h-full w-full object-cover opacity-80 transition group-hover:scale-105" />
                    </div>
                  )}

                  {!event.image && (
                    <div className="flex h-32 items-center justify-center rounded-t-2xl bg-gradient-to-br from-verdean-800/60 to-royal-800/60">
                      <Calendar size={40} className="text-gold/40" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_COLORS[event.eventType] || 'bg-white/10 text-white/60'}`}>
                        {TYPE_LABELS[event.eventType] || event.eventType}
                      </span>
                      {isPast && <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/40">Past</span>}
                    </div>

                    <h2 className="font-heading text-lg font-semibold text-white group-hover:text-gold transition">{event.title}</h2>
                    {event.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-white/50">{event.description}</p>
                    )}

                    <div className="mt-3 space-y-1.5 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      )}
                      {event.maxAttendees && (
                        <div className="flex items-center gap-2">
                          <Users size={14} />
                          {event.registeredCount} / {event.maxAttendees} registered
                        </div>
                      )}
                    </div>

                    {progress !== null && (
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-white/40">Raised</span>
                          <span className="font-semibold text-gold">
                            ${Number(event.raisedAmount).toLocaleString()} / ${Number(event.goal).toLocaleString()}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold/60" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4">
                      <Link
                        href={`/events/${event.slug}`}
                        className="flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80 transition"
                      >
                        {isPast ? 'View Details' : 'Learn More & Register'}
                        <ChevronRight size={15} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
