import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Heart,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  BookOpen,
  Music,
  Code,
  Palette,
  Dumbbell,
  Briefcase,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

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
    name: 'Marcus Thompson',
    photo: 'MT',
    role: 'Youth Advocate & Former Educator',
    expertise: ['Academic Support', 'Life Skills', 'Career Guidance'],
    availability: 'Evenings & Weekends',
    location: 'Providence, RI',
    matchesCompleted: 23,
    successRate: 96,
    bio: 'Former at-risk youth turned educator. I understand the challenges our young people face because I lived them. Now I use my experience to help others find their path.',
    livedExperience: 'Overcame juvenile justice involvement, completed college, became a teacher',
    interests: ['Basketball', 'Music Production', 'Reading'],
    verified: true,
    featured: true
  },
  {
    id: '2',
    name: 'Keisha Williams',
    photo: 'KW',
    role: 'Community Organizer & Counselor',
    expertise: ['Trauma-Informed Support', 'College Prep', 'Social-Emotional Learning'],
    availability: 'Weekday Afternoons',
    location: 'Providence, RI',
    matchesCompleted: 31,
    successRate: 94,
    bio: 'Passionate about breaking cycles and building futures. I work with youth who face similar struggles I overcame, focusing on healing and growth.',
    livedExperience: 'Foster care system survivor, first-generation college graduate, licensed counselor',
    interests: ['Art Therapy', 'Poetry', 'Community Organizing'],
    verified: true,
    featured: true
  },
  {
    id: '3',
    name: 'David Rodriguez',
    photo: 'DR',
    role: 'Tech Professional & Mentor',
    expertise: ['STEM Education', 'Career Pathways', 'Leadership Development'],
    availability: 'Flexible Schedule',
    location: 'Pawtucket, RI',
    matchesCompleted: 18,
    successRate: 92,
    bio: 'I grew up in Providence thinking tech careers weren\'t for people like me. Now I\'m a software engineer showing youth that every door is open with the right support.',
    livedExperience: 'Dropout prevention program participant, community college to tech career',
    interests: ['Coding', 'Gaming', 'Mentorship'],
    verified: true,
    featured: false
  },
  {
    id: '4',
    name: 'Tamika Johnson',
    photo: 'TJ',
    role: 'Business Owner & Youth Advocate',
    expertise: ['Entrepreneurship', 'Financial Literacy', 'Personal Development'],
    availability: 'Weekends',
    location: 'Providence, RI',
    matchesCompleted: 15,
    successRate: 98,
    bio: 'From struggle to success, I built my own business and want to teach youth the skills I learned along the way. Financial literacy and entrepreneurship change lives.',
    livedExperience: 'Single mother, overcame poverty, built successful salon business',
    interests: ['Business', 'Fashion', 'Fitness'],
    verified: true,
    featured: false
  },
  {
    id: '5',
    name: 'Andre Washington',
    photo: 'AW',
    role: 'Former Athlete & Youth Coach',
    expertise: ['Sports Mentorship', 'Discipline & Focus', 'Academic Accountability'],
    availability: 'After School Hours',
    location: 'Central Falls, RI',
    matchesCompleted: 27,
    successRate: 89,
    bio: 'Sports saved my life and taught me discipline. Now I use athletics as a bridge to help young men and women develop life skills and stay on track.',
    livedExperience: 'Gang involvement, found path through sports, college athlete, now coach',
    interests: ['Basketball', 'Football', 'Fitness Training'],
    verified: true,
    featured: true
  },
  {
    id: '6',
    name: 'Lisa Chen',
    photo: 'LC',
    role: 'Social Worker & Family Advocate',
    expertise: ['Family Support', 'Mental Health', 'Resource Navigation'],
    availability: 'Weekday Evenings',
    location: 'Providence, RI',
    matchesCompleted: 22,
    successRate: 95,
    bio: 'Working with families experiencing crisis is my calling. I help youth and their families access resources, navigate systems, and build stronger foundations.',
    livedExperience: 'Immigrant family, experienced housing insecurity, MSW degree, bilingual advocate',
    interests: ['Community Service', 'Cultural Arts', 'Family Wellness'],
    verified: true,
    featured: false
  }
];

