import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Calendar } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Heading, Text } from '@/components/ui/Typography'

const archiveData = [
  {
    id: 2,
    title: "Youth Empowerment Summit 2024",
    date: "June 2024",
    description: "A comprehensive summit featuring workshops, mentorship sessions, and career guidance.",
    impact: "92% of participants reported increased confidence",
    color: "from-secondary-500 to-secondary-600"
  },
  {
    id: 3,
    title: "Winter Clothing Drive 2023",
    date: "December 2023",
    description: "Distributed warm clothing, coats, and winter essentials to families in need.",
    impact: "95% satisfaction rate from beneficiaries",
    color: "from-accent-500 to-accent-600"
  },
  {
    id: 4,
    title: "Institution of Non-Violence",
    date: "2024",
    description: "A community initiative dedicated to promoting non-violence, conflict resolution, and peaceful engagement throughout Providence neighborhoods.",
    impact: "125+ youth served",
    color: "from-verdean-500 to-verdean-600"
  },
]

// --- Volunteer With Us Modal ---
interface VolunteerFormData { firstName: string; lastName: string; phone: string; email: string; }
interface VolunteerErrors { firstName?: string; lastName?: string; phone?: string; email?: string; }

function VolunteerModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<VolunteerFormData>({ firstName: '', lastName: '', phone: '', email: '' });
  const [errors, setErrors] = useState<VolunteerErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: VolunteerErrors = {};
    if (!form.firstName.trim()) e.firstName = 'This field is required';
    if (!form.lastName.trim()) e.lastName = 'This field is required';
    if (!form.phone.trim()) e.phone = 'This field is required';
    if (!form.email.trim()) e.email = 'This field is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const body = [
      'This person wants to volunteer.',
      `First Name: ${form.firstName}`,
      `Last Name: ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
    ].join('%0A');
    window.location.href = `mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Volunteer%20Application%20%E2%80%94%20Lead%20By%20Example&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#4B306A]/95 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-xl font-bold mb-4">Thank you for wanting to volunteer! We&apos;ll be in touch soon.</h3>
            <button type="button" onClick={onClose} className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-bold">Volunteer With Us</h3>
              <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><input type="text" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />{errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}</div>
              <div><input type="text" placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />{errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}</div>
              <div><input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />{errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}</div>
              <div><input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />{errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
              <button type="submit" className="w-full py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all mt-2">Submit</button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Archive() {
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading level={2} className="text-white mb-6" gradient>
            Our Impact Archive
          </Heading>
          <Text size="lg" className="text-white/80 max-w-3xl mx-auto">
            Explore our past initiatives and see the tangible difference we&apos;ve made in our community through dedicated fundraising and outreach efforts.
          </Text>
        </motion.div>

        {/* Summary Stats (Youth Impacted + Events only — no Total Funds Raised) */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <GlassCard className="p-6 text-center" variant="dark">
              <Users className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">125+</div>
              <Text size="sm" className="text-white/70">Youth Impacted</Text>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <GlassCard className="p-6 text-center" variant="dark">
              <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">28+</div>
              <Text size="sm" className="text-white/70">Successful Events</Text>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Archive Cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {archiveData.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <GlassCard className="p-6 h-full" variant="default">
                <div className={`h-2 w-full bg-gradient-to-r ${event.color} rounded-full mb-6`} />

                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent-400" />
                  <Text size="sm" className="text-white/70">{event.date}</Text>
                </div>

                <Heading level={4} className="text-white mb-4">{event.title}</Heading>

                <Text size="sm" className="text-white/80 mb-6">{event.description}</Text>

                {/* Youth Served */}
                <div className="mb-6">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-primary-400">125+</div>
                    <Text size="sm" className="text-white/60">Youth Served</Text>
                  </div>
                </div>

                {/* Impact Statement */}
                <div className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
                  <Text size="sm" className="text-white/90 font-medium">
                    Impact: {event.impact}
                  </Text>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 max-w-2xl mx-auto" variant="dark">
            <Heading level={3} className="text-white mb-4">
              Be Part of Our Next Success Story
            </Heading>
            <Text className="text-white/80 mb-6">
              Join us in creating positive change and making a lasting impact in our community. Every contribution matters.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new Event('open-cookout-donation-modal'))}
              >
                Help Make It Happen
              </motion.button>
              <motion.button
                type="button"
                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVolunteerModal(true)}
              >
                Volunteer With Us
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <AnimatePresence>
        {showVolunteerModal && <VolunteerModal onClose={() => setShowVolunteerModal(false)} />}
      </AnimatePresence>
    </section>
  )
}
