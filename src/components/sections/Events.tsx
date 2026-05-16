'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import Image from 'next/image';

interface AnnualEvent {
  id: number;
  year: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  highlight: string;
  color: string;
}

const annualEvents: AnnualEvent[] = [
  {
    id: 3,
    year: 3,
    title: '3rd Annual Community Cookout',
    date: 'August 2022',
    location: 'Providence, RI',
    attendees: 150,
    image: '/images/events/3rd-cookout.jpg',
    highlight: 'First major youth leadership workshop',
    color: 'from-[#4B306A] to-[#6B408A]',
  },
  {
    id: 4,
    year: 4,
    title: '4th Annual Community Cookout',
    date: 'August 2023',
    location: 'Providence, RI',
    attendees: 250,
    image: '/images/events/4th-cookout.jpg',
    highlight: 'Launched mentorship matching program',
    color: 'from-[#01514C] to-[#027a6e]',
  },
  {
    id: 5,
    year: 5,
    title: '5th Annual Community Cookout',
    date: 'August 2024',
    location: 'Providence, RI',
    attendees: 400,
    image: '/images/events/5th-cookout.jpg',
    highlight: 'Record-breaking community participation',
    color: 'from-[#4B306A] via-[#01514C] to-[#4B306A]',
  },
];

const pavilionImage = '/images/events/pavilion.jpg';

function EventFlyer({ event, position }: { event: AnnualEvent; position: 'left' | 'right-top' | 'right-bottom' }) {
  const positionClasses = {
    left: 'lg:col-span-1 lg:row-span-2',
    'right-top': 'lg:col-span-1',
    'right-bottom': 'lg:col-span-1',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: event.id * 0.1 }}
      className={`relative group ${positionClasses[position]}`}
    >
      <div className="h-full bg-[#080b12]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#FFD700]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFD700]/10">
        {/* Event Image */}
        <div className={`h-48 lg:h-56 relative overflow-hidden bg-gradient-to-br ${event.color}`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-white/90 drop-shadow-lg">
                {event.year}<span className="text-2xl align-top">th</span>
              </div>
              <div className="text-white/80 text-sm uppercase tracking-widest mt-2">Annual</div>
            </div>
          </div>
          {/* Year Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#FFD700] text-black text-xs font-bold rounded-full">
            {event.date}
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 text-[#FFD700]" />
              {event.location}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Users className="w-4 h-4 text-[#FFD700]" />
              {event.attendees}+ attendees
            </div>
          </div>

          {/* Highlight Badge */}
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
            <Trophy className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
            <span className="text-sm text-gray-300">{event.highlight}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Events() {
  return (
    <section id="events" className="py-20 bg-[#0a0a0f]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Annual Community <span className="text-[#FFD700]">Cookouts</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Celebrating five years of bringing our community together. Each event builds on the last, 
            creating lasting connections and positive change.
          </p>
        </motion.div>

        {/* Masonry Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Left Column - 3rd Annual (spans 2 rows) */}
          <EventFlyer event={annualEvents[0]} position="left" />

          {/* Center Column - Pavilion Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 lg:row-span-2 relative group"
          >
            <div className="h-full min-h-[400px] lg:min-h-full relative rounded-2xl overflow-hidden border border-white/10">
              {/* Pavilion Photo with Dark Overlay */}
              <div className="absolute inset-0 bg-[#080b12]">
                <Image
                  src={pavilionImage}
                  alt="Community Pavilion"
                  fill
                  className="object-cover opacity-60"
                  priority
                />
                {/* High-contrast dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-[#0a0a0f]/40" />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Center Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 mb-4">
                    <Calendar className="w-10 h-10 text-[#FFD700]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Year 6 is Coming
                  </h3>
                  <p className="text-lg text-gray-300 max-w-sm">
                    Join us for our biggest celebration yet. Together, we&apos;re building a stronger community.
                  </p>
                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                      August 2025
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - 4th & 5th Annual (stacked) */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            <EventFlyer event={annualEvents[1]} position="right-top" />
            <EventFlyer event={annualEvents[2]} position="right-bottom" />
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: '5', label: 'Years Running', color: '#FFD700' },
            { value: '800+', label: 'Total Attendees', color: '#4B306A' },
            { value: '50+', label: 'Volunteers', color: '#01514C' },
            { value: '100%', label: 'Community Love', color: '#FFD700' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#080b12]/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-all"
            >
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
