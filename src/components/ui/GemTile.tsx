'use client';

import React from 'react';
import Link from 'next/link';
import type { ResourceItem } from '@/data/siteContent';
import { EXTRUSION_DEPTHS } from '@/data/siteContent';

// ─── Ring sizing constants ─────────────────────────────────────────────────────

export const TILE_W = 240;
export const TILE_H = 350;

// ─── Gem Visual Tokens ────────────────────────────────────────────────────────

type GemTheme = 'amethyst' | 'jade';

type GemTokens = {
  bg: string;
  glow: string;
  accent: string;
  facet: string;
  tagBg: string;
  tagBorder: string;
  edgeShimmer: string;
  extrusion: [string, string, string, string];
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
    extrusion: [
      'rgba(58, 37, 84, 1.00)',
      'rgba(45, 27, 65, 1.00)',
      'rgba(30, 17, 46, 1.00)',
      'rgba(16,  8, 28, 1.00)',
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
    extrusion: [
      'rgba(1,  62, 58, 1.00)',
      'rgba(1,  48, 45, 1.00)',
      'rgba(1,  32, 30, 1.00)',
      'rgba(0,  16, 15, 1.00)',
    ],
  },
};

// ─── GemTile Component ────────────────────────────────────────────────────────

export function GemTile({ item }: { item: ResourceItem }) {
  const g = GEM[item.theme];

  return (
    <div
      style={{
        position: 'relative',
        width: TILE_W,
        height: TILE_H,
        transformStyle: 'preserve-3d',
      }}
    >
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
            boxShadow: depth === 6 ? `0 0 40px ${g.glow}` : undefined,
          }}
        />
      ))}

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
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: g.facet, zIndex: 1, pointerEvents: 'none' }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: '14%', right: '14%', height: '1px',
            background: `linear-gradient(90deg, transparent, ${g.edgeShimmer}, transparent)`,
            zIndex: 2, pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '12%', bottom: '12%', left: 0, width: '1px',
            background: `linear-gradient(180deg, transparent, ${g.edgeShimmer}44, transparent)`,
            zIndex: 2, pointerEvents: 'none',
          }}
        />

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

          <Link
            href={item.url}
            style={{
              display: 'block',
              marginTop: '0.85rem',
              padding: '0.5rem 0',
              textAlign: 'center',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: g.accent,
              border: `1px solid ${g.tagBorder}`,
              borderRadius: '9999px',
              background: g.tagBg,
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
          >
            Explore Resource &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GemTile;
