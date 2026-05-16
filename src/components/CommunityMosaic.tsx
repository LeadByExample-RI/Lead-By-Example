import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import Image from 'next/image';

const AtmosphericLights = dynamic(
  () => import('@/components/ui/AtmosphericLights'),
  {
    ssr: false,
    loading: () => <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true" />,
  }
);
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { CommunityPhoto } from '@/types/media';
import { communityPhotos } from '@/data/mediaAssets';

// ─── Animation variants ───────────────────────────────────────────────────────

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const headerItemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const galleryVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ─── Grid layout config ──────────────────────────────────────────────────────

const GRID_CONFIG = [
  { spans: 'col-span-1 md:col-span-6 lg:col-span-8 row-span-2', sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 66vw' },
  { spans: 'col-span-1 md:col-span-2 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 25vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-6 row-span-2', sizes: '(max-width: 768px) 100vw, 50vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-3 row-span-2', sizes: '(max-width: 768px) 100vw, 25vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-3 row-span-2', sizes: '(max-width: 768px) 100vw, 25vw' },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function CommunityMosaic() {
  const [selected, setSelected] = useState<CommunityPhoto | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <motion.section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#4B306A] pt-36 md:pt-40 pb-20"
      >
        {/* ── Section header ── */}
        <motion.div
          className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-8 mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={headerItemVariants}
            className="text-xs font-bold uppercase tracking-widest mb-4 text-yellow-400"
          >
            Our Community in Motion
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Every gathering,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C4965A 0%, #FFD700 60%, #a78040 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              a step forward.
            </span>
          </motion.h2>
        </motion.div>

        {/* ── Masonry photo wall ── */}
        <motion.div
          className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-8"
          role="list"
          aria-label="Community photo gallery"
          variants={galleryVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/*
            CSS multi-column masonry:
            - columns-2 md:columns-3 lg:columns-4 creates 2-4 staggered vertical columns
            - gap-4 sets column-gap between the columns
            - Each item gets mb-4 + break-inside-avoid to prevent column breaks through cards
          */}
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 auto-rows-[200px]">
            {communityPhotos.map((photo, index) => (
              <GalleryCard
                key={photo.src}
                photo={photo}
                index={index}
                isSelected={selected?.src === photo.src}
                onSelect={() => setSelected(photo)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Standalone CTA banner (isolated from masonry) ── */}
        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-8 mt-12">
          <motion.div
            className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 px-8 py-7 rounded-2xl"
            style={{
              background: 'rgba(75, 48, 106, 0.82)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 215, 0, 0.22)',
              boxShadow: '0 8px 40px rgba(75, 48, 106, 0.45)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <p
                className="text-6xl font-black leading-none"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #C4965A 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                125+
              </p>
              <p className="text-white/70 text-sm mt-1.5 max-w-xs">
                youth served in Providence and surrounding communities
              </p>
            </div>
            <div className="sm:ml-auto flex flex-col sm:items-end gap-2">
              <a
                href="#about"
                className="border border-lbe-gold/60 text-lbe-gold text-sm px-6 py-2.5 rounded-xl hover:bg-lbe-gold/10 transition-colors whitespace-nowrap font-medium"
              >
                Our Story →
              </a>
              <p className="text-white/35 text-xs">Lead By Example · Providence, RI</p>
            </div>
          </motion.div>
        </div>
        <AtmosphericLights theme="green" />
      </motion.section>

      {/* Modal — sibling of section so z-50 fixed positioning isn't clipped */}
      <AnimatePresence>
        {selected && (
          <PhotoModal photo={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Gallery card ─────────────────────────────────────────────────────────────

interface GalleryCardProps {
  photo: CommunityPhoto;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function GalleryCard({ photo, index, isSelected, onSelect }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);
  const { spans, sizes } = GRID_CONFIG[index] ?? GRID_CONFIG[GRID_CONFIG.length - 1];

  return (
    <motion.div
      role="listitem"
      variants={itemVariants}
      className={spans}
    >
      <motion.div
        layoutId={`card-${photo.src}`}
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full h-full overflow-hidden rounded-xl cursor-pointer"
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{
          opacity: { duration: 0.15 },
          layout: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          style={{
            objectFit: 'cover',
            objectPosition: photo.objectPosition ?? 'center',
            filter: !hovered ? 'grayscale(1)' : 'grayscale(0)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.4s ease, transform 0.35s ease',
          }}
          priority={photo.src.includes('cookout-pavilion')}
          loading={photo.src.includes('cookout-pavilion') ? undefined : 'lazy'}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: 'rgba(0,0,0,0.54)' }}
        >
          <span className="text-white text-[11px] font-semibold tracking-widest uppercase border border-white/50 rounded-full px-4 py-1.5">
            Click to expand
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Photo modal ──────────────────────────────────────────────────────────────

function PhotoModal({ photo, onClose }: { photo: CommunityPhoto; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view: ${photo.caption}`}
    >
      {/* Heavy backdrop blur keeps focus on the image */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/*
        Shared element: animates from the card's grid position to the modal center.
        Fixed to max-w-[90vw] / max-h-[85vh]; object-contain ensures no cropping.
      */}
      <motion.div
        layoutId={`card-${photo.src}`}
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          width: '90vw',
          maxWidth: '1200px',
          height: '85vh',
          maxHeight: '900px',
          background: 'rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
        transition={{ layout: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] } }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          style={{
            objectFit: 'contain',
            objectPosition: photo.objectPosition ?? 'center',
          }}
          priority
          sizes="90vw"
        />

        {/* Caption — fades in once layout animation settles */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-6 pt-20"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.32, duration: 0.28 }}
        >
          <p className="text-white font-semibold text-lg leading-snug">{photo.caption}</p>
          <p className="text-white/55 text-sm mt-1.5 leading-relaxed line-clamp-2">{photo.alt}</p>
        </motion.div>

        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/75 transition-colors text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.32 }}
          onClick={onClose}
          aria-label="Close photo"
        >
          ✕
        </motion.button>
      </motion.div>
    </div>
  );
}
