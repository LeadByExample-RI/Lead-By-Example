'use client';

import { motion } from 'framer-motion';

export type AtmosphericTheme = 'purple' | 'green';

interface OrbConfig {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  width: number;
  height: number;
  animate: { x: number[]; y: number[] };
  duration: number;
}

// Use strict Cape Verde palette (Jade, Amethyst, Gold) for ambient spotlights
const PALETTES: Record<AtmosphericTheme, [string, string, string]> = {
  purple: [
    'rgba(75,48,106,0.36)', // Amethyst
    'rgba(1,81,76,0.32)',   // Jade
    'rgba(255,215,0,0.22)', // Gold
  ],
  green: [
    'rgba(1,81,76,0.36)',   // Jade
    'rgba(75,48,106,0.32)', // Amethyst
    'rgba(255,215,0,0.22)', // Gold
  ],
};

const ORB_CONFIG: OrbConfig[] = [
  {
    top: '-8%',
    left: '-5%',
    width: 720,
    height: 720,
    animate: { x: [0, 160, -90, 0], y: [0, -90, 140, 0] },
    duration: 30,
  },
  {
    bottom: '-14%',
    right: '-6%',
    width: 660,
    height: 660,
    animate: { x: [0, -130, 70, 0], y: [0, 120, -80, 0] },
    duration: 25,
  },
  {
    top: '42%',
    left: '52%',
    width: 520,
    height: 520,
    animate: { x: [0, 100, -120, 0], y: [0, -140, 60, 0] },
    duration: 20,
  },
];

interface AtmosphericLightsProps {
  theme: AtmosphericTheme;
}

export function AtmosphericLights({ theme }: AtmosphericLightsProps) {
  const colors = PALETTES[theme];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {ORB_CONFIG.map((orb, i) => {
        const { animate, duration, width, height, ...posStyles } = orb;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width,
              height,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 68%)`,
              filter: 'blur(120px)',
              mixBlendMode: 'screen',
              willChange: 'transform',
              ...posStyles,
            }}
            animate={animate}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
    </div>
  );
}

export default AtmosphericLights;
