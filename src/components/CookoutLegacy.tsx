import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { UtensilsCrossed, Scissors, Backpack, PartyPopper } from 'lucide-react';
import { cookoutEditions } from '@/data/mediaAssets';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const features = [
  { icon: UtensilsCrossed, label: 'Free food for everyone' },
  { icon: Scissors, label: 'Free haircuts' },
  { icon: Backpack, label: 'Free backpack giveaway' },
  { icon: PartyPopper, label: 'Activities for all ages' },
];

export default function CookoutLegacy() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const bannerInView = useInView(bannerRef, { once: true, margin: '-60px' });

  const pastEditions = cookoutEditions.filter((e) => e.edition < 6);

  return (
    <section ref={sectionRef} className="bg-[#080b14]">
      {/* ── Section 1: History header + past-year carousel ── */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-medium tracking-widest text-lbe-gold mb-3 uppercase"
            >
              Five Years of Showing Up
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-medium text-white mb-4"
            >
              Every Year, A Table Set for Everyone
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-white/55 text-base leading-relaxed"
            >
              Since 2019, we&apos;ve brought all sides of town together — free food, free haircuts,
              and backpacks for anyone who needs one. This summer, we do it again.
            </motion.p>
          </motion.div>

          {/* Past editions carousel */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <div
              role="list"
              aria-label="Past cookout editions"
              className="flex flex-row gap-4 overflow-x-auto pb-4"
              style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {pastEditions.map((edition) => (
                <motion.div
                  key={edition.edition}
                  role="listitem"
                  variants={itemVariants}
                  className={`
                    flex-shrink-0 w-64 h-52 rounded-2xl overflow-hidden border border-white/8
                    p-5 flex flex-col justify-between
                    bg-gradient-to-br ${edition.gradientClass}
                    hover:-translate-y-1 hover:border-lbe-gold/30 transition-all duration-300
                  `}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div>
                    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-lbe-gold/15 text-lbe-gold border border-lbe-gold/30 mb-2">
                      {edition.label}
                    </span>
                    <p className="text-white/40 text-xs">{edition.year}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">{edition.location}</p>
                    <p className="text-white/80 text-sm font-medium leading-snug italic">
                      &ldquo;{edition.tagline}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Section 2: Year 6 feature banner ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        <motion.div
          ref={bannerRef}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={bannerInView ? { scale: 1, opacity: 1 } : { scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: '480px' }}
        >
          {/* Background image */}
          <Image
            src="/images/community/cookout-pavilion.png"
            alt="Hundreds of community members gathered at Lincoln Woods pavilion for the All Sides of Town cookout"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 h-full">
            <p className="text-lbe-gold text-sm font-medium tracking-widest uppercase mb-3">
              This July
            </p>
            <h2 className="text-5xl md:text-6xl font-medium text-white mb-3">
              Everyone Welcome.
            </h2>
            <p className="text-2xl md:text-3xl text-lbe-gold font-medium mb-4">
              All Sides of Town — Year Six
            </p>
            <p className="text-white/60 text-sm mb-8">
              July 18, 2026 · Lincoln Woods Site A&amp;B · 12:30pm – 8:00pm
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-lg mx-auto w-full">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon size={16} className="text-lbe-gold flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#details"
                className="bg-lbe-gold text-black font-medium px-6 py-3 rounded-xl hover:bg-lbe-gold-dark transition-colors"
              >
                See Event Details
              </a>
              <a
                href="mailto:contact@leadbyexample.org"
                className="border border-lbe-gold/50 text-lbe-gold px-6 py-3 rounded-xl hover:bg-lbe-gold/10 transition-colors"
              >
                Help Make It Happen
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Section 3: Support callout strip ── */}
      <div
        className="py-10 text-center"
        style={{
          background: 'rgba(75, 48, 106, 0.12)',
          borderTop: '1px solid rgba(255, 215, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
          marginTop: '4rem',
        }}
      >
        <p className="text-white/70 text-base mb-2">
          This event is free for everyone. Always has been. Always will be.
        </p>
        <p className="text-white/45 text-sm mb-6">
          If you&apos;d like to help us keep that promise, we&apos;d be grateful.
        </p>
        <a
          href="mailto:contact@leadbyexample.org"
          className="border border-lbe-gold/35 text-lbe-gold/80 text-sm px-5 py-2 rounded-lg hover:border-lbe-gold/60 hover:text-lbe-gold transition-colors"
        >
          Reach Out to Support Us
        </a>
      </div>
    </section>
  );
}
