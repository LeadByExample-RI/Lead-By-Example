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
  // ── Left-column variants ─────────────────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.18 } },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  };

  // ── Collage tile variants (right card) ───────────────────────────────────────
  const tileContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.22 } },
  };

  const flyerSpring = {
    hidden: { opacity: 0, x: 70, rotate: 16, scale: 0.85 },
    visible: {
      opacity: 1, x: 0, rotate: 6, scale: 1,
      transition: { type: 'spring' as const, stiffness: 160, damping: 18 },
    },
  };

  const tileLeft = {
    hidden: { opacity: 0, x: -36, y: 6 },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
    },
  };

  const tileBottom = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring' as const, stiffness: 280, damping: 24 },
    },
  };

  // Shared glassmorphic tile style — spread + padding override per tile
  const glassTile: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: '14px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.38)',
  };

  const [isGetInTouchHovered, setIsGetInTouchHovered] = useState(false);

  return (
    <section id="home" className="min-h-screen section-padding">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] gap-8 md:gap-12 lg:gap-16"
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

          {/* ── Cols 7-12 / Row-span-3: Urban Collage Card ── */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-6 lg:row-span-3 justify-self-end"
            variants={tileContainer}
          >
            {/*
              overflow-hidden clips flyer on mobile to prevent x-scroll.
              sm:overflow-visible lets the flyer bleed outside the card boundary
              on larger viewports for the 3-D abstract-puzzle effect.
            */}
            <div className="relative overflow-hidden sm:overflow-visible min-h-[640px] w-full">

              {/* Card base — dark glass layer behind all tiles */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'rgba(10, 5, 20, 0.62)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  boxShadow: '0 24px 80px rgba(0, 0, 0, 0.62)',
                }}
              />

              {/* Flyer — spring entrance, breaks outside card boundary on sm+ */}
              <motion.div
                className="absolute z-30 cursor-default"
                style={{
                  right: '-10%',
                  top: '6%',
                  filter: 'drop-shadow(0 18px 36px rgba(75, 48, 106, 0.72))',
                  willChange: 'transform, filter',
                }}
                variants={flyerSpring}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.filter =
                    'drop-shadow(0 26px 52px rgba(75, 48, 106, 0.95))';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.filter =
                    'drop-shadow(0 18px 36px rgba(75, 48, 106, 0.72))';
                }}
              >
                <Image
                  src="/images/network.jpeg"
                  alt="New England Street Worker Conference — Your Network is Your Net Worth"
                  width={205}
                  height={273}
                  style={{ borderRadius: '10px', display: 'block' }}
                  priority
                />
              </motion.div>

              {/* Tile 1 — Annual badge */}
              <motion.div className="absolute z-20 top-6 left-6" variants={tileLeft}>
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-accent-500 bg-accent-500/10 border border-accent-500/30 rounded-full px-3 py-1">
                  6th Annual · All Sides of Town
                </span>
              </motion.div>

              {/* Tile 2 — Event title (left 57%; right side reserved for flyer) */}
              <motion.div
                className="absolute z-20"
                style={{ top: '68px', left: '24px', maxWidth: '57%' }}
                variants={tileLeft}
              >
                <div style={{ ...glassTile, padding: '14px 18px' }}>
                  <Heading level={2} className="gradient-text leading-tight">
                    {currentFundraiser.title}
                  </Heading>
                </div>
              </motion.div>

              {/* Tile 3 — Date & location (left 60%; clear of flyer overlap zone) */}
              <motion.div
                className="absolute z-20"
                style={{ top: '252px', left: '24px', right: '40%' }}
                variants={tileBottom}
              >
                <div style={{ ...glassTile, padding: '14px 16px' }} className="space-y-2">
                  <Text size="sm" className="text-white/85 font-medium">
                    {currentFundraiser.date}
                  </Text>
                  <Text size="xs" className="text-white/55">
                    {currentFundraiser.time}
                  </Text>
                  <button
                    onClick={() => showMapPlaceholder({
                      locationName: currentFundraiser.title,
                      locationAddress: currentFundraiser.location,
                      locationLat: currentFundraiser.locationLat,
                      locationLng: currentFundraiser.locationLng
                    })}
                    className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity group"
                  >
                    <span className="text-accent-500 text-sm group-hover:scale-110 transition-transform">📍</span>
                    <Text size="xs" className="text-accent-500 font-medium group-hover:underline">
                      {currentFundraiser.location}
                    </Text>
                  </button>
                </div>
              </motion.div>

              {/* Tile 4 — Feature checklist (full width; flyer ends above this row) */}
              <motion.div
                className="absolute z-20"
                style={{ bottom: '118px', left: '24px', right: '24px' }}
                variants={tileBottom}
              >
                <div style={{ ...glassTile, padding: '14px 16px' }}>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    {currentFundraiser.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1.5 text-white/75">
                        <span className="text-accent-500 text-xs font-bold shrink-0">✓</span>
                        <Text size="xs">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Tile 5 — CTA */}
              {secondaryAction && (
                <motion.div
                  className="absolute z-20"
                  style={{ bottom: '24px', left: '24px', right: '24px' }}
                  variants={tileBottom}
                >
                  <GlassButton
                    variant="outline"
                    size="lg"
                    className={`w-full relative overflow-hidden${isGetInTouchHovered ? ' lighthouse-active' : ''}`}
                    onClick={() => {
                      window.location.href =
                        'mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website';
                    }}
                  >
                    {secondaryAction.label}
                  </GlassButton>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Row 2 / Cols 1-6: Key Statistics ── */}
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

          {/* ── Row 3 / Cols 1-6: Get In Touch ── */}
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
