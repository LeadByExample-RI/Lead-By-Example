import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Dumbbell,
  Filter,
  Heart,
  MapPin,
  Music,
  Palette,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';

interface Mentor {
  id: string;
  name: string;
  photo: string;
  role: string;
  expertise: string[];
  availability: string;
  location: string;
  matchesCompleted: number;
  successRate: number;
  bio: string;
  livedExperience: string;
  interests: string[];
  verified: boolean;
  featured: boolean;
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Robert McKinney Sr.',
    photo: 'RM',
    role: 'Founder & Lead Mentor',
    expertise: ['Life Skills', 'Career Guidance', 'Leadership Development'],
    availability: 'Flexible - Call to Schedule',
    location: 'Providence, RI',
    matchesCompleted: 12,
    successRate: 100,
    bio: "Founder of Lead By Example. I've dedicated my life to interrupting the school-to-prison pipeline using my lived experience to guide our youth toward better futures.",
    livedExperience: 'Overcame personal challenges, now leading community change',
    interests: ['Community Building', 'Youth Advocacy', 'Mentorship'],
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: '[Mentor Name]',
    photo: 'M1',
    role: 'Community Volunteer & Mentor',
    expertise: ['Academic Support', 'Life Skills'],
    availability: 'Weekends',
    location: 'Providence, RI',
    matchesCompleted: 3,
    successRate: 100,
    bio: 'Passionate about helping youth in our community find their path. I believe every young person deserves a chance to succeed.',
    livedExperience: 'Local community member with lived experience',
    interests: ['Reading', 'Sports', 'Community Service'],
    verified: true,
    featured: false,
  },
  {
    id: '3',
    name: '[Mentor Name]',
    photo: 'M2',
    role: 'Youth Advocate',
    expertise: ['Sports Mentorship', 'Life Skills'],
    availability: 'After School Hours',
    location: 'Providence, RI',
    matchesCompleted: 5,
    successRate: 100,
    bio: 'Using my experience to help young people stay focused and build positive habits through sports and mentorship.',
    livedExperience: 'Overcame challenges, now giving back to community',
    interests: ['Basketball', 'Fitness', 'Youth Development'],
    verified: true,
    featured: false,
  },
  {
    id: '4',
    name: '[Mentor Name]',
    photo: 'M3',
    role: 'Community Member & Mentor',
    expertise: ['Career Guidance', 'Life Skills'],
    availability: 'Evenings',
    location: 'Providence, RI',
    matchesCompleted: 2,
    successRate: 100,
    bio: 'Committed to helping our youth see possibilities beyond their current circumstances and supporting their journey to success.',
    livedExperience: 'Local advocate with personal transformation story',
    interests: ['Career Development', 'Community', 'Mentoring'],
    verified: true,
    featured: false,
  },
];

const expertiseAreas = [
  { name: 'Academic Support', icon: <BookOpen className="h-5 w-5" /> },
  { name: 'Life Skills', icon: <Star className="h-5 w-5" /> },
  { name: 'Career Guidance', icon: <Briefcase className="h-5 w-5" /> },
  { name: 'STEM Education', icon: <Code className="h-5 w-5" /> },
  { name: 'Sports & Fitness', icon: <Dumbbell className="h-5 w-5" /> },
  { name: 'Arts & Creativity', icon: <Palette className="h-5 w-5" /> },
  { name: 'Music', icon: <Music className="h-5 w-5" /> },
  { name: 'Trauma Support', icon: <Heart className="h-5 w-5" /> },
];

