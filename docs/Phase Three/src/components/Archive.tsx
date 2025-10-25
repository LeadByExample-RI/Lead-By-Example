'use client';

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { formatCurrency, calculatePercentage, formatDate } from '@/utils/helpers';
import { ArchivedFundraiser } from '@/types';

const archivedFundraisers: ArchivedFundraiser[] = [
  {
    id: '1',
    title: 'Back to School Bash 2024',
    description: 'Provided school supplies and backpacks to 200+ students, along with free haircuts and health screenings.',
    goal: 8000,
    raised: 9500,
    date: '2024-08-15',
    location: 'Lincoln Woods State Park',
    impact: '200+ students received supplies',
  },
  {
    id: '2',
    title: 'Community Cookout 2023',
    description: 'Brought together families from all neighborhoods for food, music, and community building activities.',
    goal: 5000,
    raised: 6750,
    date: '2023-07-22',
    location: 'Roger Williams Park',
    impact: '350+ community members attended',
  },
  {
    id: '3',
    title: 'Holiday Hope Drive 2023',
    description: 'Delivered gifts and meals to families in need during the holiday season, spreading joy and support.',
    goal: 12000,
    raised: 14200,
    date: '2023-12-20',
    location: 'Providence Community Center',
    impact: '150 families supported',
  },
];

export function Archive() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const totalRaised = archivedFundraisers.reduce((sum, f) => sum + f.raised, 0);
  const totalGoal = archivedFundraisers.reduce((sum, f) => sum + f.goal, 0);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Past <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A history of successful fundraisers that have made lasting impact in our community
          </p>
        </motion.div>

        {/* Total impact card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-12 border-2 border-gold-500/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <DollarSign className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gradient">
                {formatCurrency(totalRaised)}
              </div>
              <div className="text-white/70 text-sm mt-1">Total Raised</div>
            </div>
            <div>
              <Users className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gradient">700+</div>
              <div className="text-white/70 text-sm mt-1">Lives Impacted</div>
            </div>
            <div>
              <TrendingUp className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gradient">
                {calculatePercentage(totalRaised, totalGoal)}%
              </div>
              <div className="text-white/70 text-sm mt-1">Average Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Archived fundraisers grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archivedFundraisers.map((fundraiser, index) => {
            const percentage = calculatePercentage(fundraiser.raised, fundraiser.goal);
            const exceeded = fundraiser.raised > fundraiser.goal;

            return (
              <motion.div
                key={fundraiser.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="glass-card p-6 h-full flex flex-col card-lift">
                  {/* Trophy icon with rotation animation */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-accent-gold flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-royal-900 animate-float" />
                    </div>
                    <span className={`badge ${exceeded ? 'badge-gold' : 'badge-success'}`}>
                      {exceeded ? 'Goal Exceeded' : 'Completed'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{fundraiser.title}</h3>
                      <p className="text-white/70 text-sm">{fundraiser.description}</p>
                    </div>

                    <div className="space-y-2 text-sm text-white/60">
                      <div>📅 {formatDate(fundraiser.date)}</div>
                      <div>📍 {fundraiser.location}</div>
                      {fundraiser.impact && (
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-gold-500 font-semibold">Impact:</span>{' '}
                          {fundraiser.impact}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress section */}
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80 font-semibold">
                        {formatCurrency(fundraiser.raised)}
                      </span>
                      <span className="text-white/60">
                        Goal: {formatCurrency(fundraiser.goal)}
                      </span>
                    </div>

                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${Math.min(percentage, 100)}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-2xl font-bold text-gold-500">{percentage}%</span>
                      <span className="text-white/60 text-sm ml-2">funded</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 mb-6">
            Want to be part of our next success story?
          </p>
          <a href="tel:4016996544" className="btn-primary inline-flex">
            Support Our Current Campaign
          </a>
        </motion.div>
      </div>
    </section>
  );
}
