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
import { mentors, type Mentor } from '@/data/siteContent';
import { MotionGlassCard } from '@/components/ui/MotionGlassCard';
import { Button } from '@/components/ui';

interface MentorFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  shortBio: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  shortBio?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
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
    shortBio: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
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
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = [
      emailBodyIntro,
      '',
      '--- Personal Information ---',
      `First Name: ${formData.firstName}`,
      `Last Name: ${formData.lastName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      '',
      '--- Mailing Address ---',
      `Street: ${formData.streetAddress}`,
      `City: ${formData.city}`,
      `State: ${formData.state}`,
      `ZIP: ${formData.zipCode}`,
      '',
      '--- Background ---',
      `Short Bio / Why they want to help:`,
      formData.shortBio || 'Not provided',
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
      <MotionGlassCard
        variant="transparent"
        className="w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto z-[101]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-2xl font-bold mb-4">{successMessage}</h3>
            <Button type="button" onClick={onClose} variant="gold" className="px-8 py-3">Close</Button>
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
              {/* Personal Info Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="First Name *" value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={inputClass} />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Last Name *" value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={inputClass} />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="tel" placeholder="Phone Number *" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass} />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <input type="email" placeholder="Email Address *" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass} />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Mailing Address Section */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Mailing Address</h4>
                <div className="space-y-3">
                  <div>
                    <input type="text" placeholder="Street Address *" value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className={inputClass} />
                    {errors.streetAddress && <p className="text-red-400 text-sm mt-1">{errors.streetAddress}</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <input type="text" placeholder="City *" value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={inputClass} />
                      {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input type="text" placeholder="State *" value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className={inputClass} />
                      {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <input type="text" placeholder="ZIP *" value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className={inputClass} />
                      {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Bio Section */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">About You</h4>
                <div>
                  <textarea
                    placeholder="Short Bio / Why you want to help... (Tell us about your background, skills, and why you want to make a difference)"
                    rows={4}
                    value={formData.shortBio}
                    onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" className="w-fit py-3 mt-2">Submit</Button>
            </form>
          </>
        )}
      </MotionGlassCard>
    </motion.div>
  );
}

export default function MentorMatching() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBecomeMentorModal, setShowBecomeMentorModal] = useState(false);
  const [showRequestMentorModal, setShowRequestMentorModal] = useState(false);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Meet Our Mentors</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gold-400">
            Our dedicated mentors have lived experience and understand the journey. They&apos;re
            here to guide, support, and inspire the next generation.
          </p>

          {/* Stats Row */}
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Active Mentors', value: '12+', icon: <Users className="h-6 w-6" /> },
              { label: 'Youth Helped', value: '125+', icon: <Heart className="h-6 w-6" /> },
              { label: 'Success Rate', value: '100%', icon: <Star className="h-6 w-6" /> },
              { label: 'Years Serving', value: '5+', icon: <Award className="h-6 w-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-xl"
              >
                <div className="mb-2 flex justify-center text-gold-400">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
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
              className={`transform cursor-pointer rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl ${
                mentor.featured ? 'ring-2 ring-gold-400' : ''
              }`}
              onClick={() => setSelectedMentor(mentor)}
            >
              {mentor.featured && (
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-300">
                    Featured Mentor
                  </span>
                </div>
              )}

              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gold-400 text-xl font-bold text-black">
                  {mentor.photo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                    {mentor.verified && (
                      <CheckCircle className="h-5 w-5 fill-white/20 text-gold-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-300">{mentor.role}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 3).map((exp, i) => (
                  <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-200">
                    {exp}
                  </span>
                ))}
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                <div>
                  <div className="text-sm text-gray-300">Matches</div>
                  <div className="text-lg font-bold text-white">{mentor.matchesCompleted}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                  <div className="text-lg font-bold text-green-400">{mentor.successRate}%</div>
                </div>
              </div>

              <p className="mb-4 line-clamp-3 text-sm text-gray-300">{mentor.bio}</p>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  {mentor.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold-400" />
                  {mentor.availability}
                </div>
              </div>

              <Button
                type="button"
                variant="gold"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 py-2 font-semibold text-black transition-all hover:shadow-lg hover:shadow-gold-500/30"
              >
                Learn More
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {mentors.length === 0 && (
          <div className="py-12 text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-white">No mentors found</h3>
            <p className="text-gray-300">Try adjusting your filter criteria</p>
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
            <Button
              type="button"
              onClick={() => setShowBecomeMentorModal(true)}
              variant="gold"
              className="transform rounded-full bg-gold-400 px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:bg-gold-300"
            >
              Become a Mentor
            </Button>
            <Button
              type="button"
              onClick={() => setShowRequestMentorModal(true)}
              variant="outline"
              className="rounded-full border-2 border-white bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Request a Mentor
            </Button>
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
            <MotionGlassCard
              variant="transparent"
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gold-400 text-2xl font-bold text-black">
                  {selectedMentor.photo}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{selectedMentor.name}</h3>
                    {selectedMentor.verified && (
                      <CheckCircle className="h-6 w-6 fill-white/20 text-gold-400" />
                    )}
                  </div>
                  <p className="mb-2 text-gray-300">{selectedMentor.role}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                      {selectedMentor.successRate}% Success
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      {selectedMentor.matchesCompleted} Matches
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-2 font-semibold text-white">About</h4>
                <p className="leading-relaxed text-gray-300">{selectedMentor.bio}</p>
              </div>

              <div className="mb-6 rounded-xl border border-white/20 bg-white/5 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-gold-400">
                  <Heart className="h-5 w-5 text-gold-400" />
                  Lived Experience
                </h4>
                <p className="text-gray-300">{selectedMentor.livedExperience}</p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-white">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((exp, i) => (
                    <span key={i} className="rounded-full bg-white/10 px-4 py-2 font-medium text-gray-200">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-white">Interests & Hobbies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.interests.map((interest, i) => (
                    <span key={i} className="rounded-full bg-white/10 px-4 py-2 text-gray-200">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="mb-1 flex items-center gap-2 text-gray-200">
                    <Clock className="h-5 w-5 text-gold-400" />
                    <span className="font-semibold">Availability</span>
                  </div>
                  <p className="text-gray-300">{selectedMentor.availability}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="mb-1 flex items-center gap-2 text-gray-200">
                    <MapPin className="h-5 w-5 text-gold-400" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-gray-300">{selectedMentor.location}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => { setSelectedMentor(null); setShowRequestMentorModal(true); }}
                  variant="gold"
                  className="flex-1 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 py-3 font-semibold text-black transition-all hover:shadow-lg hover:shadow-gold-500/30"
                >
                  Request This Mentor
                </Button>
                <Button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  variant="outline"
                  className="rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/20"
                >
                  Close
                </Button>
              </div>
            </MotionGlassCard>
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
