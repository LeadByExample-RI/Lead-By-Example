import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  GlassCard,
  GlassButton,
  Heading,
  Text,
} from '@/components/ui';
import {
  currentFundraiser,
  keyStatistics,
  organizationInfo
} from '@/data/fundraisers';
import { showMapPlaceholder } from '@/utils/map';
import { HeroProps } from '@/types/components';

export const Hero: React.FC<HeroProps> = ({
  variant: _variant = 'default',
  title = 'Breaking the School-to-Prison Pipeline',
  subtitle,
  description = 'Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we&apos;re building stronger communities through opportunity and empowerment.',
  primaryAction: _primaryAction,
  secondaryAction,
  backgroundImage: _backgroundImage,
  backgroundVideo: _backgroundVideo,
  overlay: _overlay = false,
  animations: _animations,
  className: _className,
  ..._props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  const [isGetInTouchHovered, setIsGetInTouchHovered] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-custom">
        {/*
          12-column masonry grid:
          – Left  (cols 1-6):  mission text, stats, contact
          – Col 7: implicit gutter (~8% of container width)
          – Right (cols 8-12): fundraiser card, row-span-3
        */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Row 1 / Cols 1-6: Mission text ── */}
          <motion.div
            className="space-y-5 order-2 lg:order-1 lg:col-span-6"
            variants={leftColumnVariants}
          >
            {subtitle && (
              <Text size="sm" className="text-accent-500 font-medium uppercase tracking-wider">
                {subtitle}
              </Text>
            )}
            <Heading level={1} className="text-white">
              {title}
            </Heading>
            <Text size="lg" className="text-white/90">
              {description}
            </Text>
          </motion.div>

          {/* ── Cols 8-12 / Row-span-3: Fundraiser card — urban collage ── */}
          <motion.div
            className="order-1 lg:order-2 lg:col-start-8 lg:col-span-5 lg:row-span-3"
            variants={rightColumnVariants}
          >
            <GlassCard
              className="relative overflow-hidden flex flex-col h-full p-0"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                boxShadow: '0 12px 56px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                border: '1px solid rgba(255, 255, 255, 0.28)',
              }}
            >
              {/*
                Flyer: anchored to top-right, rotated into the card corner.
                overflow-hidden on the card clips it to the glass boundary —
                creates the "affixed poster" collage aesthetic.
              */}
              <div
                className="absolute z-10"
                style={{
                  right: '-10px',
                  top: '-8px',
                  transform: 'rotate(-9deg)',
                  transformOrigin: 'top right',
                  filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.65))',
                  willChange: 'transform, filter',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'rotate(-9deg) scale(1.05)';
                  (e.currentTarget as HTMLDivElement).style.filter = 'drop-shadow(0 22px 44px rgba(0,0,0,0.80))';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'rotate(-9deg)';
                  (e.currentTarget as HTMLDivElement).style.filter = 'drop-shadow(0 16px 32px rgba(0,0,0,0.65))';
                }}
              >
                <Image
                  src="/images/network.jpeg"
                  alt="New England Street Worker Conference — Your Network is Your Net Worth"
                  width={215}
                  height={287}
                  style={{ borderRadius: '10px', display: 'block' }}
                  priority
                />
              </div>

              {/* Content sits above the flyer via z-20 */}
              <div className="relative z-20 flex flex-col h-full p-7 gap-5">
                {/* Annual badge */}
                <div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-accent-500 bg-accent-500/10 border border-accent-500/30 rounded-full px-3 py-1">
                    6th Annual · All Sides of Town
                  </span>
                </div>

                {/* Title block — left ~60% of card; right side is the flyer */}
                <div className="space-y-1 max-w-[62%]">
                  <Heading level={2} className="gradient-text leading-tight">
                    {currentFundraiser.title}
                  </Heading>
                  <Text size="sm" className="text-white/80">
                    {currentFundraiser.date}
                  </Text>
                  <Text size="xs" className="text-white/55">
                    {currentFundraiser.time}
                  </Text>
                </div>

                {/* Location */}
                <button
                  onClick={() => showMapPlaceholder({
                    locationName: currentFundraiser.title,
                    locationAddress: currentFundraiser.location,
                    locationLat: currentFundraiser.locationLat,
                    locationLng: currentFundraiser.locationLng
                  })}
                  className="self-start hover:bg-white/10 rounded-lg px-3 py-1.5 -ml-3 transition-colors group inline-flex items-center gap-2"
                >
                  <span className="text-accent-500 group-hover:scale-110 transition-transform">📍</span>
                  <Text size="xs" className="text-accent-500 font-medium group-hover:underline">
                    {currentFundraiser.location}
                  </Text>
                </button>

                {/* Asymmetric gradient separator */}
                <div className="h-px bg-gradient-to-r from-white/25 to-transparent w-4/5" />

                {/* Features — 2-column grid, no label header */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {currentFundraiser.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-1.5 text-white/75"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.8 + index * 0.08 }
                      }}
                    >
                      <span className="text-accent-500 text-xs font-bold shrink-0">✓</span>
                      <Text size="xs">{feature}</Text>
                    </motion.div>
                  ))}
                </div>

                {/* Learn More — wide runway for lighthouse sweep animation */}
                {secondaryAction && (
                  <div className="mt-auto">
                    <GlassButton
                      variant="outline"
                      size="lg"
                      className={`w-4/5 relative overflow-hidden${isGetInTouchHovered ? ' lighthouse-active' : ''}`}
                      onClick={() => {
                        window.location.href = 'mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website';
                      }}
                    >
                      {secondaryAction.label}
                    </GlassButton>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Row 2 / Cols 1-6: Key Statistics — scaled up 20-25% ── */}
          <motion.div
            className="order-3 lg:order-3 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={leftColumnVariants}
          >
            {[
              { label: 'Youth Served',       value: `${keyStatistics.youthServed}+`,       icon: '👥' },
              { label: 'Success Rate',        value: `${keyStatistics.successRate}%`,        icon: '📈' },
              { label: 'Community Partners', value: `${keyStatistics.communityPartners}+`, icon: '🤝' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statVariants}
                initial="hidden"
                animate="visible"
              >
                <GlassCard variant="dark" className="text-center p-8">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-accent-500 mb-1.5">{stat.value}</div>
                  <div className="text-base text-white/70">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Row 3 / Cols 1-6: Get In Touch — scaled up, lighthouse trigger ── */}
          <motion.div
            className="order-4 lg:order-4 lg:col-span-6"
            variants={leftColumnVariants}
          >
            <GlassCard
              variant="dark"
              hover={false}
              className="p-8 space-y-5"
              onMouseEnter={() => setIsGetInTouchHovered(true)}
              onMouseLeave={() => setIsGetInTouchHovered(false)}
            >
              <Heading level={3} className="text-white">
                Get in Touch
              </Heading>
              <div className="space-y-3 text-white/90">
                <button
                  onClick={() => showMapPlaceholder({
                    locationName: 'Lead By Example - Headquarters',
                    locationAddress: organizationInfo.address,
                    locationLat: organizationInfo.lat,
                    locationLng: organizationInfo.lng
                  })}
                  className="flex items-center space-x-3 w-full text-left hover:bg-white/10 rounded-lg p-2 transition-colors group"
                  data-location-address={organizationInfo.address}
                  data-location-lat={organizationInfo.lat}
                  data-location-lng={organizationInfo.lng}
                >
                  <span className="text-accent-500 group-hover:scale-110 transition-transform text-lg">📍</span>
                  <Text size="base" className="text-accent-500 group-hover:underline">
                    {organizationInfo.address}
                  </Text>
                </button>
                <div className="flex items-center space-x-3">
                  <span className="text-accent-500 text-lg">📞</span>
                  <a
                    href={`tel:${organizationInfo.phone}`}
                    className="hover:text-accent-500 transition-colors"
                  >
                    <Text size="base">{organizationInfo.phone}</Text>
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-0.5 text-lg">✉️</span>
                  <div className="flex flex-col space-y-1.5">
                    <a
                      href="mailto:robertleadbyexample@gmail.com"
                      className="hover:text-accent-500 transition-colors"
                    >
                      <Text size="sm">robertleadbyexample@gmail.com</Text>
                    </a>
                    <a
                      href="mailto:ronaldleadbyexample@gmail.com"
                      className="hover:text-accent-500 transition-colors"
                    >
                      <Text size="sm">ronaldleadbyexample@gmail.com</Text>
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
