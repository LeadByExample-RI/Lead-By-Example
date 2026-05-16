'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import { BookOpen, Video, FileText, Headphones, Heart, Brain, Users, GraduationCap, Shield } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  gemColor: 'jade' | 'amethyst';
}

const sampleResources: ResourceItem[] = [
  {
    id: '1',
    title: 'Understanding Your Emotions',
    description: 'Learn healthy ways to identify, process, and express your emotions through practical exercises.',
    icon: <Heart className="w-8 h-8" />,
    category: 'Trauma Support',
    gemColor: 'jade',
  },
  {
    id: '2',
    title: 'From Streets to Success',
    description: 'Real stories of transformation, resilience, and hope from people who walked in your shoes.',
    icon: <Video className="w-8 h-8" />,
    category: 'Mental Health',
    gemColor: 'amethyst',
  },
  {
    id: '3',
    title: 'Building Healthy Relationships',
    description: 'Navigate friendships, family dynamics, and romantic relationships with healthy boundaries.',
    icon: <Users className="w-8 h-8" />,
    category: 'Life Skills',
    gemColor: 'jade',
  },
  {
    id: '4',
    title: 'Your Rights & Legal System',
    description: 'Know your rights and how to protect yourself when navigating law enforcement encounters.',
    icon: <Shield className="w-8 h-8" />,
    category: 'Legal',
    gemColor: 'amethyst',
  },
  {
    id: '5',
    title: 'Study Skills That Work',
    description: 'Practical strategies for improving grades, time management, and academic motivation.',
    icon: <GraduationCap className="w-8 h-8" />,
    category: 'Academic',
    gemColor: 'jade',
  },
  {
    id: '6',
    title: 'Mindfulness for Tough Times',
    description: 'Audio meditations and breathing exercises to manage stress, anxiety, and difficult emotions.',
    icon: <Brain className="w-8 h-8" />,
    category: 'Mental Health',
    gemColor: 'amethyst',
  },
  {
    id: '7',
    title: 'Financial Literacy Basics',
    description: 'Money management skills they don\'t teach in school - budgeting, banking, and planning.',
    icon: <FileText className="w-8 h-8" />,
    category: 'Life Skills',
    gemColor: 'jade',
  },
  {
    id: '8',
    title: 'Healing from Trauma',
    description: 'A compassionate guide to understanding trauma\'s effects and finding paths to healing.',
    icon: <Headphones className="w-8 h-8" />,
    category: 'Trauma Support',
    gemColor: 'amethyst',
  },
];

export function SaturnCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const rotationY = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const itemCount = sampleResources.length;
  const angleStep = 360 / itemCount;
  const radius = 400; // Distance from center

  // Auto-rotation animation
  useEffect(() => {
    if (!isHovered && !isDragging) {
      controls.start({
        rotateY: 360,
        transition: {
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, isDragging, controls]);

  // Handle drag to rotate
  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const sensitivity = 0.2;
    const newRotation = rotationY.get() + info.delta.x * sensitivity;
    rotationY.set(newRotation);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // Continue with inertia
    const velocity = info.velocity.x * 0.05;
    const currentRotation = rotationY.get();
    
    controls.start({
      rotateY: currentRotation + velocity,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
      },
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] perspective-[1200px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Atmospheric glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-verdean-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* 3D Carousel Track */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-0 h-0 preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          rotateY: rotationY,
        }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        {sampleResources.map((resource, index) => {
          const rotation = index * angleStep;
          const isJade = resource.gemColor === 'jade';
          
          return (
            <motion.div
              key={resource.id}
              className="absolute top-1/2 left-1/2 w-[300px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing backface-hidden"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              whileHover={{ scale: 1.05, z: radius + 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Chiseled Gem Tile */}
              <div 
                className={`
                  w-full h-full p-6 flex flex-col
                  ${isJade ? 'bg-[#01514C]/80' : 'bg-[#4B306A]/80'}
                  backdrop-blur-xl
                  border-t border-l border-b border-r
                  border-t-white/30 border-l-white/20 
                  border-b-black/40 border-r-black/40
                  shadow-2xl
                  transition-all duration-500
                `}
              >
                {/* Gem facet highlight */}
                <div 
                  className={`
                    absolute inset-0 pointer-events-none
                    bg-gradient-to-br from-white/20 via-transparent to-black/20
                    rounded-2xl
                  `}
                />
                
                {/* Inner chiseled edge */}
                <div 
                  className={`
                    absolute inset-[1px] rounded-2xl pointer-events-none
                    border border-t-white/10 border-l-white/5 
                    border-b-black/20 border-r-black/10
                  `}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with glow */}
                  <div className="mb-4">
                    <div 
                      className={`
                        inline-flex items-center justify-center w-16 h-16 rounded-xl
                        ${isJade ? 'bg-[#01514C]/80' : 'bg-[#4B306A]/80'}
                        border border-white/20
                        shadow-lg
                        ${isJade ? 'text-gold-300' : 'text-gold-300'}
                      `}
                    >
                      {resource.icon}
                    </div>
                  </div>

                  {/* Category badge */}
                  <span 
                    className={`
                      self-start px-3 py-1 rounded-full text-xs font-semibold mb-3
                      ${isJade ? 'bg-[#01514C]/30 text-gold-300' : 'bg-[#4B306A]/30 text-gold-300'}
                      border border-white/10
                    `}
                  >
                    {resource.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed flex-grow">
                    {resource.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gold-400">Resource Library</span>
                      <BookOpen className="w-4 h-4 text-gold-400" />
                    </div>
                  </div>
                </div>

                {/* Faceted corner highlights */}
                <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                  <div className="absolute top-2 left-2 w-8 h-[1px] bg-white/40 rotate-45 origin-left" />
                  <div className="absolute top-2 left-2 w-[1px] h-8 bg-white/40 rotate-45 origin-top" />
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                  <div className="absolute bottom-2 right-2 w-8 h-[1px] bg-black/30 rotate-45 origin-right" />
                  <div className="absolute bottom-2 right-2 w-[1px] h-8 bg-black/30 rotate-45 origin-bottom" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center decoration - the "planet" core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/10 backdrop-blur-md border border-gold-400/30 shadow-2xl" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm pointer-events-none">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Drag to rotate
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default SaturnCarousel;
