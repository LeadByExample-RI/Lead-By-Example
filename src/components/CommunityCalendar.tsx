import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  TrendingUp,
  Award,
  BookOpen,
  Music,
  Utensils,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Bell,
  ExternalLink
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  endTime?: string;
  location: string;
  category: 'cookout' | 'mentorship' | 'workshop' | 'sports' | 'fundraiser' | 'community';
  spotsAvailable?: number;
  spotsTotal?: number;
  ageGroup: string;
  cost: string;
  organizer: string;
  image?: string;
  tags: string[];
  featured: boolean;
  registrationRequired: boolean;
}

const events: Event[] = [
  {
    id: '1',
    title: 'All Sides of Town Cookout 2025',
    description: 'Our signature community event bringing together youth and families from all neighborhoods. Free food, haircuts, activities, live music, and backpack giveaway. Everyone is welcome!',
    date: new Date('2025-08-02'),
    time: '12:30 PM',
    endTime: '8:00 PM',
    location: 'Lincoln Woods Site A&B',
    category: 'cookout',
    spotsAvailable: 150,
    spotsTotal: 500,
    ageGroup: 'All Ages',
    cost: 'Free',
    organizer: 'Lead By Example',
    tags: ['Family friendly', 'Food', 'Activities', 'Community'],
    featured: true,
    registrationRequired: false
  },
  {
    id: '2',
    title: 'New Mentor Orientation',
    description: 'Required orientation for new mentors. Learn about trauma-informed practices, our approach, expectations, and meet current mentors. Background check required before attending.',
    date: new Date('2025-06-15'),
    time: '6:00 PM',
    endTime: '8:30 PM',
    location: '120 Hawkins Street, Providence',
    category: 'mentorship',
    spotsAvailable: 8,
    spotsTotal: 20,
    ageGroup: 'Adults 21+',
    cost: 'Free',
    organizer: 'Lead By Example',
    tags: ['Training', 'Mentors', 'Orientation'],
    featured: true,
    registrationRequired: true
  },
  {
    id: '3',
    title: 'Life Skills Workshop: Financial Literacy',
    description: 'Learn budgeting, banking basics, credit scores, and money management. Interactive workshop with practical exercises you can use immediately.',
    date: new Date('2025-06-22'),
    time: '4:00 PM',
    endTime: '6:00 PM',
    location: 'Community Center, Providence',
    category: 'workshop',
    spotsAvailable: 12,
    spotsTotal: 25,
    ageGroup: 'Ages 16-24',
    cost: 'Free',
    organizer: 'Lead By Example',
    tags: ['Life skills', 'Financial literacy', 'Youth'],
    featured: false,
    registrationRequired: true
  },
  {
    id: '4',
    title: 'Basketball Tournament & BBQ',
    description: '3-on-3 basketball tournament followed by community BBQ. Great way to connect with mentors and peers in a fun, competitive environment.',
    date: new Date('2025-07-10'),
    time: '10:00 AM',
    endTime: '4:00 PM',
    location: 'South Providence Recreation Center',
    category: 'sports',
    spotsAvailable: 24,
    spotsTotal: 32,
    ageGroup: 'Ages 13-21',
    cost: 'Free',
    organizer: 'Lead By Example Sports Program',
    tags: ['Sports', 'Basketball', 'Community', 'Fun'],
    featured: false,
    registrationRequired: true
  },
  {
    id: '5',
    title: 'College Application Workshop',
    description: 'Get help with college applications, essays, and FAFSA. Bring your laptop and questions. First-generation college students especially encouraged to attend.',
    date: new Date('2025-06-29'),
    time: '2:00 PM',
    endTime: '5:00 PM',
    location: '120 Hawkins Street, Providence',
    category: 'workshop',
    spotsAvailable: 15,
    spotsTotal: 20,
    ageGroup: 'High School Juniors & Seniors',
    cost: 'Free',
    organizer: 'Lead By Example Education Team',
    tags: ['College prep', 'Education', 'Scholarships'],
    featured: true,
    registrationRequired: true
  },
  {
    id: '6',
    title: 'Community Cleanup & Pizza Party',
    description: 'Help beautify our neighborhood! We\'ll clean up local parks and streets, then celebrate with pizza. Service hours available for students.',
    date: new Date('2025-06-17'),
    time: '9:00 AM',
    endTime: '1:00 PM',
    location: 'Meet at 120 Hawkins Street',
    category: 'community',
    spotsAvailable: 30,
    spotsTotal: 40,
    ageGroup: 'Ages 12+',
    cost: 'Free',
    organizer: 'Lead By Example',
    tags: ['Community service', 'Volunteering', 'Environment'],
    featured: false,
    registrationRequired: true
  },
  {
    id: '7',
    title: 'Music Production Workshop with Local Artist',
    description: 'Learn the basics of music production from a Providence-based producer. Bring your creativity, we\'ll provide the equipment and knowledge.',
    date: new Date('2025-07-06'),
    time: '3:00 PM',
    endTime: '6:00 PM',
    location: 'Community Arts Center',
    category: 'workshop',
    spotsAvailable: 10,
    spotsTotal: 15,
    ageGroup: 'Ages 14-24',
    cost: 'Free',
    organizer: 'Lead By Example Arts Program',
    tags: ['Music', 'Arts', 'Creative expression'],
    featured: false,
    registrationRequired: true
  },
  {
    id: '8',
    title: 'Monthly Mentor Meetup',
    description: 'Casual gathering for all current mentors and mentees. Share experiences, challenges, and successes. Light refreshments provided.',
    date: new Date('2025-06-25'),
    time: '7:00 PM',
    endTime: '9:00 PM',
    location: '120 Hawkins Street, Providence',
    category: 'mentorship',
    ageGroup: 'Mentors & Mentees',
    cost: 'Free',
    organizer: 'Lead By Example',
    tags: ['Networking', 'Support', 'Community'],
    featured: false,
    registrationRequired: false
  }
];

