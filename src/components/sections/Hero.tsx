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
  primaryAction,
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

  const [isGetInTouchHovered, setIsGetInTouchHovered] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-custom">
        {/*
          Masonry-style grid: each block is a direct grid child.
          Desktop: col-1 gets hero text (row 1), stats (row 2), contact (row 3).
                   col-2 gets the fundraiser card spanning all 3 rows.
        */}
        <motion.div
          className="grid lg:grid-cols-[2fr_3fr] lg:grid-rows-[auto_auto_auto] gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Row 1 / Col 1: Mission text ── */}
          <motion.div
            className="space-y-4 order-2 lg:order-1"
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
            <Text size="lg" className="text-white/90 max-w-lg">
              {description}
            </Text>
          </motion.div>

          {/* ── Col 2: Fundraiser card — spans all 3 rows ── */}
          <motion.div
            className="order-1 lg:order-2 lg:row-span-3"
            variants={rightColumnVariants}
          >
            <GlassCard
              className="p-8 flex flex-col gap-6 h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.22)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                boxShadow: '0 12px 56px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
                border: '1px solid rgba(255, 255, 255, 0.30)',
              }}
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <Heading level={2} className="gradient-text">
                  {currentFundraiser.title}
                </Heading>
                <Text size="sm" className="text-white/80">
                  {currentFundraiser.date} • {currentFundraiser.time}
                </Text>
                <button
                  onClick={() => showMapPlaceholder({
                    locationName: currentFundraiser.title,
                    locationAddress: currentFundraiser.location,
                    locationLat: currentFundraiser.locationLat,
                    locationLng: currentFundraiser.locationLng
                  })}
                  className="text-left hover:bg-white/10 rounded-lg px-3 py-2 -ml-3 transition-colors group inline-flex items-center gap-2"
                >
                  <span className="text-accent-500 group-hover:scale-110 transition-transform">📍</span>
                  <Text size="sm" className="text-accent-500 font-medium group-hover:underline">
                    {currentFundraiser.location}
                  </Text>
                </button>
              </div>

              {/* Network flyer — tilted so bottom text reads horizontally */}
              <div className="flex justify-center py-2 overflow-visible">
                <div
                  className="transition-all duration-300 ease-out cursor-default"
                  style={{
                    transform: 'rotate(-4deg)',
                    transformOrigin: 'center center',
                    filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.55))',
                    willChange: 'transform, filter',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'rotate(-4deg) scale(1.05)';
                    (e.currentTarget as HTMLDivElement).style.filter = 'drop-shadow(0 20px 40px rgba(0,0,0,0.70))';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'rotate(-4deg)';
                    (e.currentTarget as HTMLDivElement).style.filter = 'drop-shadow(0 12px 28px rgba(0,0,0,0.55))';
                  }}
                >
                  <Image
                    src="/images/network.jpeg"
                    alt="New England Street Worker Conference — Your Network is Your Net Worth"
                    width={300}
                    height={400}
                    style={{ borderRadius: '11px', display: 'block' }}
                    priority
                  />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <Text size="sm" className="font-medium text-white/90">
                  What&apos;s Included:
                </Text>
                <ul className="space-y-2">
                  {currentFundraiser.features.map((feature, index) => (
                    <li key={index}>
                      <motion.div
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
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More — natural button width, left-aligned; lighthouse strobes on Get In Touch hover */}
              {secondaryAction && (
                <div className="mt-auto">
                  <GlassButton
                    variant="outline"
                    size="lg"
                    className={`relative overflow-hidden${isGetInTouchHovered ? ' lighthouse-active' : ''}`}
                    onClick={() => {
                      window.location.href = 'mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website';
                    }}
                  >
                    {secondaryAction.label}
                  </GlassButton>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* ── Row 2 / Col 1: Key Statistics ── */}
          <motion.div
            className="order-3 lg:order-3 grid grid-cols-1 sm:grid-cols-3 gap-4"
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
                <GlassCard variant="dark" className="text-center p-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-accent-500 mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Row 3 / Col 1: Get In Touch ── */}
          <motion.div
            className="order-4 lg:order-4"
            variants={leftColumnVariants}
          >
            <GlassCard
              variant="dark"
              hover={false}
              className="p-6 space-y-4"
              onMouseEnter={() => setIsGetInTouchHovered(true)}
              onMouseLeave={() => setIsGetInTouchHovered(false)}
            >
              <Heading level={3} className="text-white">
                Get in Touch
              </Heading>
              <div className="space-y-2 text-white/90">
                <button
                  onClick={() => showMapPlaceholder({
                    locationName: 'Lead By Example - Headquarters',
                    locationAddress: organizationInfo.address,
                    locationLat: organizationInfo.lat,
                    locationLng: organizationInfo.lng
                  })}
                  className="flex items-center space-x-2 w-full text-left hover:bg-white/10 rounded-lg p-2 transition-colors group"
                  data-location-address={organizationInfo.address}
                  data-location-lat={organizationInfo.lat}
                  data-location-lng={organizationInfo.lng}
                >
                  <span className="text-accent-500 group-hover:scale-110 transition-transform">📍</span>
                  <Text size="sm" className="text-accent-500 group-hover:underline">
                    {organizationInfo.address}
                  </Text>
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-accent-500">📞</span>
                  <a
                    href={`tel:${organizationInfo.phone}`}
                    className="hover:text-accent-500 transition-colors"
                  >
                    <Text size="sm">{organizationInfo.phone}</Text>
                  </a>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-accent-500 mt-0.5">✉️</span>
                  <div className="flex flex-col space-y-1">
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