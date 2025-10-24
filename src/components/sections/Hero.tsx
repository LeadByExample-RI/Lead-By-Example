import React from 'react';
import { motion } from 'framer-motion';
import { 
  GlassCard, 
  GlassButton, 
  Heading, 
  Text, 
  ProgressBar 
} from '@/components/ui';
import { 
  currentFundraiser, 
  keyStatistics, 
  organizationInfo 
} from '@/data/fundraisers';
import { formatCurrency, calculateProgress } from '@/utils/helpers';
import { HeroProps } from '@/types/components';

export const Hero: React.FC<HeroProps> = ({
  variant = 'default',
  title = 'Breaking the School-to-Prison Pipeline',
  subtitle,
  description = 'Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we\'re building stronger communities through opportunity and empowerment.',
  primaryAction,
  secondaryAction,
  backgroundImage,
  backgroundVideo,
  overlay = false,
  animations,
  className,
  ...props
}) => {
  const progressPercentage = calculateProgress(currentFundraiser.raised, currentFundraiser.goal);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: 'easeOut'
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progressPercentage}%`,
      transition: {
        delay: 0.5,
        duration: 1.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-custom">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Mission and Stats */}
          <motion.div
            className="space-y-8"
            variants={leftColumnVariants}
          >
            <div className="space-y-4">
               {subtitle && (
                 <Text size="sm" className="text-accent-500 font-medium uppercase tracking-wider">
                   {subtitle}
                 </Text>
               )}
               <Heading level={1} className="text-white">
                 {title}
               </Heading>
               <Text size="lg" className="text-white/90 max-w-lg">
                 {description}
               </Text>
             </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { 
                  label: 'Youth Served', 
                  value: `${keyStatistics.youthServed}+`,
                  icon: '👥'
                },
                { 
                  label: 'Success Rate', 
                  value: `${keyStatistics.successRate}%`,
                  icon: '📈'
                },
                { 
                  label: 'Community Partners', 
                  value: `${keyStatistics.communityPartners}+`,
                  icon: '🤝'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  variants={statVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <GlassCard variant="dark" className="text-center p-6">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-accent-500 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Organization Info */}
            <GlassCard variant="dark" className="space-y-4">
              <Heading level={3} className="text-white">
                Get in Touch
              </Heading>
              <div className="space-y-2 text-white/90">
                <div className="flex items-center space-x-2">
                  <span className="text-accent-500">📍</span>
                  <Text size="sm">{organizationInfo.address}</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-accent-500">📞</span>
                  <a 
                    href={`tel:${organizationInfo.phone}`}
                    className="hover:text-accent-500 transition-colors"
                  >
                    <Text size="sm">{organizationInfo.phone}</Text>
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-accent-500">✉️</span>
                  <a 
                    href={`mailto:${organizationInfo.email}`}
                    className="hover:text-accent-500 transition-colors"
                  >
                    <Text size="sm">{organizationInfo.email}</Text>
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column - Fundraiser Card */}
          <motion.div
            className="lg:order-last order-first"
            variants={rightColumnVariants}
          >
            <GlassCard className="space-y-6 p-8">
              <div className="text-center space-y-2">
                <Heading level={2} className="gradient-text">
                  {currentFundraiser.title}
                </Heading>
                <Text size="sm" className="text-white/80">
                  {currentFundraiser.date} • {currentFundraiser.time}
                </Text>
                <Text size="sm" className="text-accent-500 font-medium">
                  📍 {currentFundraiser.location}
                </Text>
              </div>

              {/* Progress Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <Text size="lg" className="font-bold text-white">
                    {formatCurrency(currentFundraiser.raised)}
                  </Text>
                  <Text size="sm" className="text-white/70">
                    of {formatCurrency(currentFundraiser.goal)}
                  </Text>
                </div>
                
                <ProgressBar
                  value={currentFundraiser.raised}
                  max={currentFundraiser.goal}
                  variant="success"
                  size="lg"
                  animated={true}
                />

                <motion.div
                  className="text-center"
                  variants={progressBarVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Text size="sm" className="text-accent-500 font-medium">
                    {Math.round(progressPercentage)}% Funded
                  </Text>
                </motion.div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <Text size="sm" className="font-medium text-white/90">
                  What's Included:
                </Text>
                <ul className="space-y-2">
                  {currentFundraiser.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-2 text-white/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.8 + index * 0.1 }
                      }}
                    >
                      <span className="text-accent-500">✓</span>
                      <Text size="sm">{feature}</Text>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 {primaryAction && (
                   <GlassButton
                     variant="primary"
                     size="lg"
                     className="flex-1"
                     onClick={primaryAction.onClick || (primaryAction.href ? () => window.open(primaryAction.href, '_self') : undefined)}
                   >
                     {primaryAction.label}
                   </GlassButton>
                 )}
                 {secondaryAction && (
                   <GlassButton
                     variant="outline"
                     size="lg"
                     className="flex-1"
                     onClick={secondaryAction.onClick || (secondaryAction.href ? () => window.open(secondaryAction.href, '_self') : undefined)}
                   >
                     {secondaryAction.label}
                   </GlassButton>
                 )}
               </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;