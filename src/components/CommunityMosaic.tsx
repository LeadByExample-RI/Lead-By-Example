import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import type { CommunityPhoto, PhotoCategory } from '@/types/media';
import { communityPhotos } from '@/data/mediaAssets';

const categoryStyles: Record<PhotoCategory, string> = {
  community: 'border-verdean-500 text-verdean-400',
  advocacy: 'border-lbe-purple-light text-lbe-purple-light',
  celebration: 'border-lbe-gold text-lbe-gold',
  journey: 'border-amber-400 text-amber-300',
};

interface PhotoCellProps {
  photo: CommunityPhoto;
  gridArea: string;
  isPriority?: boolean;
}

function PhotoCell({ photo, gridArea, isPriority = false }: PhotoCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      role="listitem"
      className="relative overflow-hidden rounded-2xl"
      style={{ gridArea }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: photo.objectPosition ?? 'center center',
          filter: photo.isMonochrome && !hovered ? 'grayscale(1)' : 'grayscale(0)',
          transition: 'filter 0.4s ease, transform 0.3s ease-out',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }}
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover caption overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-3 pt-8 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
          opacity: hovered ? 1 : 0,
        }}
      >
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border w-fit mb-1 ${categoryStyles[photo.category]}`}
        >
          {photo.category}
        </span>
        <p className="text-white text-xs font-medium leading-snug">{photo.caption}</p>
      </div>
    </motion.div>
  );
}

function CTAPanel({ gridArea }: { gridArea: string }) {
  return (
    <motion.div
      role="listitem"
      className="flex flex-col items-center justify-center text-center p-6 rounded-2xl"
      style={{
        gridArea,
        background: 'rgba(75, 48, 106, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 215, 0, 0.28)',
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      <p className="text-4xl font-medium text-lbe-gold leading-none">125+</p>
      <p className="text-sm text-white/60 mb-1">youth served</p>
      <p className="text-xs text-white/40 mb-5">in Providence and surrounding communities</p>
      <a
        href="#about"
        className="border border-lbe-gold/50 text-lbe-gold text-sm px-5 py-2 rounded-lg hover:bg-lbe-gold/10 transition-colors"
      >
        Our Story
      </a>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Grid area assignments (matches template areas in globals.css .community-bento)
const gridCells: Array<{ area: string; photoIndex: number | null }> = [
  { area: 'hero', photoIndex: 0 }, // cookout-pavilion.png
  { area: 'b1',   photoIndex: 1 }, // bowl-vignette.jpg
  { area: 'b2',   photoIndex: 2 }, // b-w-cool-bowl.jpg
  { area: 'wide', photoIndex: 3 }, // panelists.png
  { area: 'sq1',  photoIndex: 4 }, // cafe-warm.jpg
  { area: 'sq2',  photoIndex: 5 }, // history-culture-warm.jpg
  { area: 'panel', photoIndex: null }, // CTA panel
];

export default function CommunityMosaic() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={sectionRef}
      className="bg-[#0a0a0a] py-20"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-xs font-medium tracking-widest text-lbe-gold mb-3 uppercase">
          Our Community in Motion
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-white">
          Every gathering, a step forward.
        </h2>
      </div>

      {/* Bento grid — responsive via .community-bento in globals.css */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          role="list"
          aria-label="Community photo gallery"
          className="community-bento"
        >
          {gridCells.map(({ area, photoIndex }) => {
            if (photoIndex === null) {
              return <CTAPanel key="cta" gridArea={area} />;
            }
            const photo = communityPhotos[photoIndex] as CommunityPhoto;
            return (
              <PhotoCell
                key={photo.src}
                photo={photo}
                gridArea={area}
                isPriority={area === 'hero'}
              />
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
