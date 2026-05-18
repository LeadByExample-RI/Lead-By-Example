'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Volume1, VolumeX, Play, Pause } from 'lucide-react';

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
      const falloff = 200;
      const maxPull = 56;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const lastVolume = useRef(0.8);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      const restoreVol = lastVolume.current || 0.8;
      video.volume = restoreVol;
      setIsMuted(false);
      setVolume(restoreVol);
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      const restore = lastVolume.current || 0.8;
      video.muted = false;
      video.volume = restore;
      setVolume(restore);
      setIsMuted(false);
    } else {
      lastVolume.current = video.volume;
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    video.volume = val;
    video.muted = val === 0;
    setVolume(val);
    setIsMuted(val === 0);
    if (val > 0) lastVolume.current = val;
  };

  const displayVol = isMuted ? 0 : volume;
  const VolumeIcon = displayVol === 0 ? VolumeX : displayVol < 0.5 ? Volume1 : Volume2;

  return (
    <section className={`relative overflow-visible bg-primary-500 ${className ?? ''}`}>
      <div className="relative overflow-hidden h-[93vh] min-h-[500px] w-full bg-black flex flex-col justify-center">
        {!videoFailed ? (
          <video
            ref={videoRef}
            src="/video/HeroVideo.mp4"
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Annual Lead By Example All Sides of Town cookout community video"
            className="absolute inset-0 w-full h-full object-contain"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <img
            src="/images/community/cookout-pavilion.svg"
            alt="Community cookout poster"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        {/* Clickable gradient overlay — toggles play/pause */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 cursor-pointer pointer-events-auto flex items-center justify-center"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)',
          }}
        >
          <div className={`transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full glass-effect-strong text-white/80">
              <Play size={40} className="ml-2" />
            </div>
          </div>
        </div>

        {/* Heading — top letterbox zone */}
        <div className="absolute top-6 sm:top-8 md:top-10 left-0 right-0 z-10 text-center px-6 pointer-events-none">
          <MagneticHeading
            text="OUR COMMUNITY IN MOTION"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.22em] text-white/50 uppercase pointer-events-auto"
          />
        </div>

        {/* Controls — bottom letterbox zone */}
        <div
          className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 md:right-14 z-20 flex items-center gap-2.5 px-3 py-2.5 rounded-2xl glass-effect-dark"
          role="group"
          aria-label="Video controls"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-white glass-button"
          >
            {isPlaying ? <Pause size={20} strokeWidth={1.75} /> : <Play size={20} strokeWidth={1.75} />}
          </button>

          <div className="w-px h-7 bg-white/12 flex-shrink-0" />

          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-white glass-button flex-shrink-0"
          >
            <VolumeIcon size={20} strokeWidth={1.75} />
          </button>

          <div className="flex items-center px-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={displayVol}
              onChange={handleVolume}
              aria-label="Volume"
              className="video-vol-slider w-28 sm:w-36"
              style={{ '--vol-pct': `${displayVol * 100}%` } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Event info card — straddles the bottom edge */}
      <div
        className="absolute bottom-0 left-8 md:left-14 z-20 w-[300px] md:w-[340px] pointer-events-auto"
        style={{ transform: 'translateY(33%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="glass-effect-dark p-5 rounded-2xl border-gold/20 border shadow-2xl"
        >
          <span className="text-[11px] font-medium text-gold border border-gold/30 bg-gold/10 rounded-full px-3 py-1 inline-block mb-2.5">
            ✦ 6th Annual · All Sides of Town
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-1">
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
                <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                {feature}
              </span>
            ))}
          </div>

          <div className="flex justify-center pt-1">
            <a
              href="mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Inquiry%20from%20Lead%20By%20Example%20Website"
              className="border border-gold/50 text-gold text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gold/10 transition-colors duration-200 inline-block"
            >
              Contact Founders
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
