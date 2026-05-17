'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { ResourceItem } from '@/data/siteContent';
import GemTile from './GemTile';

// ─── Ring Physics Constants ───────────────────────────────────────────────────

const RADIUS = 550;

// ─── Main SaturnCarousel Component ────────────────────────────────────────────

export default function SaturnCarousel({ items }: { items: ResourceItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const dragStartRef = useRef(0);
  const prevLengthRef = useRef(items.length);
  const axleControls = useAnimation();

  const itemCount = items.length || 1;
  const angleStep = 360 / itemCount;
  const targetRotationY = currentIndex * -angleStep;

  // Reset to first tile whenever the item list length changes (e.g. after filtering)
  useEffect(() => {
    if (items.length !== prevLengthRef.current) {
      setCurrentIndex(0);
      prevLengthRef.current = items.length;
    }
  }, [items.length]);

  // High-responsiveness spring — stiffness:140 / damping:26 / mass:1.2
  useEffect(() => {
    axleControls.start({
      rotateY: targetRotationY,
      transition: { type: 'spring', stiffness: 140, damping: 26, mass: 1.2 },
    });
  }, [currentIndex, targetRotationY, axleControls]);

  // Auto-advance every 5 s; pauses while user interacts
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
      {/* Camera axle — 1×1 anchor; all 3D children rotate around it */}
      <motion.div
        className="absolute w-[1px] h-[1px] cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
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
            axleControls.start({
              rotateY: targetRotationY,
              transition: { type: 'spring', stiffness: 180, damping: 30, mass: 1.2 },
            });
          }
        }}
      >
        {/* Radial tile ring */}
        {items.map((item, index) => (
          <div
            key={item.id}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotateY(${index * angleStep}deg) translateZ(${RADIUS}px)`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <GemTile item={item} />
          </div>
        ))}
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
