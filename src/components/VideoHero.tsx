'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// ── Magnetic heading: characters cluster toward the mouse like iron filings ──
// Uses direct DOM refs + RAF — zero React state updates during mouse moves.
function MagneticHeading({ text, className }: { text: string; className?: string }) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafId = useRef<number | null>(null);
  const chars = Array.from(text);

  const applyMagnet = (mx: number, my: number) => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.hypot(dx, dy);
      const falloff = 200;   // influence radius in px
      const maxPull = 56;    // max displacement in px
      const mag = Math.max(0, (1 - dist / falloff) * maxPull);
      const nx = dist > 0 ? dx / dist : 0;
      const ny = dist > 0 ? dy / dist : 0;
      el.style.transition = 'none';
      el.style.transform = `translate(${nx * mag}px, ${ny * mag}px)`;
    });
  };

  const resetMagnet = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    charRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = 'transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      el.style.transform = 'translate(0, 0)';
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const { clientX, clientY } = e;
    rafId.current = requestAnimationFrame(() => applyMagnet(clientX, clientY));
  };

  useEffect(() => () => { if (rafId.current) cancelAnimationFrame(rafId.current); }, []);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={resetMagnet}
      className={`cursor-default select-none ${className ?? ''}`}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el; }}
          className="inline-block"
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </div>
  );
}

interface VideoHeroProps {
  className?: string;
}

export default function VideoHero({ className }: VideoHeroProps) {


  return (
    <section className={`h-screen w-full bg-[#080b12] flex flex-col justify-between overflow-hidden ${className ?? ''}`}>
      {/* ── TOP LETTERBOX ── */}
      <div className="h-[15vh] w-full bg-[#01514C] flex items-center justify-center relative z-20">
        <MagneticHeading
          text="OUR COMMUNITY IN MOTION"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.2em] text-[#FFD700] uppercase relative z-50 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* ── VIDEO LAYER ── */}
      <div className="relative z-10 flex-grow w-full max-w-[1920px] mx-auto overflow-hidden flex items-center justify-center bg-[#080b12]">
        {/* Video assets not yet available in public/ - placeholder fallback active */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#01514C] to-[#080b12]">
          <div className="text-center px-8">
            <p className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">🎬</p>
            <p className="text-lg text-white/70">Community Video Coming Soon</p>
            <p className="text-sm text-white/40 mt-2">All Sides of Town Cookout 2026</p>
          </div>
        </div>

      </div>

      {/* ── BOTTOM LETTERBOX ── */}
      <div className="h-[15vh] w-full bg-[#01514C] flex items-center justify-between px-8 relative z-30">
        {/* Cookout Info Card - Left side */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="relative z-40 w-[300px] md:w-[340px]"
          style={{
            background: 'rgba(10, 8, 20, 0.75)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255, 215, 0, 0.22)',
            borderRadius: '16px',
            padding: '1.25rem',
          }}
        >
          <span className="text-[11px] font-medium text-lbe-gold border border-lbe-gold/30 bg-lbe-gold/10 rounded-full px-3 py-1 inline-block mb-2.5">
            ✦ 6th Annual · All Sides of Town
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFD700] mb-1">
            All Sides of Town Cookout
          </h2>

          <p className="text-xs sm:text-sm text-white/60 mb-3">
            July 18, 2026 · Lincoln Woods, Providence RI
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
            {[
              'Free food for everyone',
              'Free haircuts',
              'Free backpack giveaway',
              'Games & activities for all',
            ].map((feature) => (
              <span key={feature} className="text-[11px] text-white/55 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-lbe-gold/60 flex-shrink-0" />
                {feature}
              </span>
            ))}
          </div>

          <div className="flex justify-center pt-1">
            <a
              href="mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website"
              className="border border-lbe-gold/55 text-lbe-gold text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-lbe-gold/10 transition-colors duration-200 inline-block"
            >
              Contact Founders
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
