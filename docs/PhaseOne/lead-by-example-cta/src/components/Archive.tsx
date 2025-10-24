import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, TrendingUp, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import { useInView } from '@/hooks/useInView';

interface ArchivedFundraiser {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  date: string;
  location: string;
  impact: string;
  status: 'completed' | 'exceeded';
}

const archivedFundraisers: ArchivedFundraiser[] = [
  {
    id: 1,
    title: 'Summer Youth Employment Program 2024',
    description:
      'Provided job training and employment opportunities for 50 at-risk youth during summer break.',
    goal: 15000,
    raised: 17500,
    date: 'July 2024',
    location: 'Providence, RI',
    impact: '50 youth employed, 85% secured permanent positions',
    status: 'exceeded',
  },
  {
    id: 2,
    title: 'Back to School Supply Drive 2024',
    description:
      'Equipped 200 students with essential school supplies and backpacks for the new academic year.',
    goal: 8000,
    raised: 8000,
    date: 'August 2024',
    location: 'Lincoln Woods, RI',
    impact: '200 students supported, 100% participation rate',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Winter Mentorship Kickoff 2023',
    description:
      'Launched winter mentorship program connecting 75 youth with community leaders and professionals.',
    goal: 12000,
    raised: 14200,
    date: 'December 2023',
    location: 'Community Center, Providence',
    impact: '75 mentor matches, 90% still active',
    status: 'exceeded',
  },
];

export default function Archive() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-900/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-gold-500" />
            <span className="text-sm font-medium text-gold-500">
              Our Achievements
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-gradient-gold">Milestone</span> Moments
          </h2>
          <p className="text-xl text-neutral-50/70 max-w-3xl mx-auto">
            Every fundraiser is a step forward. Explore our past campaigns and the
            lasting impact they've made in our community.
          </p>
        </motion.div>

        {/* Archive Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archivedFundraisers.map((fundraiser, index) => (
            <motion.div
              key={fundraiser.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
            >
              <div className="glass-card-hover p-6 h-full flex flex-col relative overflow-hidden group">
                {/* Status badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    fundraiser.status === 'exceeded'
                      ? 'bg-gold-500 text-neutral-900'
                      : 'bg-verdean-500 text-white'
                  }`}
                >
                  {fundraiser.status === 'exceeded'
                    ? 'Goal Exceeded!'
                    : 'Completed'}
                </div>

                {/* Achievement icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
                >
                  <Trophy className="w-8 h-8 text-neutral-900" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold-500 transition-colors">
                  {fundraiser.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-50/70 mb-4 flex-grow">
                  {fundraiser.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-50/60">
                    <Calendar className="w-4 h-4 text-verdean-500" />
                    {fundraiser.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-50/60">
                    <MapPin className="w-4 h-4 text-verdean-500" />
                    {fundraiser.location}
                  </div>
                </div>

                {/* Funding stats */}
                <div className="glass-card p-4 rounded-xl mb-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gradient-gold">
                      {formatCurrency(fundraiser.raised)}
                    </span>
                    <span className="text-sm text-neutral-50/60">
                      of {formatCurrency(fundraiser.goal)}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? {
                              width: `${Math.min(
                                (fundraiser.raised / fundraiser.goal) * 100,
                                100
                              )}%`,
                            }
                          : {}
                      }
                      transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                      className="h-full bg-gradient-to-r from-verdean-500 to-gold-500"
                    />
                  </div>
                </div>

                {/* Impact */}
                <div className="flex items-start gap-2 bg-verdean-500/10 border border-verdean-500/30 rounded-xl p-3">
                  <CheckCircle className="w-5 h-5 text-verdean-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold text-verdean-400 mb-1">
                      Impact
                    </div>
                    <div className="text-neutral-50/70">{fundraiser.impact}</div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall impact summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-card p-8 md:p-12 text-center"
        >
          <TrendingUp className="w-16 h-16 mx-auto mb-6 text-gold-500" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">Combined Impact</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold text-gradient-gold mb-2">
                {formatCurrency(
                  archivedFundraisers.reduce((sum, f) => sum + f.raised, 0)
                )}
              </div>
              <div className="text-neutral-50/60">Total Funds Raised</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-verdean mb-2">
                325+
              </div>
              <div className="text-neutral-50/60">Lives Impacted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-royal mb-2">
                100%
              </div>
              <div className="text-neutral-50/60">Goals Met or Exceeded</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
