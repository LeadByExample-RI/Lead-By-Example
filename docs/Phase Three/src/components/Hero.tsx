'use client';

import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { formatCurrency, calculatePercentage } from '@/utils/helpers';
import { Fundraiser } from '@/types';

interface HeroProps {
  fundraiser: Fundraiser;
}

export function Hero({ fundraiser }: HeroProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const percentage = calculatePercentage(fundraiser.raised, fundraiser.goal);

  return (
    <section className="relative min-h-screen flex items-center gradient-animate overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-verdean-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="badge badge-gold text-sm px-4 py-2">
                  Breaking the School-to-Prison Pipeline
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-shadow-lg">
                Lead By{' '}
                <span className="text-gradient">Example</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-2xl text-shadow">
                Inspiring change through action. Building mentorship relationships 
                that transform communities and empower youth.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="glass-card p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-gold-500" />
                </div>
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-sm text-white/70">Youth Served</div>
              </div>

              <div className="glass-card p-4 text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-8 h-8 text-gold-500" />
                </div>
                <div className="text-3xl font-bold text-gradient">87%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>

              <div className="glass-card p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Heart className="w-8 h-8 text-gold-500" />
                </div>
                <div className="text-3xl font-bold text-gradient">25+</div>
                <div className="text-sm text-white/70">Partners</div>
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 space-y-2"
            >
              <p className="text-white/90">
                <strong>Contact:</strong> Robert McKinney Sr.
              </p>
              <p className="text-white/80">
                120 Hawkins Street, Providence, RI 02908
              </p>
              <p className="text-white/80">
                Phone: <a href="tel:4016996544" className="text-gold-500 hover:text-gold-400 transition-colors">(401) 699-6544</a>
              </p>
              <p className="text-white/80">
                Email: <a href="mailto:contact@leadbyexample.org" className="text-gold-500 hover:text-gold-400 transition-colors">contact@leadbyexample.org</a>
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - Current Fundraiser Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass-card p-8 space-y-6 card-lift border-2 border-gold-500/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gold-500">
                  <div className="w-3 h-3 rounded-full bg-gold-500 animate-pulse" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Current Fundraiser
                  </span>
                </div>
                <h2 className="text-3xl font-bold">{fundraiser.title}</h2>
                <p className="text-white/80">{fundraiser.description}</p>
              </div>

              {/* Event details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  <span>{fundraiser.date}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 text-gold-500" />
                  <span>{fundraiser.location}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-4xl font-bold text-gradient">
                      {formatCurrency(fundraiser.raised)}
                    </div>
                    <div className="text-sm text-white/60">
                      raised of {formatCurrency(fundraiser.goal)} goal
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gold-500">
                      {percentage}%
                    </div>
                    <div className="text-sm text-white/60">funded</div>
                  </div>
                </div>

                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Features list */}
              {fundraiser.features && fundraiser.features.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                    Event Features:
                  </div>
                  <ul className="space-y-2">
                    {fundraiser.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="tel:4016996544"
                  className="btn-primary flex items-center justify-center gap-2 group"
                >
                  <span>Donate Now</span>
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <button className="btn-outline flex items-center justify-center gap-2 group">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
