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
  description = 'Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we\'re building stronger communities through opportunity and empowerment.',
  primaryAction: _primaryAction,
  secondaryAction,
  backgroundImage: _backgroundImage,
  backgroundVideo: _backgroundVideo,
  overlay: _overlay = false,
  animations: _animations,
  className: _className,
  ..._props
}) => {
  const [isBentoHovered, setIsBentoHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen section-padding">
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Left column: Mission + Stats + Contact ── */}
          <motion.div className="order-2 lg:order-1 col-span-1 lg:col-span-5 flex flex-col gap-8" variants={colVariants}>
            {/* Mission text */}
            <div className="space-y-5">
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
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            </div>

            {/* Get in Touch */}
            <GlassCard variant="dark" hover={false} className="p-8 space-y-5 lighthouse-active">
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
                  <a href={`tel:${organizationInfo.phone}`} className="hover:text-accent-500 transition-colors">
                    <Text size="base">{organizationInfo.phone}</Text>
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-0.5 text-lg">✉️</span>
                  <div className="flex flex-col space-y-1.5">
                    <a href="mailto:robertleadbyexample@gmail.com" className="hover:text-accent-500 transition-colors">
                      <Text size="sm">robertleadbyexample@gmail.com</Text>
                    </a>
                    <a href="mailto:ronaldleadbyexample@gmail.com" className="hover:text-accent-500 transition-colors">
                      <Text size="sm">ronaldleadbyexample@gmail.com</Text>
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Right column: Bento Zone — unified hover canvas ── */}
          <motion.div
            className="order-1 lg:order-2 col-span-1 lg:col-span-6 lg:col-start-7"
            variants={colVariants}
            onMouseEnter={() => setIsBentoHovered(true)}
            onMouseLeave={() => setIsBentoHovered(false)}
          >
            <div
              className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Row 1: Badge + Title + Date — full width */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-accent-500 bg-accent-500/10 border border-accent-500/30 rounded-full px-3 py-1">
                    6th Annual · All Sides of Town
                  </span>
                  <Heading level={2} className="gradient-text leading-tight">
                    {currentFundraiser.title}
                  </Heading>
                  <div className="space-y-1.5">
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
                </div>

                {/* Row 2 left: Feature checklist */}
                <div className="col-span-1 flex flex-col gap-y-2 justify-start">
                  {currentFundraiser.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1.5 text-white/75">
                      <span className="text-accent-500 text-xs font-bold shrink-0">✓</span>
                      <Text size="xs">{feature}</Text>
                    </div>
                  ))}
                </div>

                {/* Row 2 right: Flyer */}
                <div className="col-span-1">
                  <div
                    style={{ transform: 'rotate(3deg)' }}
                  >
                    <Image
                      src="/images/network.jpeg"
                      alt="New England Street Worker Conference — Your Network is Your Net Worth"
                      width={300}
                      height={400}
                      className="w-full h-auto rounded-xl shadow-2xl -mt-20"
                      priority
                    />
                  </div>
                </div>

                {/* Row 3: CTA — full width, lighthouse sweep */}
                {secondaryAction && (
                  <div className="col-span-1 md:col-span-2 mt-4">
                    <GlassButton
                      variant="outline"
                      size="lg"
                      className="w-1/2"
                      onClick={() => {
                        window.location.href =
                          'mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website';
                      }}
                    >
                      {secondaryAction.label}
                    </GlassButton>
                  </div>
                )}

              </div>
            </div>

            {/* Unified Lighthouse Glow Layer — reacts to parent hover state */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-3xl pointer-events-none"
              initial={{ opacity: 0.2, scale: 1 }}
              animate={{
                opacity: isBentoHovered ? 0.45 : 0.2,
                scale: isBentoHovered ? 1.15 : 1.0,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(75, 48, 106, 0.6) 0%, rgba(75, 48, 106, 0.2) 40%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient background glow — simplified static accent */}
      <div
        className="absolute inset-0 pointer-events-none -z-20"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(75, 48, 106, 0.15) 0%, transparent 50%)',
        }}
      />
    </section>
  );
};

export default Hero;