const expertiseAreas = [
  { name: 'Academic Support', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Life Skills', icon: <Star className="w-5 h-5" /> },
  { name: 'Career Guidance', icon: <Briefcase className="w-5 h-5" /> },
  { name: 'STEM Education', icon: <Code className="w-5 h-5" /> },
  { name: 'Sports & Fitness', icon: <Dumbbell className="w-5 h-5" /> },
  { name: 'Arts & Creativity', icon: <Palette className="w-5 h-5" /> },
  { name: 'Music', icon: <Music className="w-5 h-5" /> },
  { name: 'Trauma Support', icon: <Heart className="w-5 h-5" /> }
];

export default function MentorMatching() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const filteredMentors = mentors.filter(mentor => {
    const matchesFilter = selectedFilter === 'all' || 
      mentor.expertise.some(exp => exp.toLowerCase().includes(selectedFilter.toLowerCase()));
    const matchesSearch = searchTerm === '' ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Mentors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our mentors have lived experience and understand the journey. They're here to guide, support, and inspire the next generation.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Active Mentors', value: '85+', icon: <Users className="w-6 h-6" /> },
              { label: 'Youth Matched', value: '500+', icon: <Heart className="w-6 h-6" /> },
              { label: 'Success Rate', value: '87%', icon: <Star className="w-6 h-6" /> },
              { label: 'Combined Experience', value: '200+ yrs', icon: <Award className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <div className="text-verdean-500 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-verdean-500 focus:ring-2 focus:ring-verdean-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-verdean-500 focus:ring-2 focus:ring-verdean-500/20 outline-none transition-all appearance-none bg-white"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 ${
                mentor.featured ? 'ring-2 ring-gold-500' : ''
              }`}
              onClick={() => setSelectedMentor(mentor)}
            >
              {mentor.featured && (
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span className="text-xs font-semibold text-gold-700 uppercase tracking-wide">
                    Featured Mentor
                  </span>
                </div>
              )}

              {/* Mentor Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-verdean-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {mentor.photo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    {mentor.verified && (
                      <CheckCircle className="w-5 h-5 text-verdean-500 fill-verdean-100" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{mentor.role}</p>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.slice(0, 3).map((exp, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-verdean-50 text-verdean-700 text-xs rounded-full font-medium"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
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
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{mentor.bio}</p>

              {/* Location & Availability */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {mentor.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {mentor.availability}
                </div>
              </div>

              {/* CTA */}
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-verdean-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-verdean-500/30 transition-all flex items-center justify-center gap-2">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No mentors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-verdean-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join our community of mentors with lived experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Become a Mentor
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all">
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMentor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-verdean-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {selectedMentor.photo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h3>
                    {selectedMentor.verified && (
                      <CheckCircle className="w-6 h-6 text-verdean-500 fill-verdean-100" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{selectedMentor.role}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                      {selectedMentor.successRate}% Success
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedMentor.matchesCompleted} Matches
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-gray-700 leading-relaxed">{selectedMentor.bio}</p>
              </div>

              {/* Lived Experience */}
              <div className="mb-6 p-4 bg-verdean-50 rounded-xl border border-verdean-100">
                <h4 className="font-semibold text-verdean-900 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Lived Experience
                </h4>
                <p className="text-verdean-800">{selectedMentor.livedExperience}</p>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Interests & Hobbies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Availability</span>
                  </div>
                  <p className="text-gray-600">{selectedMentor.availability}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-gray-600">{selectedMentor.location}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-verdean-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-verdean-500/30 transition-all">
                  Request This Mentor
                </button>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
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