const categoryConfig = {
  all: { name: 'All Events', icon: <Calendar className="w-5 h-5" />, color: 'gray' },
  cookout: { name: 'Cookouts', icon: <Utensils className="w-5 h-5" />, color: 'orange' },
  mentorship: { name: 'Mentorship', icon: <Heart className="w-5 h-5" />, color: 'red' },
  workshop: { name: 'Workshops', icon: <BookOpen className="w-5 h-5" />, color: 'blue' },
  sports: { name: 'Sports & Recreation', icon: <Dumbbell className="w-5 h-5" />, color: 'green' },
  fundraiser: { name: 'Fundraisers', icon: <TrendingUp className="w-5 h-5" />, color: 'gold' },
  community: { name: 'Community', icon: <Users className="w-5 h-5" />, color: 'purple' }
};

export default function CommunityCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filter events
  const filteredEvents = events
    .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const upcomingEvents = filteredEvents.filter(event => event.date >= new Date());
  const featuredEvents = upcomingEvents.filter(event => event.featured);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Community Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Join us for cookouts, workshops, sports, and community gatherings. All events are designed to build connections and support growth.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-verdean-500" />
              <span className="font-semibold text-gray-700">{upcomingEvents.length} Upcoming Events</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-700">500+ Expected Attendees</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="font-semibold text-gray-700">All Free or Low Cost</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-verdean-500 text-white shadow-lg shadow-verdean-500/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {config.icon}
                {config.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Events Banner */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-7 h-7 text-gold-500" />
              Featured Events
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredEvents.slice(0, 2).map((event, index) => (
                <FeaturedEventCard key={event.id} event={event} index={index} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <EventListCard key={event.id} event={event} index={index} onClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        </div>

        {/* No Events */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">Check back soon for upcoming events or try a different category</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-3 bg-verdean-500 text-white rounded-full font-semibold hover:bg-verdean-600 transition-all"
            >
              View All Events
            </button>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-verdean-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <Bell className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Never Miss an Event</h3>
          <p className="text-xl mb-8 opacity-90">
            Sign up for our newsletter to get event reminders and exclusive invitations
          </p>
          <button className="px-8 py-4 bg-white text-verdean-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
            Subscribe to Updates
          </button>
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Featured Event Card
function FeaturedEventCard({ event, index, onClick }: { event: Event; index: number; onClick: () => void }) {
  const category = categoryConfig[event.category];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-gold-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all cursor-pointer transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            {category.icon}
          </div>
          <div>
            <div className="text-sm font-semibold opacity-90 uppercase tracking-wide">
              {category.name}
            </div>
            {event.featured && (
              <div className="text-xs font-medium opacity-75">
                ⭐ Featured Event
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-3">{event.title}</h3>
      <p className="text-white/90 mb-6 line-clamp-2">{event.description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">
            {event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{event.time} {event.endTime && `- ${event.endTime}`}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">{event.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="opacity-75">Cost: </span>
          <span className="font-bold">{event.cost}</span>
        </div>
        {event.spotsAvailable && (
          <div className="text-sm">
            <span className="font-bold">{event.spotsAvailable}</span>
            <span className="opacity-75"> / {event.spotsTotal} spots left</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Event List Card
function EventListCard({ event, index, onClick }: { event: Event; index: number; onClick: () => void }) {
  const category = categoryConfig[event.category];
  const daysUntil = Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Date Badge */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-verdean-500 to-purple-500 rounded-2xl flex flex-col items-center justify-center text-white">
            <div className="text-sm font-semibold">
              {event.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
            </div>
            <div className="text-3xl font-bold">
              {event.date.getDate()}
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </div>
              {daysUntil <= 7 && (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                  {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                </span>
              )}
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-verdean-600 transition-colors">
            {event.title}
          </h4>
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location.split(',')[0]}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {event.ageGroup}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 flex flex-col justify-between items-end">
          <div className="text-right mb-4">
            <div className="text-2xl font-bold text-verdean-600">{event.cost}</div>
            {event.spotsAvailable && (
              <div className="text-sm text-gray-500">
                {event.spotsAvailable} spots left
              </div>
            )}
          </div>
          <button className="px-6 py-2 bg-verdean-500 text-white rounded-lg font-semibold hover:bg-verdean-600 transition-all group-hover:shadow-lg group-hover:shadow-verdean-500/30">
            {event.registrationRequired ? 'Register' : 'Details'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Event Detail Modal
function EventDetailModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const category = categoryConfig[event.category];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-verdean-500 to-purple-500 p-8 text-white rounded-t-3xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                {category.icon}
              </div>
              <div>
                <div className="text-sm font-semibold opacity-90 uppercase">
                  {category.name}
                </div>
                <div className="text-xs opacity-75">
                  {event.ageGroup}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {event.time} {event.endTime && `- ${event.endTime}`}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Location</span>
              </div>
              <p className="text-gray-600">{event.location}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Organizer</span>
              </div>
              <p className="text-gray-600">{event.organizer}</p>
            </div>

            <div className="p-4 bg-verdean-50 rounded-xl border border-verdean-100">
              <div className="flex items-center gap-2 text-verdean-700 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Cost</span>
              </div>
              <p className="text-2xl font-bold text-verdean-600">{event.cost}</p>
            </div>

            {event.spotsAvailable && (
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Availability</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {event.spotsAvailable} / {event.spotsTotal}
                </p>
                <p className="text-sm text-purple-600">spots remaining</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Event Tags</h4>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {event.registrationRequired ? (
              <button className="flex-1 py-4 bg-gradient-to-r from-verdean-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-verdean-500/30 transition-all">
                Register for Event
              </button>
            ) : (
              <button className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Add to Calendar
              </button>
            )}
            <button className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
