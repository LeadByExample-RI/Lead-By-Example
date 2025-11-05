import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  HelpingHand, 
  BookOpen, 
  Award, 
  TrendingUp,
  Heart,
  Users,
  Lightbulb,
  Target,
  ChevronRight
} from 'lucide-react';

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
    description: 'Urban youth facing negative influences, limited opportunities, and the school-to-prison pipeline risk. Without intervention, many face incarceration, dropout, or worse.',
    icon: <AlertTriangle className="w-12 h-12" />,
    color: '#DC2626',
    gradientFrom: '#7F1D1D',
    gradientTo: '#DC2626',
    symbols: ['🚫 Broken chains representing trapped potential', '🌆 Urban landscape with barriers', '📉 Declining path'],
    stats: [
      { label: 'Youth at Risk in RI', value: '15,000+' },
      { label: 'School Dropout Rate', value: '18%' },
      { label: 'Without Mentorship', value: '3x Risk' }
    ],
    interventions: []
  },
  {
    id: 2,
    title: 'Struggle & Crossroads',
    subtitle: 'Critical Decision Point',
    description: 'A moment of choice. Negative influences vs. positive pathways. This is where intervention makes all the difference between falling through the cracks or finding support.',
    icon: <Target className="w-12 h-12" />,
    color: '#EA580C',
    gradientFrom: '#9A3412',
    gradientTo: '#EA580C',
    symbols: ['⚖️ Scale representing choices', '🔀 Diverging paths', '💭 Questions and uncertainty'],
    stats: [
      { label: 'Critical Age Range', value: '14-18' },
      { label: 'First Contact with Justice', value: '76% teens' },
      { label: 'Need Positive Role Model', value: '89%' }
    ],
    interventions: []
  },
  {
    id: 3,
    title: 'Lead By Example Intervention',
    subtitle: 'Hope Through Mentorship',
    description: 'Men and women with lived experience step in as mentors. Trauma-informed support, educational resources, and community connection break the cycle.',
    icon: <HelpingHand className="w-12 h-12" />,
    color: '#01514C',
    gradientFrom: '#01514C',
    gradientTo: '#059669',
    symbols: [
      '🤝 Guiding hands - mentorship',
      '🌅 Rising sun - hope & new beginnings',
      '🚪 Open doors - opportunities',
      '💚 Hearts - trauma-informed care',
      '📚 Books - education as liberation'
    ],
    stats: [
      { label: 'Active Mentors', value: '85+' },
      { label: 'Youth Served Annually', value: '500+' },
      { label: 'Success Rate', value: '87%' }
    ],
    interventions: [
      'One-on-one mentorship from those with lived experience',
      'Academic support and tutoring',
      'Life skills workshops',
      'Trauma-informed counseling',
      'Community events (cookouts, sports)',
      'Career exploration programs',
      'Restorative justice circles'
    ]
  },
  {
    id: 4,
    title: 'Growth & Learning',
    subtitle: 'Building Skills & Confidence',
    description: 'Through consistent support and positive reinforcement, youth develop resilience, academic skills, and life competencies. Trust is built, trauma is addressed.',
    icon: <BookOpen className="w-12 h-12" />,
    color: '#4B306A',
    gradientFrom: '#4B306A',
    gradientTo: '#7C3AED',
    symbols: [
      '🌱 Growing plant - resilience',
      '📖 Open books - learning',
      '🎨 Art supplies - creative expression',
      '🏀 Sports equipment - healthy outlets',
      '🔄 Circular shapes - restorative practices'
    ],
    stats: [
      { label: 'Improved Grades', value: '82%' },
      { label: 'Increased Attendance', value: '91%' },
      { label: 'Reduced Disciplinary Issues', value: '73%' }
    ],
    interventions: [
      'Weekly mentorship check-ins',
      'Group workshops and activities',
      'Academic tutoring',
      'Social-emotional learning',
      'Leadership development'
    ]
  },
  {
    id: 5,
    title: 'Achievement & Leadership',
    subtitle: 'Breaking the Pipeline',
    description: 'Youth graduate, pursue higher education or careers, and become community leaders themselves. The cycle is broken, and a new generation of mentors emerges.',
    icon: <Award className="w-12 h-12" />,
    color: '#FFD700',
    gradientFrom: '#CA8A04',
    gradientTo: '#FFD700',
    symbols: [
      '🎓 Graduation cap - education achievement',
      '🏆 Trophy - success',
      '🌟 Stars - reaching potential',
      '🌉 Bridges - connecting to opportunities',
      '👥 Community circle - giving back'
    ],
    stats: [
      { label: 'High School Graduation', value: '87%' },
      { label: 'College/Career Bound', value: '74%' },
      { label: 'Become Mentors Themselves', value: '45%' }
    ],
    interventions: [
      'College application support',
      'Job placement assistance',
      'Leadership training',
      'Public speaking opportunities',
      'Mentor-to-mentor pipeline'
    ]
  }
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

  const currentStage = journeyStages.find(s => s.id === selectedStage) || journeyStages[2];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-verdean-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The Journey of Transformation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            From at-risk to achievement: How Lead By Example interrupts the school-to-prison pipeline
          </p>
          
          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            {isAutoPlaying ? '⏸️ Pause Journey' : '▶️ Watch Journey Unfold'}
          </button>
        </motion.div>

        {/* Evolution Timeline */}
        <div className="mb-16">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-red-500 via-verdean-500 to-gold-500 -translate-y-1/2"
              initial={{ width: '0%' }}
              animate={{ width: `${(selectedStage - 1) * 25}%` }}
              transition={{ duration: 0.5 }}
            />

            {/* Stage Markers */}
            {journeyStages.map((stage, index) => (
              <motion.button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`relative z-10 flex flex-col items-center group ${
                  selectedStage === stage.id ? 'scale-110' : 'scale-100'
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon Circle */}
                <motion.div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                    backdrop-blur-md border-2 transition-all duration-300
                    ${selectedStage === stage.id
                      ? 'bg-white/20 border-white shadow-lg shadow-white/50'
                      : 'bg-white/5 border-white/30 hover:bg-white/10'
                    }`}
                  style={{
                    backgroundColor: selectedStage === stage.id ? stage.color + '40' : undefined
                  }}
                  animate={{
                    scale: selectedStage === stage.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    repeat: selectedStage === stage.id ? Infinity : 0,
                    duration: 2
                  }}
                >
                  <div style={{ color: selectedStage === stage.id ? stage.color : 'white' }}>
                    {stage.icon}
                  </div>
                </motion.div>

                {/* Stage Number */}
                <span className={`mt-3 text-sm font-bold ${
                  selectedStage === stage.id ? 'text-white' : 'text-gray-400'
                }`}>
                  Stage {stage.id}
                </span>

                {/* Stage Title (hidden on mobile) */}
                <span className={`mt-1 text-xs text-center max-w-[100px] hidden md:block ${
                  selectedStage === stage.id ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
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
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${currentStage.gradientFrom}20, ${currentStage.gradientTo}20)`
            }}
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Description */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: currentStage.color + '40' }}
                    >
                      {currentStage.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">
                        {currentStage.title}
                      </h3>
                      <p className="text-gray-300 text-lg">
                        {currentStage.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-200 text-lg leading-relaxed mb-8">
                    {currentStage.description}
                  </p>

                  {/* Symbols */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-gold-500" />
                      Visual Symbols
                    </h4>
                    <ul className="space-y-2">
                      {currentStage.symbols.map((symbol, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-xl mt-1">{symbol.split(' ')[0]}</span>
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
                          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                        >
                          <div
                            className="text-3xl font-bold mb-1"
                            style={{ color: currentStage.color }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400">
                            {stat.label}
                          </div>
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
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full"
                  >
                    <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-verdean-500" />
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
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                        className="mt-8 pt-6 border-t border-white/10"
                      >
                        <p className="text-gray-300 italic mb-4">
                          "I just put; the mission is to interrupt the school to prison pipeline, using men and women with lived experience, making a difference in our community."
                        </p>
                        <p className="text-sm text-gray-400">
                          - Robert McKinney Sr., Founder
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20 h-full flex flex-col justify-center items-center text-center"
                  >
                    <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
                    <h4 className="text-white font-bold text-xl mb-3">
                      Without Intervention
                    </h4>
                    <p className="text-gray-300">
                      This is where the cycle continues without support. Lead By Example steps in at Stage 3 to break this pattern.
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Be Part of the Transformation
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-verdean-500 to-green-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-verdean-500/50 transition-all transform hover:scale-105">
              Become a Mentor
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-gold-500 to-yellow-600 text-black rounded-full font-semibold hover:shadow-lg hover:shadow-gold-500/50 transition-all transform hover:scale-105">
              Support Our Mission
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
