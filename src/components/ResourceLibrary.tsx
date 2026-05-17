import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Eye,
  Heart,
  Search,
  ArrowLeft,
  ArrowRight,
  Star,
} from 'lucide-react';
import SaturnCarousel from './ui/SaturnCarousel';
import { Button, GlassCard, MotionGlassCard } from '@/components/ui';
import {
  carouselItems,
  crisisResources,
  resources,
  typeIcons,
  type Resource,
} from '@/data/siteContent';

const AtmosphericLightsLoader = dynamic(
  () => import('@/components/ui/AtmosphericLights'),
  {
    ssr: false,
    loading: () => <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true" />,
  }
);

// ─── Connect with a Mentor Modal ──────────────────────────────────────────────

interface ConnectFormData { firstName: string; lastName: string; reason: string; phone: string; email: string; }
interface ConnectErrors { firstName?: string; lastName?: string; reason?: string; phone?: string; email?: string; }

function ConnectMentorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ConnectFormData>({ firstName: '', lastName: '', reason: '', phone: '', email: '' });
  const [errors, setErrors] = useState<ConnectErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: ConnectErrors = {};
    if (!form.firstName.trim()) e.firstName = 'This field is required';
    if (!form.lastName.trim())  e.lastName  = 'This field is required';
    if (!form.reason.trim())    e.reason    = 'This field is required';
    if (!form.phone.trim())     e.phone     = 'This field is required';
    if (!form.email.trim())     e.email     = 'This field is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const body = [
      'This person is looking to connect with a mentor.',
      `First Name: ${form.firstName}`,
      `Last Name: ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Reason: ${form.reason}`,
    ].join('%0A');
    window.location.href = `mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Connect%20with%20a%20Mentor%20Request%20%E2%80%94%20Lead%20By%20Example&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#080b12]/90 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-xl font-bold mb-4">Your request has been submitted! We&apos;ll connect you with a mentor soon.</h3>
            <Button type="button" onClick={onClose} variant="gold" className="px-8 py-3">Close</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-bold">Connect with a Mentor</h3>
              <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><input type="text" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />{errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}</div>
              <div><input type="text" placeholder="Last Name"  value={form.lastName}  onChange={(e) => setForm({ ...form, lastName:  e.target.value })} className={inputClass} />{errors.lastName  && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}</div>
              <div><textarea placeholder="Tell us why you're looking for a mentor..." rows={4} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className={inputClass} />{errors.reason && <p className="text-red-400 text-sm mt-1">{errors.reason}</p>}</div>
              <div><input type="tel"   placeholder="Phone Number"  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />{errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}</div>
              <div><input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />{errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
              <Button type="submit" variant="gold" className="w-fit py-3 px-6 mt-2">Submit</Button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Crisis Resources Modal ───────────────────────────────────────────────────

function CrisisResourcesModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold">Crisis Resources</h3>
          <Button type="button" onClick={onClose} variant="ghost" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">✕</Button>
        </div>
        <div className="space-y-4">
          {crisisResources.map((r, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{r.emoji}</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">{r.name}</h4>
                  {r.tel ? (
                    <a href={`tel:${r.tel}`} className="text-[#FFD700] hover:opacity-80 text-sm font-medium transition-colors">{r.contact}</a>
                  ) : (
                    <p className="text-[#FFD700] text-sm font-medium">{r.contact}</p>
                  )}
                  <p className="text-white/60 text-xs mt-1">{r.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResourceLibrary() {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredCarouselItems = carouselItems.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 ||
      activeFilters.some(filter => item.category.toLowerCase().includes(filter.toLowerCase()));
    return matchesSearch && matchesFilters;
  });

  const activeResourceCount = filteredCarouselItems.length;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resource Library
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-6">
            Trauma-informed resources designed to support your journey. All content created with care, understanding, and respect for your experiences.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-gray-100 rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
            Many resources are trauma-informed and culturally responsive
          </div>
        </motion.div>

        {/* 3D Saturn Carousel */}
        <SaturnCarousel items={filteredCarouselItems} />

        {/* Command Platform */}
        <MotionGlassCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          variant="dark"
          className="mt-12 rounded-3xl p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Resource Command Platform</h3>
              <p className="text-sm text-gray-400">Search, filter, and navigate our ecosystem</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                <ArrowLeft className="w-3 h-3" />
                <span>Drag to explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#4B306A]/40 border border-[#4B306A]/60 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                <span className="text-sm font-medium text-gray-200">
                  <span className="text-[#FFD700] font-bold">{activeResourceCount}</span> resources indexed
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources by name, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#01514C]/30 border border-[#01514C]/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-all"
            />
          </div>

          {/* Filter toggles */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { id: 'trauma-support', label: 'Trauma Support' },
              { id: 'life-skills',    label: 'Life Skills'    },
              { id: 'academic',       label: 'Academic'       },
              { id: 'legal',          label: 'Legal Guidance' },
            ].map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => toggleFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                      : 'bg-[#080b12]/80 text-gray-300 border-white/20 hover:border-[#FFD700]/50 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilters([])}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-all"
              >
                Clear all
              </button>
            )}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowConnectModal(true)}
              className="px-6 py-3 bg-[#4B306A] text-white rounded-full font-semibold hover:bg-[#4B306A]/80 transition-all border border-[#4B306A]/50 hover:border-[#FFD700]/50"
            >
              Connect with a Mentor
            </button>
            <button
              type="button"
              onClick={() => setShowCrisisModal(true)}
              className="px-6 py-3 bg-[#01514C] text-white rounded-full font-semibold hover:bg-[#01514C]/80 transition-all border border-[#01514C]/50 hover:border-[#FFD700]/50"
            >
              Crisis Resources
            </button>
          </div>
        </MotionGlassCard>
      </div>

      <AnimatePresence>
        {showConnectModal && <ConnectMentorModal onClose={() => setShowConnectModal(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCrisisModal && <CrisisResourcesModal onClose={() => setShowCrisisModal(false)} />}
      </AnimatePresence>
      <AtmosphericLightsLoader theme="green" />
    </section>
  );
}

// ─── ResourceCard (available for future list-view use) ────────────────────────

function ResourceCard({ resource, index, featured = false }: { resource: Resource; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all group cursor-pointer ${featured ? 'ring-2 ring-[#FFD700]' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#C4965A] flex items-center justify-center text-black">
            {typeIcons[resource.type]}
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide">{resource.type}</div>
            {resource.traumaInformed && (
              <div className="flex items-center gap-1 text-xs text-[#FFD700] font-medium">
                <Heart className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                Trauma-Informed
              </div>
            )}
          </div>
        </div>
        {featured && <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />}
      </div>

      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">{resource.title}</h4>
      <p className="text-sm text-gray-300 mb-4 line-clamp-3">{resource.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full">{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-300 mb-4 pb-4 border-b border-white/20">
        {resource.duration && (
          <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#FFD700]" />{resource.duration}</div>
        )}
        <div className="flex items-center gap-1"><Eye className="w-4 h-4 text-[#FFD700]" />{resource.views.toLocaleString()}</div>
        <div className="flex items-center gap-1"><Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />{resource.rating}</div>
      </div>

      <div>
        <span className="text-xs text-gray-300">Age Group:</span>
        <span className="ml-2 text-sm font-medium text-gray-200">{resource.ageGroup}</span>
      </div>
    </motion.div>
  );
}

// Keep ResourceCard + resources reachable so tree-shaking doesn't remove them if a list view is added
export { ResourceCard, resources };
