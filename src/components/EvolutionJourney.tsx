import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassCard, Button } from '@/components/ui';
import { AlertTriangle, ChevronRight, Heart, Lightbulb } from 'lucide-react';
import React, { useState } from 'react';
import { journeyStages } from '@/data/siteContent';

const AtmosphericLightsLoader = dynamic(
  () => import('@/components/ui/AtmosphericLights'),
  {
    ssr: false,
    loading: () => <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true" />,
  }
);

interface JourneyFormModalProps {
  heading: string;
  emailSubject: string;
  onClose: () => void;
}

function JourneyFormModal({ heading, emailSubject, onClose }: JourneyFormModalProps) {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const body = `Name: ${form.firstName} ${form.lastName}%0APhone: ${form.phone}%0AEmail: ${form.email}`;
    window.location.href = `mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${body}`;
    setSubmitted(true);
  };

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
        className="w-full max-w-md rounded-2xl border border-white/20 bg-[#080b12]/90 backdrop-blur-xl p-8 z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
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

        {submitted ? (
          <div className="text-center py-6">
            <p className="text-white text-lg mb-6">Thank you! We&apos;ll be in touch soon.</p>
            <Button type="button" onClick={onClose} variant="gold" className="px-6 py-2 rounded-lg">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-gold-500 rounded-lg px-4 py-3 outline-none"
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-gold-500 rounded-lg px-4 py-3 outline-none"
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-gold-500 rounded-lg px-4 py-3 outline-none"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-gold-500 rounded-lg px-4 py-3 outline-none"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <Button type="submit" variant="gold" className="w-fit py-3 rounded-lg">Submit</Button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function EvolutionJourney() {
  const [selectedStage, setSelectedStage] = useState<number>(3);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const stageAccentClasses: Record<number, string> = {
    1: 'text-red-600',
    2: 'text-orange-500',
    3: 'text-green-400',
    4: 'text-purple-500',
    5: 'text-gold-500',
  };

  const stageBadgeClasses: Record<number, string> = {
    1: 'bg-red-600/25',
    2: 'bg-orange-500/25',
    3: 'bg-verdean-500/25',
    4: 'bg-purple-500/25',
    5: 'bg-gold-500/25',
  };

  const stageGradientClasses: Record<number, string> = {
    1: 'bg-gradient-to-br from-red-900/20 to-red-500/20',
    2: 'bg-gradient-to-br from-orange-900/20 to-orange-500/20',
    3: 'bg-gradient-to-br from-verdean-900/20 to-verdean-500/20',
    4: 'bg-gradient-to-br from-royal-purple-dark/20 to-purple-500/20',
    5: 'bg-gradient-to-br from-yellow-900/20 to-gold-500/20',
  };

  const currentStage = journeyStages.find((s) => s.id === selectedStage) || journeyStages[2];

  return (
    <section className="relative overflow-hidden bg-[#4B306A] px-4 py-20">
      {/* Ambient atmospheric lights */}
      <AtmosphericLightsLoader />
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-verdean-500 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            The Journey of Transformation
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
            From at-risk to achievement: How Lead By Example interrupts the school-to-prison
            pipeline
          </p>
        </motion.div>

        {/* Evolution Timeline */}
        <div className="mb-16">
          <div className="relative flex items-center justify-between">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-white/10" />
            <motion.div
              className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-red-500 via-verdean-500 to-gold-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(selectedStage - 1) * 25}%` }}
              transition={{ duration: 0.5 }}
            />

            {/* Stage Markers */}
            {journeyStages.map((stage) => (
              <motion.button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`group relative z-10 flex flex-col items-center ${
                  selectedStage === stage.id ? 'scale-110' : 'scale-100'
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon Circle */}
                <motion.div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-300 md:h-20 md:w-20 ${
                    selectedStage === stage.id
                      ? `border-white shadow-lg shadow-white/50 ${stageBadgeClasses[stage.id]}`
                      : 'border-white/30 bg-white/5 hover:bg-white/10'
                  }`}
                  animate={{
                    scale: selectedStage === stage.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    repeat: selectedStage === stage.id ? Infinity : 0,
                    duration: 2,
                  }}
                >
                  <div className={selectedStage === stage.id ? stageAccentClasses[stage.id] : 'text-white'}>
                    {stage.icon}
                  </div>
                </motion.div>

                {/* Stage Number */}
                <span
                  className={`mt-3 text-sm font-bold ${
                    selectedStage === stage.id ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  Stage {stage.id}
                </span>

                {/* Stage Title (hidden on mobile) */}
                <span
                  className={`mt-1 hidden max-w-[100px] text-center text-xs md:block ${
                    selectedStage === stage.id ? 'font-semibold text-white' : 'text-gray-300'
                  }`}
                >
                  {stage.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className={`rounded-3xl md:p-12 p-8 ${stageGradientClasses[currentStage.id]} ${currentStage.id === 1 || currentStage.id === 2 ? 'translate-y-4 md:translate-y-4' : ''}`}>
              <div className="grid gap-12 md:grid-cols-2">
                {/* Left Column - Description */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="mb-6 flex items-center gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stageBadgeClasses[currentStage.id]}`}>
                        {currentStage.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{currentStage.title}</h3>
                        <p className="text-lg text-gray-300">{currentStage.subtitle}</p>
                      </div>
                    </div>

                    <p className="mb-8 text-lg leading-relaxed text-gray-200">
                      {currentStage.description}
                    </p>

                    {/* Symbols */}
                    <div className="mb-8">
                      <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
                        <Lightbulb className="h-5 w-5 text-gold-500" />
                        Visual Symbols
                      </h4>
                      <ul className="space-y-2">
                        {currentStage.symbols.map((symbol, index) => (
                          <li key={index}>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              className="flex items-start gap-2 text-gray-300"
                            >
                              <span className="mt-1 text-xl">{symbol.split(' ')[0]}</span>
                              <span>{symbol.substring(symbol.indexOf(' ') + 1)}</span>
                            </motion.div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats */}
                    {currentStage.stats && currentStage.stats.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {currentStage.stats.map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                          >
                            <div className={`mb-1 text-3xl font-bold ${stageAccentClasses[currentStage.id]}`}>
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-300">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right Column - Interventions */}
                <div>
                  {currentStage.interventions.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    >
                      <h4 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                        <Heart className="h-6 w-6 text-verdean-500" />
                        Lead By Example Interventions
                      </h4>
                      <ul className="space-y-4">
                        {currentStage.interventions.map((intervention, index) => (
                          <li key={index}>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="flex items-start gap-3 text-gray-200"
                            >
                              <ChevronRight
                                className={`mt-0.5 h-5 w-5 flex-shrink-0 ${stageAccentClasses[currentStage.id]}`}
                              />
                              <span>{intervention}</span>
                            </motion.div>
                          </li>
                        ))}
                      </ul>

                      {selectedStage === 3 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="mt-8 border-t border-white/10 pt-6"
                        >
                          <p className="mb-4 italic text-gray-300">
                            &quot;I just put; the mission is to interrupt the school to prison
                            pipeline, using men and women with lived experience, making a difference
                            in our community.&quot;
                          </p>
                          <p className="text-sm text-gray-400">- Robert McKinney Sr., Founder</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex h-full flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 text-center"
                    >
                      <AlertTriangle className="mb-4 h-16 w-16 text-red-400" />
                      <h4 className="mb-3 text-xl font-bold text-white">Without Intervention</h4>
                      <p className="text-gray-300">
                        This is where the cycle continues without support. Lead By Example steps in at
                        Stage 3 to break this pattern.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="mb-6 text-2xl font-bold text-white md:text-3xl">
            Be Part of the Transformation
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              type="button"
              onClick={() => setShowMentorModal(true)}
              variant="ghost"
              className="transform rounded-full bg-gradient-to-r from-verdean-500 to-green-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-verdean-500/50"
            >
              Become a Mentor
            </Button>
            <Button
              type="button"
              onClick={() => setShowVolunteerModal(true)}
              variant="gold"
              className="transform rounded-full bg-gradient-to-r from-gold-500 to-yellow-600 px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50"
            >
              Volunteer
            </Button>
            <Button
              type="button"
              onClick={() => (window.location.href = 'mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website')}
              variant="outline"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Rob or Ron
            </Button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMentorModal && (
          <JourneyFormModal
            heading="Become a Mentor"
            emailSubject="Become a Mentor - Lead By Example"
            onClose={() => setShowMentorModal(false)}
          />
        )}
        {showVolunteerModal && (
          <JourneyFormModal
            heading="Volunteer"
            emailSubject="Volunteer - Lead By Example"
            onClose={() => setShowVolunteerModal(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
