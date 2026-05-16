'use client';

// ─── SaturnCarousel — Digital Saturn ring of chiseled gem resource tiles ──────
//
// Architecture:
//   Camera  → perspective: 1200px, overflow: visible. Owns all pointer events.
//   Axle    → transform-style: preserve-3d + useMotionValue(rotateY).
//             A RAF loop writes to this MotionValue every frame (no animate()
//             conflicts — one value, one owner, zero restart jumps).
//   Tiles   → each has a STATIC transform: rotateY(N°) translateZ(RADIUS).
//             CSS reads right-to-left: push out first, then sweep around the Y
//             axis. Centering via negative margins, not transforms.

import { motion, useMotionValue, PanInfo } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type GemTheme = 'amethyst' | 'jade';

interface ResourceItem {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: string;
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
    description:
      'Practical tools for emotional regulation and resilience designed for youth facing systemic challenges.',
    icon: '🔮',
    theme: 'amethyst',
    rating: '4.8★',
    views: '1,247 views',
  },
  {
    id: 2,
    title: 'From Streets to Success',
    category: 'Inspiration',
    description:
      'Real transformation stories from people who walked your path and found their way forward.',
    icon: '🌿',
    theme: 'jade',
    rating: '4.9★',
    views: '3,420 views',
  },
  {
    id: 3,
    title: 'Building Healthy Relationships',
    category: 'Life Skills',
    description:
      'Navigate trust, boundaries, and authentic communication with lasting confidence.',
    icon: '🔮',
    theme: 'amethyst',
    rating: '4.7★',
    views: '892 views',
  },
  {
    id: 4,
    title: 'Know Your Legal Rights',
    category: 'Legal Guide',
    description:
      'A youth-focused guide to protecting yourself when interacting with law enforcement.',
    icon: '🌿',
    theme: 'jade',
    rating: '4.9★',
    views: '2,156 views',
  },
  {
    id: 5,
    title: 'Study Skills That Work',
    category: 'Academic',
    description:
      'Evidence-based strategies for improving grades, focus, and academic self-confidence.',
    icon: '🔮',
    theme: 'amethyst',
    rating: '4.6★',
    views: '1,634 views',
  },
  {
    id: 6,
    title: 'Mindfulness for Tough Times',
    category: 'Mental Health',
    description:
      'Breathing exercises and guided meditation that work when life feels overwhelming.',
    icon: '🌿',
    theme: 'jade',
    rating: '4.8★',
    views: '2,891 views',
  },
  {
    id: 7,
    title: 'Financial Literacy Basics',
    category: 'Life Skills',
    description:
      "Money management, budgeting, and credit — skills they don't teach in school.",
    icon: '🔮',
    theme: 'amethyst',
    rating: '4.8★',
    views: '2,045 views',
  },
  {
    id: 8,
    title: 'Healing from Trauma',
    category: 'Trauma Support',
    description:
      'A compassionate, specialist-informed guide to understanding and recovering from trauma.',
    icon: '🌿',
    theme: 'jade',
    rating: '4.9★',
    views: '1,789 views',
  },
];

// ─── Ring Physics Constants ───────────────────────────────────────────────────

const ITEM_COUNT  = DUMMY_ITEMS.length; // 8
const RADIUS      = 400;               // px — outward push per tile
const ANGLE_STEP  = 360 / ITEM_COUNT;  // 45° between each tile
const TILE_W      = 280;               // px
const TILE_H      = 400;               // px
const DEG_PER_SEC = 360 / 40;         // 9°/s → one full revolution every 40 s
const DRAG_FACTOR = 0.45;             // 1 px horizontal drag → 0.45° rotation

// ─── Gem Visual Tokens ────────────────────────────────────────────────────────

type GemTokens = {
  bg: string;
  glow: string;
  accent: string;
  facet: string;       // diagonal cut-plane gradient
  tagBg: string;
  tagBorder: string;
  edgeShimmer: string; // top & left catch-light colour
};

