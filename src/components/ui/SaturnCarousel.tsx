'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart, Brain, BookOpen, Shield, Video, Star, Users, Clock } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type GemTheme = 'amethyst' | 'jade';

interface ResourceItem {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  theme: GemTheme;
  rating: string;
  views: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_ITEMS: ResourceItem[] = [
  {
    id: 1,
    title: 'Understanding Your Emotions',
    category: 'Trauma Support',
    description: 'Practical tools for emotional regulation and resilience designed for youth facing systemic challenges.',
    icon: <Heart className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.8★',
    views: '1,247 views',
  },
  {
    id: 2,
    title: 'From Streets to Success',
    category: 'Inspiration',
    description: 'Real transformation stories from people who walked your path and found their way forward.',
    icon: <Video className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.9★',
    views: '3,420 views',
  },
  {
    id: 3,
    title: 'Building Healthy Relationships',
    category: 'Life Skills',
    description: 'Navigate trust, boundaries, and authentic communication with lasting confidence.',
    icon: <Users className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.7★',
    views: '892 views',
  },
  {
    id: 4,
    title: 'Know Your Legal Rights',
    category: 'Legal Guide',
    description: 'A youth-focused guide to protecting yourself when interacting with law enforcement.',
    icon: <Shield className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.9★',
    views: '2,156 views',
  },
  {
    id: 5,
    title: 'Study Skills That Work',
    category: 'Academic',
    description: 'Evidence-based strategies for improving grades, focus, and academic self-confidence.',
    icon: <BookOpen className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.6★',
    views: '1,634 views',
  },
  {
    id: 6,
    title: 'Mindfulness for Tough Times',
    category: 'Mental Health',
    description: 'Breathing exercises and guided meditation that work when life feels overwhelming.',
    icon: <Brain className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.8★',
    views: '2,891 views',
  },
  {
    id: 7,
    title: 'Financial Literacy Basics',
    category: 'Life Skills',
    description: "Money management, budgeting, and credit — skills they don't teach in school.",
    icon: <Star className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.8★',
    views: '2,045 views',
  },
  {
    id: 8,
    title: 'Healing from Trauma',
    category: 'Trauma Support',
    description: 'A compassionate, specialist-informed guide to understanding and recovering from trauma.',
    icon: <Clock className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.9★',
    views: '1,789 views',
  },
];

// ─── Ring Physics Constants ───────────────────────────────────────────────────

const ITEM_COUNT = DUMMY_ITEMS.length;
const RADIUS     = 550;               // px — outward push per tile
const ANGLE_STEP = 360 / ITEM_COUNT;  // 45° between each tile
const TILE_W     = 240;               // px
const TILE_H     = 350;               // px

// ─── Gem Visual Tokens ────────────────────────────────────────────────────────

type GemTokens = {
  bg: string;
  glow: string;
  accent: string;
  facet: string;
  tagBg: string;
  tagBorder: string;
  edgeShimmer: string;
};

const GEM: Record<GemTheme, GemTokens> = {
  amethyst: {
    bg:          'rgba(75, 48, 106, 0.75)',
    glow:        'rgba(75, 48, 106, 0.40)',
    accent:      '#C4965A',
    facet:       'linear-gradient(135deg, rgba(196,150,90,0.14) 0%, transparent 48%, rgba(0,0,0,0.22) 100%)',
    tagBg:       'rgba(75, 48, 106, 0.62)',
    tagBorder:   'rgba(196, 150, 90, 0.42)',
    edgeShimmer: 'rgba(196, 150, 90, 0.55)',
  },
  jade: {
    bg:          'rgba(1, 81, 76, 0.75)',
    glow:        'rgba(1, 81, 76, 0.40)',
    accent:      '#FFD700',
    facet:       'linear-gradient(135deg, rgba(255,215,0,0.10) 0%, transparent 48%, rgba(0,0,0,0.22) 100%)',
    tagBg:       'rgba(1, 81, 76, 0.62)',
    tagBorder:   'rgba(255, 215, 0, 0.42)',
    edgeShimmer: 'rgba(255, 215, 0, 0.50)',
  },
};

// ─── GemTile Component ────────────────────────────────────────────────────────

function GemTile({ item }: { item: ResourceItem }) {
  const g = GEM[item.theme];

  return (
    <div
      style={{
        width: TILE_W,
        height: TILE_H,
        borderRadius: '1rem',
        overflow: 'hidden',
        position: 'relative',
        background: g.bg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.30)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.20)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.45)',
        borderRight: '1px solid rgba(0, 0, 0, 0.45)',
        boxShadow: [
          '0 28px 70px rgba(0, 0, 0, 0.72)',
          `0 0 55px ${g.glow}`,
          'inset 0 1px 0 rgba(255, 255, 255, 0.13)',
        ].join(', '),
      }}
    >
      {/* Diagonal facet layout overlay */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: g.facet, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* Top-edge shimmer highlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: '14%', right: '14%', height: '1px',
          background: `linear-gradient(90deg, transparent, ${g.edgeShimmer}, transparent)`,
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Left-edge catch-light projection */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '12%', bottom: '12%', left: 0, width: '1px',
          background: `linear-gradient(180deg, transparent, ${g.edgeShimmer}44, transparent)`,
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Card context wrapper */}
      <div
        style={{
          position: 'relative', zIndex: 3, height: '100%',
          display: 'flex', flexDirection: 'column', padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.125rem' }}>
          <span style={{ color: g.accent, display: 'flex', alignItems: 'center', userSelect: 'none' }}>
            {item.icon}
          </span>
          <span
            style={{
              background: g.tagBg, border: `1px solid ${g.tagBorder}`, color: g.accent,
              fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.13em', padding: '0.28rem 0.65rem',
              borderRadius: '9999px', whiteSpace: 'nowrap',
            }}
          >
            {item.category}
          </span>
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, marginBottom: '0.7rem', letterSpacing: '-0.01em' }}>
          {item.title}
        </h3>

        <p style={{ fontSize: '0.79rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.62, flex: 1 }}>
          {item.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{item.views}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: g.accent }}>{item.rating}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main SaturnCarousel Component ────────────────────────────────────────────

export default function SaturnCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const dragStartRef = useRef(0);
  const axleControls = useAnimation();

  // 1. Core Mathematical Rotation Target
  const targetRotationY = currentIndex * -ANGLE_STEP;

  // 2. Direct Indexed Spring Positioning Engine
  useEffect(() => {
    axleControls.start({
      rotateY: targetRotationY,
      transition: { type: 'spring', stiffness: 90, damping: 22, mass: 1.2 }
    });
  }, [currentIndex, targetRotationY, axleControls]);

  // 3. Automated Rotation Cycle (Idle Return Trigger)
  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInteracting]);

  return (
    <div 
      className="relative w-full h-[500px] mt-8 flex items-center justify-center select-none"
      style={{ perspective: '1400px', overflow: 'visible' }}
    >
      {/* Structural Camera & Interactive Pointer Zone */}
      <motion.div
        className="absolute w-[1px] h-[1px] cursor-grab active:cursor-grabbing"
        style={{ transformStyle: 'preserve-3d' }}
        animate={axleControls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragStart={(e) => {
          setIsInteracting(true);
          dragStartRef.current = e instanceof MouseEvent ? e.clientX : (e as TouchEvent).touches[0].clientX;
        }}
        onDragEnd={(e, info) => {
          setIsInteracting(false);
          const currentX = e instanceof MouseEvent ? e.clientX : (e as TouchEvent).changedTouches[0].clientX;
          const deltaX = currentX - dragStartRef.current;
          const swipeThreshold = 60;

          // Determine step updates based strictly on structural drag delta direction
          if (deltaX < -swipeThreshold || info.velocity.x < -300) {
            setCurrentIndex((prev) => prev + 1);
          } else if (deltaX > swipeThreshold || info.velocity.x > 300) {
            setCurrentIndex((prev) => prev - 1);
          } else {
            // Force return alignment stabilization on minor adjustments
            axleControls.start({
              rotateY: targetRotationY,
              transition: { type: 'spring', stiffness: 120, damping: 15 }
            });
          }
        }}
      >
        {/* The Radial Octagon Mapping Matrix */}
        {DUMMY_ITEMS.map((item, index) => {
          const itemRotationY = index * ANGLE_STEP;

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotateY(${itemRotationY}deg) translateZ(${RADIUS}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <GemTile item={item} />
            </div>
          );
        })}
      </motion.div>

      {/* Visual Assistance Layout Guide Anchor */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 pointer-events-none">
        <span>← Drag horizontally to explore →</span>
      </div>
    </div>
  );
}