export default function MentorMatching() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(selectedFilter.toLowerCase()));
    const matchesSearch =
      searchTerm === '' ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Meet Our Mentors</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Our dedicated mentors have lived experience and understand the journey. They&apos;re
            here to guide, support, and inspire the next generation.
          </p>

          {/* Stats Row */}
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Active Mentors', value: '12+', icon: <Users className="h-6 w-6" /> },
              { label: 'Youth Helped', value: '50+', icon: <Heart className="h-6 w-6" /> },
              { label: 'Success Rate', value: '100%', icon: <Star className="h-6 w-6" /> },
              { label: 'Years Serving', value: '5+', icon: <Award className="h-6 w-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-4 shadow-md"
              >
                <div className="mb-2 flex justify-center text-verdean-500">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-verdean-500 focus:ring-2 focus:ring-verdean-500/20"
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-verdean-500 focus:ring-2 focus:ring-verdean-500/20"
              >
                <option value="all">All Expertise Areas</option>
                {expertiseAreas.map((area) => (
                  <option key={area.name} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`transform cursor-pointer rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                mentor.featured ? 'ring-2 ring-gold-500' : ''
              }`}
              onClick={() => setSelectedMentor(mentor)}
            >
              {mentor.featured && (
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-700">
                    Featured Mentor
                  </span>
                </div>
              )}

              {/* Mentor Avatar */}
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-verdean-500 to-purple-500 text-xl font-bold text-white">
                  {mentor.photo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    {mentor.verified && (
                      <CheckCircle className="h-5 w-5 fill-verdean-100 text-verdean-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{mentor.role}</p>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 3).map((exp, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-verdean-50 px-3 py-1 text-xs font-medium text-verdean-700"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                <div>
                  <div className="text-sm text-gray-500">Matches</div>
                  <div className="text-lg font-bold text-gray-900">{mentor.matchesCompleted}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                  <div className="text-lg font-bold text-green-600">{mentor.successRate}%</div>
                </div>
              </div>

              {/* Bio Preview */}
              <p className="mb-4 line-clamp-3 text-sm text-gray-600">{mentor.bio}</p>

              {/* Location & Availability */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {mentor.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {mentor.availability}
                </div>
              </div>

              {/* CTA */}
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-verdean-500 to-green-600 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-verdean-500/30">
                Learn More
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="py-12 text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">No mentors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-purple-600 to-verdean-600 p-8 text-center text-white md:p-12"
        >
          <h3 className="mb-4 text-3xl font-bold">Ready to Make a Difference?</h3>
          <p className="mb-8 text-xl opacity-90">
            Join our community of mentors with lived experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="transform rounded-full bg-white px-8 py-4 font-semibold text-purple-600 transition-all hover:scale-105 hover:bg-gray-100">
              Become a Mentor
            </button>
            <button className="rounded-full border-2 border-white bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              Request a Mentor
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mentor Detail Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedMentor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-verdean-500 to-purple-500 text-2xl font-bold text-white">
                  {selectedMentor.photo}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h3>
                    {selectedMentor.verified && (
                      <CheckCircle className="h-6 w-6 fill-verdean-100 text-verdean-500" />
                    )}
                  </div>
                  <p className="mb-2 text-gray-600">{selectedMentor.role}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                      {selectedMentor.successRate}% Success
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {selectedMentor.matchesCompleted} Matches
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="mb-2 font-semibold text-gray-900">About</h4>
                <p className="leading-relaxed text-gray-700">{selectedMentor.bio}</p>
              </div>

              {/* Lived Experience */}
              <div className="mb-6 rounded-xl border border-verdean-100 bg-verdean-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-verdean-900">
                  <Heart className="h-5 w-5" />
                  Lived Experience
                </h4>
                <p className="text-verdean-800">{selectedMentor.livedExperience}</p>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-gray-900">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-purple-50 px-4 py-2 font-medium text-purple-700"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-gray-900">Interests & Hobbies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.interests.map((interest, i) => (
                    <span key={i} className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-gray-700">
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">Availability</span>
                  </div>
                  <p className="text-gray-600">{selectedMentor.availability}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-gray-700">
                    <MapPin className="h-5 w-5" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-gray-600">{selectedMentor.location}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 rounded-xl bg-gradient-to-r from-verdean-500 to-green-600 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-verdean-500/30">
                  Request This Mentor
                </button>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
