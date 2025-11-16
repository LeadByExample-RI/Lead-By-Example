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
      { label: 'Critical Age Range', value: '14-18' },
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  React.useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setSelectedStage((prev) => (prev === 5 ? 1 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const currentStage = journeyStages.find((s) => s.id === selectedStage) || journeyStages[2];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-20">
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

          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            {isAutoPlaying ? '⏸️ Pause Journey' : '▶️ Watch Journey Unfold'}
          </button>
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
                      ? 'border-white bg-white/20 shadow-lg shadow-white/50'
                      : 'border-white/30 bg-white/5 hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: selectedStage === stage.id ? stage.color + '40' : undefined,
                  }}
                  animate={{
                    scale: selectedStage === stage.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    repeat: selectedStage === stage.id ? Infinity : 0,
                    duration: 2,
                  }}
                >
                  <div style={{ color: selectedStage === stage.id ? stage.color : 'white' }}>
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
            className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-12"
            style={{
              background: `linear-gradient(135deg, ${currentStage.gradientFrom}20, ${currentStage.gradientTo}20)`,
            }}
          >
            <div className="grid gap-12 md:grid-cols-2">
              {/* Left Column - Description */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: currentStage.color + '40' }}
                    >
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
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <span className="mt-1 text-xl">{symbol.split(' ')[0]}</span>
                          <span>{symbol.substring(symbol.indexOf(' ') + 1)}</span>
                        </motion.li>
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
                          <div
                            className="mb-1 text-3xl font-bold"
                            style={{ color: currentStage.color }}
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
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3 text-gray-200"
                        >
                          <ChevronRight
                            className="mt-0.5 h-5 w-5 flex-shrink-0"
                            style={{ color: currentStage.color }}
                          />
                          <span>{intervention}</span>
                        </motion.li>
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
            <button className="transform rounded-full bg-gradient-to-r from-verdean-500 to-green-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-verdean-500/50">
              Become a Mentor
            </button>
            <button className="transform rounded-full bg-gradient-to-r from-gold-500 to-yellow-600 px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50">
              Support Our Mission
            </button>
            <button className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
