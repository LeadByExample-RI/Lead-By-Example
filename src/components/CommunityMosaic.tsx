'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { CommunityPhoto } from '@/types/media';
import { communityPhotos } from '@/data/mediaAssets';

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

export default function CommunityMosaic() {
  const [selected, setSelected] = useState<CommunityPhoto | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <motion.section
        ref={sectionRef}
        className="relative overflow-hidden pt-36 md:pt-40 pb-20 z-0"
      >
        <motion.div
          className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-8 mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={headerItemVariants}
            className="text-sm sm:text-base font-bold uppercase tracking-[0.25em] mb-4 text-gold drop-shadow-md"
          >
            Our Community in Motion
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-xl mb-2"
          >
            Every gathering,{' '}
            <span className="gradient-text drop-shadow-md">
              a step forward.
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-8"
          role="list"
          aria-label="Community photo gallery"
          variants={galleryVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
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

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-8 mt-12">
          <motion.div
            className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 p-8 md:p-10 rounded-2xl glass-effect-dark shadow-glass-dark hover-lift border border-white/20 shadow-[0_10px_40px_-10px_rgba(255,215,0,0.15)] z-10 relative w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              <p className="text-6xl font-black leading-none gradient-text drop-shadow-md">
                125+
              </p>
              <p className="text-base md:text-lg font-medium text-white/90 max-w-sm pb-1 md:pb-2">
                youth served in our communities
              </p>
            </div>
            <div className="sm:ml-auto flex flex-col sm:items-end gap-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-donation-modal'))}
                className="glass-button bg-gold/10 text-gold border-gold/50 hover:bg-gold/20 hover:border-gold hover:text-white hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] text-base px-8 py-4 rounded-xl whitespace-nowrap font-bold tracking-wide transition-all duration-300"
              >
                Help Keep It Happening
              </button>
              <p className="text-sm font-medium text-white/50 tracking-wide mt-2">Lead By Example · Providence, RI</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selected && (
          <PhotoModal photo={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

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
    <motion.div role="listitem" variants={itemVariants} className={spans}>
      <motion.div
        layoutId={`card-${photo.src}`}
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full h-full overflow-hidden rounded-xl cursor-pointer hover-lift shadow-glass-dark border border-white/10"
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
          className="absolute inset-0 flex items-center justify-center pointer-events-none glass-effect-dark"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-[11px] font-semibold tracking-widest uppercase border border-white/50 rounded-full px-4 py-1.5">
            Click to expand
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function PhotoModal({ photo, onClose }: { photo: CommunityPhoto; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view: ${photo.caption}`}
    >
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

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
