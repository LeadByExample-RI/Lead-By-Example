import { motion } from 'framer-motion';
import { Heart, Target, Users, ArrowRight } from 'lucide-react';
import { formatCurrency, calculateProgress, cn } from '@/utils/helpers';
import { useInView } from '@/hooks/useInView';

interface HeroProps {
  currentFundraiser: {
    title: string;
    description: string;
    goal: number;
    raised: number;
    eventDate: string;
    eventLocation: string;
  };
}

export default function Hero({ currentFundraiser }: HeroProps) {
  const { ref, isInView } = useInView();
  const progress = calculateProgress(currentFundraiser.raised, currentFundraiser.goal);

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-verdean-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full"
            >
              <Heart className="w-5 h-5 text-gold-500 animate-pulse" />
              <span className="text-sm font-medium text-gold-500">
                Breaking the School-to-Prison Pipeline
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Lead By{' '}
              <span className="text-gradient-gold">Example</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-neutral-50/80 leading-relaxed"
            >
              Inspiring change through action. Building mentorship relationships
              to create pathways from school to success, not prison.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-primary group">
                Donate Now
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: Users, label: 'Youth Served', value: '500+' },
                { icon: Target, label: 'Success Rate', value: '87%' },
                { icon: Heart, label: 'Community Partners', value: '25+' },
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <stat.icon className="w-8 h-8 mx-auto text-gold-500" />
                  <div className="text-2xl font-bold text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-50/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Fundraiser card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="depth-3d"
          >
            <div className="glass-card p-8 md:p-10 space-y-6 hover:bg-white/15 transition-all duration-500 group">
              {/* Current Fundraiser Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 bg-gold-500 text-neutral-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <span className="w-2 h-2 bg-neutral-900 rounded-full animate-pulse" />
                  Current Fundraiser
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-6 h-6 text-neutral-900" />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-gradient-gold">
                {currentFundraiser.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-50/80 leading-relaxed">
                {currentFundraiser.description}
              </p>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-sm text-neutral-50/60 mb-1">Date</div>
                  <div className="font-semibold text-gold-500">
                    {currentFundraiser.eventDate}
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-sm text-neutral-50/60 mb-1">Location</div>
                  <div className="font-semibold text-verdean-500">
                    {currentFundraiser.eventLocation}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-4xl font-bold text-gradient-gold">
                      {formatCurrency(currentFundraiser.raised)}
                    </div>
                    <div className="text-sm text-neutral-50/60">
                      raised of {formatCurrency(currentFundraiser.goal)} goal
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-verdean-400">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-sm text-neutral-50/60">funded</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${progress}%` } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 1 }}
                    className="h-full progress-bar"
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="btn-primary flex-1 group">
                  Support This Cause
                  <Heart className="inline-block ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="btn-outline flex-1">
                  Share Campaign
                </button>
              </div>

              {/* Contact Info */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-neutral-50/60 text-center">
                  Questions? Contact Robert McKinney Sr. at{' '}
                  <a
                    href="tel:+14016996544"
                    className="text-gold-500 hover:text-gold-400 transition-colors"
                  >
                    (401) 699-6544
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
