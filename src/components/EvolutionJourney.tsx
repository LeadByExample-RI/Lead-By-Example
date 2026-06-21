import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Award,
  BookOpen,
  ChevronRight,
  Heart,
  HelpingHand,
  Lightbulb,
  Target,
} from 'lucide-react';
import React, { useState } from 'react';

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
        className="w-full max-w-md rounded-2xl border border-white/20 bg-[#4B306A]/95 backdrop-blur-xl p-8 z-[101]"
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
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-600 transition-colors"
            >
              Close
            </button>
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
            <button
              type="submit"
              className="w-full bg-gold-500 text-black font-semibold py-3 rounded-lg hover:bg-gold-600 transition-colors"
            >
              Submit
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

interface JourneyStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  symbols: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  interventions: string[];
}

const journeyStages: JourneyStage[] = [
  {
    id: 1,
    title: 'At-Risk Youth',
    subtitle: 'Facing Systemic Challenges',
    description:
      'Urban youth facing negative influences, limited opportunities, and the school-to-prison pipeline risk. Without intervention, many face incarceration, dropout, or worse.',
    icon: <AlertTriangle className="h-12 w-12" />,
    color: '#DC2626',
    gradientFrom: '#7F1D1D',
    gradientTo: '#DC2626',
    symbols: [
      '🚫 Broken chains representing trapped potential',
      '🌆 Urban landscape with barriers',
      '📉 Declining path',
    ],
    stats: [
      { label: 'Youth at Risk in RI', value: '15,000+' },
      { label: 'School Dropout Rate', value: '18%' },
      { label: 'Without Mentorship', value: '3x Risk' },
    ],
    interventions: [],
  },
  {
    id: 2,
    title: 'Struggle & Crossroads',
    subtitle: 'Critical Decision Point',
    description:
      'A moment of choice. Negative influences vs. positive pathways. This is where intervention makes all the difference between falling through the cracks or finding support.',
    icon: <Target className="h-12 w-12" />,
    color: '#EA580C',
    gradientFrom: '#9A3412',
    gradientTo: '#EA580C',
    symbols: [
      '⚖️ Scale representing choices',
      '🔀 Diverging paths',
      '💭 Questions and uncertainty',
    ],
    stats: [
      { label: 'Critical Age Range', value: '11-24' },
      { label: 'First Contact with Justice', value: '76% teens' },
      { label: 'Need Positive Role Model', value: '89%' },
    ],
    interventions: [],
  },
  {
    id: 3,
    title: 'Lead By Example Intervention',
    subtitle: 'Hope Through Mentorship',
    description:
      'Men and women with lived experience step in as mentors. Trauma-informed support, educational resources, and community connection break the cycle.',
    icon: <HelpingHand className="h-12 w-12" />,
    color: '#01514C',
    gradientFrom: '#01514C',
    gradientTo: '#059669',
    symbols: [
      '🤝 Guiding hands - mentorship',
      '🌅 Rising sun - hope & new beginnings',
      '🚪 Open doors - opportunities',
      '💚 Hearts - trauma-informed care',
      '📚 Books - education as liberation',
    ],
    stats: [
      { label: 'Active Mentors', value: '12+' },
      { label: 'Youth Served', value: '50+' },
      { label: 'Success Rate', value: '100%' },
    ],
    interventions: [
      'One-on-one mentorship from those with lived experience',
      'Academic support and tutoring',
      'Life skills workshops',
      'Trauma-informed counseling',
      'Community events (cookouts, sports)',
      'Career exploration programs',
      'Restorative justice circles',
    ],
  },
  {
    id: 4,
    title: 'Growth & Learning',
    subtitle: 'Building Skills & Confidence',
    description:
      'Through consistent support and positive reinforcement, youth develop resilience, academic skills, and life competencies. Trust is built, trauma is addressed.',
    icon: <BookOpen className="h-12 w-12" />,
    color: '#4B306A',
    gradientFrom: '#4B306A',
    gradientTo: '#7C3AED',
    symbols: [
      '🌱 Growing plant - resilience',
      '📖 Open books - learning',
      '🎨 Art supplies - creative expression',
      '🏀 Sports equipment - healthy outlets',
      '🔄 Circular shapes - restorative practices',
    ],
    stats: [
      { label: 'Improved Grades', value: '82%' },
      { label: 'Increased Attendance', value: '91%' },
      { label: 'Reduced Disciplinary Issues', value: '73%' },
    ],
    interventions: [
      'Weekly mentorship check-ins',
      'Group workshops and activities',
      'Academic tutoring',
      'Social-emotional learning',
      'Leadership development',
    ],
  },
  {
    id: 5,
    title: 'Achievement & Leadership',
    subtitle: 'Breaking the Pipeline',
    description:
      'Youth graduate, pursue higher education or careers, and become community leaders themselves. The cycle is broken, and a new generation of mentors emerges.',
    icon: <Award className="h-12 w-12" />,
    color: '#FFD700',
    gradientFrom: '#CA8A04',
    gradientTo: '#FFD700',
    symbols: [
      '🎓 Graduation cap - education achievement',
      '🏆 Trophy - success',
      '🌟 Stars - reaching potential',
      '🌉 Bridges - connecting to opportunities',
      '👥 Community circle - giving back',
    ],
    stats: [
      { label: 'High School Graduation', value: '87%' },
      { label: 'College/Career Bound', value: '74%' },
      { label: 'Become Mentors Themselves', value: '45%' },
    ],
    interventions: [
      'College application support',
      'Job placement assistance',
      'Leadership training',
      'Public speaking opportunities',
      'Mentor-to-mentor pipeline',
    ],
  },
];

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
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-900 px-4 py-20">
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
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            The Journey of Transformation
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-base sm:text-lg md:text-xl text-gray-300">
            From at-risk to achievement: How Lead By Example interrupts the school-to-prison
            pipeline
          </p>

        </motion.div>

        {/* Evolution Timeline */}
        <div className="mb-16">
          <div className="relative flex items-start sm:items-center justify-between gap-1 sm:gap-0">
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
                  className={`flex h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-300 ${
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
                  <div className={`scale-50 sm:scale-75 md:scale-100 ${selectedStage === stage.id ? stageAccentClasses[stage.id] : 'text-white'}`}>
                    {stage.icon}
                  </div>
                </motion.div>

                {/* Stage Number */}
                <span
                  className={`mt-2 text-[10px] sm:text-xs md:text-sm font-bold ${
                    selectedStage === stage.id ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  Stage {stage.id}
                </span>

                {/* Stage Title (hidden on mobile) */}
                <span
                  className={`mt-1 hidden max-w-[100px] text-center text-xs md:block ${
                    selectedStage === stage.id ? 'font-semibold text-white' : 'text-gray-500'
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
              className={`rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 shadow-2xl backdrop-blur-xl md:p-12 ${stageGradientClasses[currentStage.id]}`}
          >
            <div className="grid gap-6 sm:gap-8 md:gap-12 md:grid-cols-2">
              {/* Left Column - Description */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="mb-6 flex items-center gap-3 sm:gap-4">
                    <div
                        className={`flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-2xl ${stageBadgeClasses[currentStage.id]}`}
                    >
                      {currentStage.icon}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{currentStage.title}</h3>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {currentStage.stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                        >
                          <div
                            className={`mb-1 text-2xl sm:text-3xl font-bold ${stageAccentClasses[currentStage.id]}`}
                          >
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
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
                ) : currentStage.id === 2 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex h-full flex-col justify-center rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-8"
                  >
                    <h4 className="mb-4 text-xl font-bold text-white">The Critical Turning Point</h4>
                    <p className="text-gray-300">
                      Stage 2 is where intervention matters most. This is the pivotal moment to
                      present teens with real options — showing them a different path forward and
                      empowering them to make choices that can reshape their future trajectory.
                    </p>
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
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="mb-6 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Be Part of the Transformation
          </h3>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setShowMentorModal(true)}
              className="transform rounded-full bg-gradient-to-r from-verdean-500 to-green-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-verdean-500/50"
            >
              Become a Mentor
            </button>
            <button
              type="button"
              onClick={() => setShowVolunteerModal(true)}
              className="transform rounded-full bg-gradient-to-r from-gold-500 to-yellow-600 px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50"
            >
              Volunteer
            </button>
            <a
              href="mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Rob or Ron
            </a>
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
