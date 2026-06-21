import { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Send, CheckCircle, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

type InquiryType = 'general' | 'volunteer' | 'mentor' | 'media' | 'other';

const INQUIRY_TYPES: { value: InquiryType; label: string; description: string }[] = [
  { value: 'general', label: 'General Inquiry', description: 'Questions about our programs or organization' },
  { value: 'volunteer', label: 'Volunteer', description: "I'd like to volunteer my time" },
  { value: 'mentor', label: 'Become a Mentor', description: 'Apply to mentor at-risk youth' },
  { value: 'media', label: 'Media / Press', description: 'Press inquiries and partnership opportunities' },
  { value: 'other', label: 'Other', description: "Something that doesn't fit above" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: 'general' as InquiryType });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const r = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await r.json();
    if (r.ok) {
      setSuccess(true);
    } else {
      setError(data.error || 'Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Contact Us — Lead By Example</title>
        <meta name="description" content="Get in touch with Lead By Example. Volunteer, apply to mentor, or ask us anything about our mission to break the school-to-prison pipeline." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-verdean-900/30 to-royal-900/30">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20 pt-24 sm:pt-28 sm:px-6">
          {/* Header */}
          <motion.div className="mb-14 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Get <span className="text-gold">Involved</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Whether you want to volunteer, mentor, or simply learn more — we'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Contact info */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div>
                <h2 className="mb-4 font-heading text-xl font-semibold text-white">Contact Info</h2>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@leadbyexample.org', href: 'mailto:contact@leadbyexample.org' },
                    { icon: MapPin, label: 'Location', value: 'Rhode Island, USA', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/40">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white hover:text-gold transition">{value}</a>
                        ) : (
                          <p className="text-sm text-white">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteer highlight */}
              <div className="rounded-xl border border-verdean-500/30 bg-verdean-500/10 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Heart size={18} className="text-verdean-300" />
                  <h3 className="font-semibold text-white">Volunteer With Us</h3>
                </div>
                <p className="text-sm text-white/60">
                  We're always looking for passionate people to help with events, tutoring, mentorship, and community outreach.
                  Select "Volunteer" in the form to get started.
                </p>
              </div>

              {/* Mentor highlight */}
              <div className="rounded-xl border border-royal-500/30 bg-royal-500/10 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Phone size={18} className="text-royal-300" />
                  <h3 className="font-semibold text-white">Become a Mentor</h3>
                </div>
                <p className="text-sm text-white/60">
                  Share your experience and expertise with young people who need guidance. Our mentors make a lasting difference — one conversation at a time.
                </p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              {success ? (
                <motion.div
                  className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/5 p-10 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={48} className="mb-4 text-green-400" />
                  <h2 className="font-heading text-2xl font-bold text-white">Message Sent!</h2>
                  <p className="mt-2 text-white/60">
                    Thank you for reaching out. We'll respond within 1–2 business days.
                    A copy of your message has been sent to your email.
                  </p>
                  <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', subject: '', message: '', type: 'general' }); }}
                    className="mt-6 rounded-full border border-white/20 px-6 py-2 text-sm text-white/60 hover:text-white transition">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-5">
                  <h2 className="font-heading text-xl font-semibold text-white">Send a Message</h2>

                  {/* Inquiry type */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/50">I'm reaching out about…</label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {INQUIRY_TYPES.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm({ ...form, type: value })}
                          className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                            form.type === value
                              ? 'border-gold/50 bg-gold/10 text-gold'
                              : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/50">Full Name *</label>
                      <input required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
                        placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-white/50">Email Address *</label>
                      <input required type="email" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
                        placeholder="jane@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50">Subject *</label>
                    <input required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
                      placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50">Message *</label>
                    <textarea required rows={6} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none resize-none"
                      placeholder="Tell us more about what you're looking for…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{error}</div>
                  )}

                  <button type="submit" disabled={submitting}
                    className="flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-semibold text-gray-900 transition hover:bg-gold/80 disabled:opacity-40">
                    {submitting ? 'Sending…' : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
