'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

interface VideoHeroProps {
  className?: string;
}

export default function VideoHero({ className }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Lazy initializer reads sessionStorage only in the browser (component is ssr:false)
  const [isAudioOn, setIsAudioOn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('lbe-audio-pref') === 'on';
  });

  // Play/pause video based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay blocked — browser will show controls if needed
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleAudio = () => {
    const next = !isAudioOn;
    setIsAudioOn(next);
    sessionStorage.setItem('lbe-audio-pref', next ? 'on' : 'off');
    // Video itself is always muted — this toggle controls a separate ambient track
    // if one is added. The state is wired and ready.
  };

  return (
    <div
      className={`relative overflow-hidden h-screen bg-[#0a0a0a] ${className ?? ''}`}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/video/roy-hero.mp4"
        poster="/images/community/cookout-pavilion.png"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Annual Lead By Example All Sides of Town cookout community video"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay — keeps text legible over any frame */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        }}
      />

      {/* Audio toggle — top right */}
      <button
        onClick={toggleAudio}
        aria-pressed={isAudioOn}
        aria-label="Toggle ambient music"
        className="absolute top-4 right-4 z-20 rounded-full bg-black/40 border border-white/20 p-2 text-white/60 hover:text-white hover:bg-black/60 transition-all"
      >
        <Music2 size={18} />
      </button>

      {/* Glassmorphic event info overlay — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 m-6 md:m-10 z-10 max-w-sm"
        style={{
          background: 'rgba(10, 8, 20, 0.72)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255, 215, 0, 0.22)',
          borderRadius: '16px',
          padding: '1.25rem',
        }}
      >
        {/* Badge */}
        <span className="text-xs font-medium text-lbe-gold border border-lbe-gold/30 bg-lbe-gold/10 rounded-full px-3 py-1 inline-block mb-3">
          ✦ 6th Annual · All Sides of Town
        </span>

        {/* Event title */}
        <h2 className="text-xl md:text-2xl font-medium text-white mb-1">
          All Sides of Town Cookout
        </h2>

        {/* Date & location */}
        <p className="text-sm text-white/60 mb-3">
          July 18, 2026 · Lincoln Woods, Providence RI
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
          {[
            'Free food for everyone',
            'Free haircuts',
            'Free backpack giveaway',
            'Games & activities for all',
          ].map((feature) => (
            <span key={feature} className="text-xs text-white/55 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-lbe-gold/60 flex-shrink-0" />
              {feature}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <a
            href="#details"
            className="bg-lbe-gold text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-lbe-gold-dark transition-colors"
          >
            See Event Details
          </a>
          <a
            href="mailto:contact@leadbyexample.org"
            className="border border-lbe-gold/50 text-lbe-gold text-sm px-4 py-2 rounded-lg hover:bg-lbe-gold/10 transition-colors"
          >
            Support Our Work
          </a>
        </div>
      </motion.div>
    </div>
  );
}
