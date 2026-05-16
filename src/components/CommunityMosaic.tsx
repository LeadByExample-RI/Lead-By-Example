import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { CommunityPhoto } from '@/types/media';
import { communityPhotos } from '@/data/mediaAssets';

// Controls masonry column stagger — mix portrait/landscape to create height variation
const aspectRatios: Record<string, string> = {
  '/images/community/cookout-pavilion.png':    '4/3',
  '/images/community/bowl-vignette.jpg':        '3/4',
  '/images/bw/b-w-cool-bowl.jpg':              '4/3',
  '/images/community/panelists.png':            '16/9',
  '/images/community/cafe-warm.jpg':            '3/4',
  '/images/community/history-culture-warm.jpg': '4/3',
  '/images/community/bored-meeting.jpg':        '3/2',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function CommunityMosaic() {
  const [selected, setSelected] = useState<CommunityPhoto | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <>
      <motion.section
        ref={sectionRef}
        className="relative bg-[#0a0a0a] pt-36 md:pt-40 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <p className="text-accent-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Our Community in Motion
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-white">
            Every gathering, a step forward.
          </h2>
        </div>

        {/* Masonry gallery — CSS columns, 3px gap */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="list"
          aria-label="Community photo gallery"
        >
          <div className="columns-2 md:columns-3 gap-[3px]">
            {communityPhotos.map((photo) => (
              <GalleryCard
                key={photo.src}
                photo={photo}
                isSelected={selected?.src === photo.src}
                onSelect={() => setSelected(photo)}
              />
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div
            className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl"
            style={{
              background: 'rgba(75, 48, 106, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 215, 0, 0.28)',
            }}
          >
            <div>
              <p className="text-5xl font-bold text-lbe-gold leading-none">125+</p>
              <p className="text-white/70 text-sm mt-1">
                youth served in Providence and surrounding communities
              </p>
            </div>
            <a
              href="#about"
              className="sm:ml-auto border border-lbe-gold/50 text-lbe-gold text-sm px-5 py-2.5 rounded-lg hover:bg-lbe-gold/10 transition-colors whitespace-nowrap"
            >
              Our Story →
            </a>
          </div>
        </div>
      </motion.section>

      {/* Modal — sibling of section so fixed positioning isn't clipped */}
      <AnimatePresence>
        {selected && (
          <PhotoModal photo={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Gallery card ────────────────────────────────────────────────────────────

interface GalleryCardProps {
  photo: CommunityPhoto;
  isSelected: boolean;
  onSelect: () => void;
}

function GalleryCard({ photo, isSelected, onSelect }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);
  const ratio = aspectRatios[photo.src] ?? '4/3';

  return (
    <motion.div
      role="listitem"
      variants={itemVariants}
      className="break-inside-avoid"
      style={{ marginBottom: '3px' }}
    >
      <motion.div
        layoutId={`card-${photo.src}`}
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-xl cursor-pointer"
        style={{ aspectRatio: ratio }}
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{
          opacity: { duration: 0.15 },
          layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: photo.objectPosition ?? 'center',
            filter: photo.isMonochrome && !hovered ? 'grayscale(1)' : 'grayscale(0)',
            transition: 'filter 0.4s ease, transform 0.35s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          sizes="(max-width: 640px) 50vw, 33vw"
          priority={photo.src.includes('cookout-pavilion')}
          loading={photo.src.includes('cookout-pavilion') ? undefined : 'lazy'}
        />

        {/* Hover overlay: hidden by default, reveals "Click to expand" on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: 'rgba(0,0,0,0.52)' }}
        >
          <span className="text-white text-[11px] font-semibold tracking-widest uppercase border border-white/50 rounded-full px-4 py-1.5">
            Click to expand
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Photo modal ─────────────────────────────────────────────────────────────

function PhotoModal({ photo, onClose }: { photo: CommunityPhoto; onClose: () => void }) {
  const ratio = aspectRatios[photo.src] ?? '4/3';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view: ${photo.caption}`}
    >
      {/* Aggressively blurred backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Shared element — animates from the grid card's position */}
      <motion.div
        layoutId={`card-${photo.src}`}
        className="relative z-10 overflow-hidden rounded-2xl"
        style={{ width: '100%', maxWidth: '800px', aspectRatio: ratio }}
        onClick={(e) => e.stopPropagation()}
        transition={{ layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: photo.objectPosition ?? 'center',
            filter: 'grayscale(0)', // always full color in modal
          }}
          priority
          sizes="(max-width: 800px) 100vw, 800px"
        />

        {/* Caption — fades in after the layout transition settles */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-6 pt-16"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, transparent 100%)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.25 }}
        >
          <p className="text-white font-semibold text-lg leading-snug">{photo.caption}</p>
          <p className="text-white/60 text-sm mt-1.5 leading-relaxed">{photo.alt}</p>
        </motion.div>

        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          aria-label="Close photo"
        >
          ✕
        </motion.button>
      </motion.div>
    </div>
  );
}
