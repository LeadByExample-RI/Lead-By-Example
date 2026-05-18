import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Star,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

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
    name: 'Ronald Hopkins',
    photo: 'RH',
    role: 'Community Mentor',
    expertise: ['Life Skills', 'Youth Advocacy', 'Community Support'],
    availability: 'Flexible - Call to Schedule',
    location: 'Providence, RI',
    matchesCompleted: 8,
    successRate: 100,
    bio: 'Ronald is a dedicated community leader and mentor committed to breaking the school-to-prison pipeline and empowering youth in Providence.',
    livedExperience: 'Community leader with lived experience guiding youth toward positive futures',
    interests: ['Community Building', 'Youth Development', 'Mentorship'],
    verified: true,
    featured: false,
  },
];

interface MentorFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

function MentorFormModal({
  heading,
  emailSubject,
  emailBodyIntro,
  successMessage,
  onClose,
}: {
  heading: string;
  emailSubject: string;
  emailBodyIntro: string;
  successMessage: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<MentorFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'This field is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'This field is required';
    if (!formData.phone.trim()) newErrors.phone = 'This field is required';
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = [
      emailBodyIntro,
      `First Name: ${formData.firstName}`,
      `Last Name: ${formData.lastName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
    ].join('%0A');
    const mailto = `mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${body}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#4B306A]/95 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-2xl font-bold mb-4">{successMessage}</h3>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-bold">{heading}</h3>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="text" placeholder="First Name" value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={inputClass} />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input type="text" placeholder="Last Name" value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={inputClass} />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Phone Number" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass} />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <input type="email" placeholder="Email Address" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass} />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all mt-2"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function MentorMatching() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBecomeMentorModal, setShowBecomeMentorModal] = useState(false);
  const [showRequestMentorModal, setShowRequestMentorModal] = useState(false);

  return (
    <section className="bg-gradient-to-b from-[#01514C] via-secondary-900 to-secondary-900 relative z-0 overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white drop-shadow-md md:text-5xl">Meet Our Mentors</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-white/80">
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
                className="rounded-xl glass-effect-dark p-4"
              >
                <div className="mb-2 flex justify-center text-gold-400">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mentor Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`transform cursor-pointer rounded-2xl p-6 glass-effect-dark shadow-glass-dark hover-lift border border-white/10 transition-all duration-300 ${
                mentor.featured ? 'ring-2 ring-gold-500' : ''
              }`}
              onClick={() => setSelectedMentor(mentor)}
            >
              {mentor.featured && (
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    Featured Mentor
                  </span>
                </div>
              )}

              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-xl font-bold text-black">
                  {mentor.photo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{mentor.name}</h3>
                    {mentor.verified && (
                      <CheckCircle className="h-5 w-5 fill-verdean-100 text-verdean-500" />
                    )}
                  </div>
                  <p className="text-sm text-white/80">{mentor.role}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 3).map((exp, i) => (
                  <span key={i} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                    {exp}
                  </span>
                ))}
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <div>
                  <div className="text-sm text-white/60">Matches</div>
                  <div className="text-lg font-bold text-white">{mentor.matchesCompleted}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Success Rate</div>
                  <div className="text-lg font-bold text-gold">{mentor.successRate}%</div>
                </div>
              </div>

              <p className="mb-4 line-clamp-3 text-sm text-white/80">{mentor.bio}</p>

              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {mentor.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {mentor.availability}
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg glass-button text-white border border-white/20 hover:bg-white/10 py-2 font-semibold transition-all"
              >
                Learn More
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {mentors.length === 0 && (
          <div className="py-12 text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">No mentors found</h3>
            <p className="text-gray-500">Try adjusting your filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 text-center md:p-12 relative z-0 overflow-hidden"
        >
          <h3 className="mb-4 text-3xl font-bold">Ready to Make a Difference?</h3>
          <p className="mb-8 text-xl opacity-90">
            Join our community of mentors with lived experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowBecomeMentorModal(true)}
              className="transform rounded-full glass-button px-8 py-4 font-semibold text-white border border-white/20 transition-all hover:scale-105 hover:bg-white/10"
            >
              Become a Mentor
            </button>
            <button
              type="button"
              onClick={() => setShowRequestMentorModal(true)}
              className="rounded-full glass-button px-8 py-4 font-semibold text-white border border-white/20 transition-all hover:bg-white/10"
            >
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
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-2xl font-bold text-black">
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

              <div className="mb-6">
                <h4 className="mb-2 font-semibold text-gray-900">About</h4>
                <p className="leading-relaxed text-gray-700">{selectedMentor.bio}</p>
              </div>

              <div className="mb-6 rounded-xl border border-verdean-100 bg-verdean-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-verdean-900">
                  <Heart className="h-5 w-5" />
                  Lived Experience
                </h4>
                <p className="text-verdean-800">{selectedMentor.livedExperience}</p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-gray-900">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((exp, i) => (
                    <span key={i} className="rounded-full bg-purple-50 px-4 py-2 font-medium text-purple-700">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

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

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setSelectedMentor(null); setShowRequestMentorModal(true); }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-verdean-500 to-green-600 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-verdean-500/30"
                >
                  Request This Mentor
                </button>
                <button
                  type="button"
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

      {/* Become a Mentor Modal */}
      <AnimatePresence>
        {showBecomeMentorModal && (
          <MentorFormModal
            heading="Become a Mentor"
            emailSubject="New Mentor Application — Lead By Example"
            emailBodyIntro="This person wants to become a mentor.%0A"
            successMessage="Thank you for your interest in becoming a mentor! We'll reach out soon."
            onClose={() => setShowBecomeMentorModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Request a Mentor Modal */}
      <AnimatePresence>
        {showRequestMentorModal && (
          <MentorFormModal
            heading="Request a Mentor"
            emailSubject="Mentor Request — Lead By Example"
            emailBodyIntro="This person is looking for a mentor.%0A"
            successMessage="Your mentor request has been submitted! We'll be in touch soon."
            onClose={() => setShowRequestMentorModal(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