const GEM: Record<GemTheme, GemTokens> = {
  amethyst: {
    bg:          'rgba(75, 48, 106, 0.18)',
    glow:        'rgba(75, 48, 106, 0.52)',
    accent:      '#C4965A',
    // Top-left half catches warm gold; bottom-right falls to shadow
    facet:       'linear-gradient(135deg, rgba(196,150,90,0.14) 0%, transparent 48%, rgba(0,0,0,0.22) 100%)',
    tagBg:       'rgba(75, 48, 106, 0.62)',
    tagBorder:   'rgba(196, 150, 90, 0.42)',
    edgeShimmer: 'rgba(196, 150, 90, 0.55)',
  },
  jade: {
    bg:          'rgba(1, 81, 76, 0.18)',
    glow:        'rgba(1, 81, 76, 0.52)',
    accent:      '#FFD700',
    facet:       'linear-gradient(135deg, rgba(255,215,0,0.10) 0%, transparent 48%, rgba(0,0,0,0.22) 100%)',
    tagBg:       'rgba(1, 81, 76, 0.62)',
    tagBorder:   'rgba(255, 215, 0, 0.42)',
    edgeShimmer: 'rgba(255, 215, 0, 0.50)',
  },
};

// ─── GemTile ──────────────────────────────────────────────────────────────────

function GemTile({ item }: { item: ResourceItem }) {
  const g = GEM[item.theme];

  return (
    <div
      style={{
        width:                TILE_W,
        height:               TILE_H,
        borderRadius:         '1rem',
        overflow:             'hidden',
        position:             'relative',
        // Semi-transparent base — lets atmospheric orbs behind bleed through
        background:           g.bg,
        backdropFilter:       'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        // Chiseled gem border: top + left catch light, bottom + right shadow
        borderTop:    '1px solid rgba(255, 255, 255, 0.30)',
        borderLeft:   '1px solid rgba(255, 255, 255, 0.20)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.45)',
        borderRight:  '1px solid rgba(0, 0, 0, 0.45)',
        boxShadow: [
          '0 28px 70px rgba(0, 0, 0, 0.72)',
          `0 0 55px ${g.glow}`,
          'inset 0 1px 0 rgba(255, 255, 255, 0.13)',
        ].join(', '),
      }}
    >
      {/* Diagonal facet: two cut planes of a gem */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: g.facet, zIndex: 1, pointerEvents: 'none',
        }}
      />

      {/* Top-edge shimmer: brightest catch-light along the crown */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: '14%', right: '14%', height: '1px',
          background: `linear-gradient(90deg, transparent, ${g.edgeShimmer}, transparent)`,
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Left-edge catch-light: secondary facet streak */}
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
        {/* Header: decorative icon + category badge */}
        <div
          style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', marginBottom: '1.125rem',
          }}
        >
          <span style={{ fontSize: '2.25rem', lineHeight: 1, userSelect: 'none' }}>
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

        {/* Title */}
        <h3
          style={{
            fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF',
            lineHeight: 1.35, marginBottom: '0.7rem', letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.79rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.62, flex: 1 }}>
          {item.description}
        </p>

        {/* Footer: rating + CTA */}
        <div
          style={{
            marginTop: '1.25rem', paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: g.accent }}>
              {item.rating}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.38)', marginTop: '0.1rem' }}>
              {item.views}
            </div>
          </div>

          <button
            type="button"
            style={{
              background: `${g.accent}18`, border: `1px solid ${g.accent}44`, color: g.accent,
              fontSize: '0.66rem', fontWeight: 600, letterSpacing: '0.06em',
              padding: '0.375rem 0.875rem', borderRadius: '9999px', cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background  = `${g.accent}30`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${g.accent}77`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background  = `${g.accent}18`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${g.accent}44`;
            }}
          >
            View →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SaturnCarousel ───────────────────────────────────────────────────────────
//
// Test in isolation — wrap in a dark container:
//   <div style={{ minHeight: '100vh', background: '#130a1f', display: 'flex',
//                 alignItems: 'center', justifyContent: 'center' }}>
//     <SaturnCarousel />
//   </div>

