'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

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

// ─── Ring Physics Constants ───────────────────────────────────────────────────

const RADIUS     = 550;
const TILE_W     = 240;
const TILE_H     = 350;

// ─── Gem Visual Tokens ────────────────────────────────────────────────────────

type GemTokens = {
  bg: string;
  glow: string;
  accent: string;
  facet: string;
  tagBg: string;
  tagBorder: string;
  edgeShimmer: string;
  extrusion: [string, string, string]; // near → mid → deep face depths
};

const GEM: Record<GemTheme, GemTokens> = {
  amethyst: {
    bg:          'rgba(75, 48, 106, 0.80)',
    glow:        'rgba(75, 48, 106, 0.40)',
    accent:      '#C4965A',
    facet:       'linear-gradient(135deg, rgba(196,150,90,0.14) 0%, transparent 48%, rgba(0,0,0,0.22) 100%)',
    tagBg:       'rgba(75, 48, 106, 0.62)',
    tagBorder:   'rgba(196, 150, 90, 0.42)',
    edgeShimmer: 'rgba(196, 150, 90, 0.55)',
    // Dark indigo extrusion: near edge is slightly warmer (catches ambient light)
    extrusion: [
      'rgba(38, 20, 68, 0.97)',   // -2px: near edge
      'rgba(24, 12, 48, 0.98)',   // -4px: mid depth
      'rgba(12,  5, 30, 0.99)',   // -6px: deep back face
    ],
  },
  jade: {
    bg:          'rgba(1, 81, 76, 0.80)',
    glow:        'rgba(1, 81, 76, 0.40)',
    accent:      '#FFD700',
    facet:       'linear-gradient(135deg, rgba(255,215,0,0.10) 0%, transparent 48%, rgba(0,0,0,0.22) 100%)',
    tagBg:       'rgba(1, 81, 76, 0.62)',
    tagBorder:   'rgba(255, 215, 0, 0.42)',
    edgeShimmer: 'rgba(255, 215, 0, 0.50)',
    // Deep amber extrusion: near edge catches warm gold light
    extrusion: [
      'rgba(80, 48, 8,  0.97)',   // -2px: near edge
      'rgba(52, 30, 4,  0.98)',   // -4px: mid depth
      'rgba(28, 14, 2,  0.99)',   // -6px: deep back face
    ],
  },
};

// Depth offsets in px — negative Z pushes behind the card face
const EXTRUSION_DEPTHS = [2, 4, 6] as const;

// ─── GemTile Component ────────────────────────────────────────────────────────

function GemTile({ item }: { item: ResourceItem }) {
  const g = GEM[item.theme];

  return (
    // Volumetric wrapper — preserve-3d lets extrusion layers sit behind the face
    <div
      style={{
        position: 'relative',
        width: TILE_W,
        height: TILE_H,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── Extrusion depth layers (crystal monolith thickness) ── */}
      {EXTRUSION_DEPTHS.map((depth, i) => (
        <div
          key={depth}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '1rem',
            background: g.extrusion[i],
            transform: `translateZ(-${depth}px)`,
            // Outermost back-face picks up the ambient glow
            boxShadow: depth === 6 ? `0 0 40px ${g.glow}` : undefined,
          }}
        />
      ))}

      {/* ── Main card face (Z = 0, GPU-promoted) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1rem',
          overflow: 'hidden',
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
          // Force GPU layer — prevents repaints during 3D rotation
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {/* Diagonal facet overlay */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: g.facet, zIndex: 1, pointerEvents: 'none' }}
        />

        {/* Top-edge shimmer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: '14%', right: '14%', height: '1px',
            background: `linear-gradient(90deg, transparent, ${g.edgeShimmer}, transparent)`,
            zIndex: 2, pointerEvents: 'none',
          }}
        />

        {/* Left-edge catch-light */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '12%', bottom: '12%', left: 0, width: '1px',
            background: `linear-gradient(180deg, transparent, ${g.edgeShimmer}44, transparent)`,
            zIndex: 2, pointerEvents: 'none',
          }}
        />

        {/* Card content */}
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
    </div>
  );
}

// ─── Main SaturnCarousel Component ────────────────────────────────────────────

export default function SaturnCarousel({ items }: { items: ResourceItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const dragStartRef = useRef(0);
  const prevLengthRef = useRef(items.length);
  const axleControls = useAnimation();

  // Dynamic geometry based on incoming items
  const itemCount = items.length || 1;
  const angleStep = 360 / itemCount;

  const targetRotationY = currentIndex * -angleStep;

  // Reset index when items change (e.g., filtering) — using ref comparison to avoid direct setState in render phase
  useEffect(() => {
    if (items.length !== prevLengthRef.current) {
      setCurrentIndex(0);
      prevLengthRef.current = items.length;
    }
  }, [items.length]);

  // High-responsiveness spring — 140/26 removes sluggish feel, retains snap weight
  useEffect(() => {
    axleControls.start({
      rotateY: targetRotationY,
      transition: { type: 'spring', stiffness: 140, damping: 26, mass: 1.2 },
    });
  }, [currentIndex, targetRotationY, axleControls]);

  // Auto-advance pauses when user interacts
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
      {/* Camera axle — 1×1 anchor point; all 3D children rotate around it */}
      <motion.div
        className="absolute w-[1px] h-[1px] cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
          // Promote the axle to its own GPU compositing layer
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={axleControls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragStart={(e) => {
          setIsInteracting(true);
          dragStartRef.current = e instanceof MouseEvent
            ? e.clientX
            : (e as TouchEvent).touches[0].clientX;
        }}
        onDragEnd={(e, info) => {
          setIsInteracting(false);
          const currentX = e instanceof MouseEvent
            ? e.clientX
            : (e as TouchEvent).changedTouches[0].clientX;
          const deltaX = currentX - dragStartRef.current;
          const swipeThreshold = 60;

          if (deltaX < -swipeThreshold || info.velocity.x < -300) {
            setCurrentIndex((prev) => prev + 1);
          } else if (deltaX > swipeThreshold || info.velocity.x > 300) {
            setCurrentIndex((prev) => prev - 1);
          } else {
            // Minor adjustment — snap back with stiffer spring for crisp return
            axleControls.start({
              rotateY: targetRotationY,
              transition: { type: 'spring', stiffness: 180, damping: 30, mass: 1.2 },
            });
          }
        }}
      >
        {/* Radial tile ring */}
        {items.map((item, index) => {
          const itemRotationY = index * angleStep;

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotateY(${itemRotationY}deg) translateZ(${RADIUS}px)`,
                transformStyle: 'preserve-3d',
                // Hide reverse faces — keeps GPU load minimal for 8 tiles
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <GemTile item={item} />
            </div>
          );
        })}
      </motion.div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#080b12]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center max-w-sm">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-xl font-bold text-white mb-2">No resources match</h4>
            <p className="text-gray-400">Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
        </div>
      )}
    </div>
  );
}