export function SaturnCarousel() {
  // Single unbounded rotation value — RAF writes here, Framer reads here
  const rotateY = useMotionValue(0);

  // Refs keep the RAF loop free of React re-renders
  const isHovered  = useRef(false);
  const isDragging = useRef(false);
  const lastTs     = useRef<number>(0);
  const rafId      = useRef<number>(0);

  // The only state that actually needs a re-render
  const [grabbing, setGrabbing] = useState(false);

  // ── Auto-rotate via RAF ────────────────────────────────────────────────────
  //
  // Why not Framer's animate([0,360], repeat:Infinity)?
  // Because it hard-resets the value to the keyframe start on each repeat,
  // creating a visible jump every 40 s. RAF accumulates continuously and
  // resumes from the exact current angle with zero latency after a pause.
  useEffect(() => {
    const tick = (ts: DOMHighResTimeStamp) => {
      const paused = isHovered.current || isDragging.current;

      if (!paused) {
        if (lastTs.current !== 0) {
          const dt = (ts - lastTs.current) / 1000; // seconds since last frame
          rotateY.set(rotateY.get() + DEG_PER_SEC * dt);
        }
        lastTs.current = ts;
      } else {
        // Zero out so the next resumed frame has no accumulated gap to catch up
        lastTs.current = 0;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [rotateY]);

  // ── Pointer handlers ──────────────────────────────────────────────────────

  const onHoverStart = () => { isHovered.current = true; };
  const onHoverEnd   = () => { isHovered.current = false; };

  const onPanStart = () => {
    isDragging.current = true;
    setGrabbing(true);
  };

  // onPan fires on every pointer-move while held, even outside the element
  const onPan = (_: PointerEvent, info: PanInfo) => {
    rotateY.set(rotateY.get() + info.delta.x * DRAG_FACTOR);
  };

  const onPanEnd = () => {
    isDragging.current = false;
    setGrabbing(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    /*
     * CAMERA
     * perspective: 1200px   — vanishing-point depth (lower = more dramatic tilt)
     * overflow: visible      — tiles that extend beyond the box still render
     * touchAction: none      — required for Framer onPan to fire on touch devices
     * All pointer events live here so the full visible ring area is interactive
     */
    <motion.div
      aria-label="Resource carousel — drag to spin"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onPanStart={onPanStart}
      onPan={onPan}
      onPanEnd={onPanEnd}
      style={{
        perspective:       '1200px',
        perspectiveOrigin: '50% 50%',
        overflow:          'visible',
        height:            600,
        width:             '100%',
        display:           'flex',
        alignItems:        'center',
        justifyContent:    'center',
        cursor:            grabbing ? 'grabbing' : 'grab',
        touchAction:       'none',
        userSelect:        'none',
      }}
    >
      {/*
       * AXLE
       * transformStyle: preserve-3d  — children composite in genuine 3D space
       * rotateY (MotionValue)         — RAF writes here; Framer batches DOM writes
       */}
      <motion.div
        style={{
          rotateY,
          transformStyle: 'preserve-3d',
          width:          '100%',
          height:         '100%',
          position:       'relative',
        }}
      >
        {DUMMY_ITEMS.map((item, index) => {
          /*
           * ORBIT MATH — per-tile static transform:
           *   rotateY(N°) translateZ(RADIUS)
           *
           * CSS evaluates right-to-left:
           *   1. translateZ(400px) — push tile 400 px along its own Z axis
           *   2. rotateY(N°)       — sweep that 400 px offset N° around global Y
           *
           * 8 tiles land at 0°, 45°, 90° … 315° on a 400 px radius circle.
           * When the axle rotates, all tiles orbit together as a rigid ring.
           *
           * CENTERING via negative margins keeps centering outside the 3D matrix
           * so it doesn't rotate with the tile and stays always correct.
           */
          return (
            <div
              key={item.id}
              style={{
                position:   'absolute',
                top:        '50%',
                left:       '50%',
                width:      TILE_W,
                height:     TILE_H,
                marginTop:  -(TILE_H / 2), // −200 px
                marginLeft: -(TILE_W / 2), // −140 px
                transform:  `rotateY(${index * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                // Tiles facing away from the camera disappear — no "ghost" backs
                backfaceVisibility:       'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <GemTile item={item} />
            </div>
          );
        })}
      </motion.div>

      {/* Drag hint — fades out after 4 s */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase', pointerEvents: 'none',
          animation: 'fadeOutHint 4s ease-out forwards',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Drag to spin
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <style>{`
          @keyframes fadeOutHint {
            0%   { opacity: 1; }
            70%  { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </div>
    </motion.div>
  );
}

export default SaturnCarousel;
