# 🎨 Lead By Example - Component Library Reference

## Premium Glassmorphic UI Components

This document provides ready-to-use component code for the Lead By Example website, featuring glassmorphism, 3D effects, and premium micro-interactions in purple, black, and gold.

---

## Table of Contents

1. [Base Components](#base-components)
2. [Navigation Components](#navigation-components)
3. [Hero Components](#hero-components)
4. [Card Components](#card-components)
5. [Form Components](#form-components)
6. [Button Components](#button-components)
7. [Animation Components](#animation-components)

---

## 1. Base Components

### GlassCard.tsx

```tsx
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'purple' | 'gold';
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ 
  children, 
  variant = 'light',
  hover = true,
  glow = false,
  className,
  ...props 
}: GlassCardProps) => {
  const variants = {
    light: 'bg-white/10 border-white/20',
    dark: 'bg-black/30 border-white/10',
    purple: 'bg-purple-500/10 border-purple-400/30',
    gold: 'bg-yellow-500/10 border-yellow-400/30',
  };

  return (
    <motion.div
      className={cn(
        'relative backdrop-blur-xl rounded-2xl border p-6',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
        variants[variant],
        glow && 'before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-purple-500 before:to-gold-500 before:-z-10',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...(hover && {
        whileHover: {
          y: -8,
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)',
        }
      })}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

### Text3D.tsx

```tsx
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Text3DProps {
  children: ReactNode;
  variant?: 'gold' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export const Text3D = ({ 
  children, 
  variant = 'gold',
  size = 'xl',
  className 
}: Text3DProps) => {
  const sizeClasses = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl',
    '2xl': 'text-7xl md:text-8xl',
  };

  const goldShadow = `
    0 1px 0 #D97706,
    0 2px 0 #B45309,
    0 3px 0 #92400E,
    0 4px 0 #78350F,
    0 5px 10px rgba(0, 0, 0, 0.4),
    0 10px 20px rgba(0, 0, 0, 0.3)
  `;

  const purpleShadow = `
    0 1px 0 #7C3AED,
    0 2px 0 #6D28D9,
    0 3px 0 #5B21B6,
    0 4px 0 #4C1D95,
    0 5px 10px rgba(124, 58, 237, 0.4),
    0 10px 20px rgba(124, 58, 237, 0.3)
  `;

  return (
    <h1
      className={cn(
        'font-bold tracking-tight',
        sizeClasses[size],
        variant === 'gold' && 'text-yellow-400',
        variant === 'purple' && 'text-purple-400',
        className
      )}
      style={{
        textShadow: variant === 'gold' ? goldShadow : purpleShadow,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </h1>
  );
};
```

---

## 2. Navigation Components

### Header.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Mission', href: '/mission' },
    { label: 'Events', href: '/events' },
    { label: 'Impact', href: '/impact' },
    { label: 'About', href: '/about' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor }}
    >
      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-gold-500 to-purple-500"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            className="text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-yellow-400">Lead</span>
            <span className="text-purple-400"> By </span>
            <span className="text-yellow-400">Example</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group text-white hover:text-yellow-400 transition-colors"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-gold-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          
          <Link href="/donate">
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Donate
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white z-50"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: '100%' }
          }}
          className="fixed inset-0 md:hidden bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-white hover:text-yellow-400 transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          
          <Link href="/donate" onClick={() => setIsOpen(false)}>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now
            </motion.button>
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  );
};
```

---

## 3. Hero Components

### Hero.tsx

```tsx
'use client';

import { motion } from 'framer-motion';
import { Text3D } from '@/components/ui/Text3D';
import { ChevronDown } from 'lucide-react';
import { ParticleBackground } from '@/components/animations/ParticleBackground';

export const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/30 to-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <Text3D variant="gold" size="2xl">
              LEAD BY
            </Text3D>
            <Text3D variant="purple" size="2xl">
              EXAMPLE
            </Text3D>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl md:text-3xl text-gray-200 font-light tracking-wide"
          >
            Inspiring Change Through Action
          </motion.p>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <p className="text-xl md:text-2xl font-semibold text-yellow-400">
              End the school to prison pipeline
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full text-lg shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Support Our Mission
            </motion.button>

            <motion.button
              className="px-8 py-4 backdrop-blur-xl bg-white/10 border-2 border-purple-400 text-white font-bold rounded-full text-lg"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: 'rgba(245, 158, 11, 0.8)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={40} />
        </motion.button>
      </div>
    </section>
  );
};
```

### ParticleBackground.tsx

```tsx
'use client';

import { useRef, useEffect } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        // Alternate between purple and gold
        this.color = Math.random() > 0.5 
          ? 'rgba(167, 139, 250, 0.8)'  // Purple
          : 'rgba(245, 158, 11, 0.8)';  // Gold
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity: 0.6 }}
    />
  );
};
```

---

## 4. Card Components

### ImpactCard.tsx

```tsx
'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { LucideIcon } from 'lucide-react';

interface ImpactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: string;
  index: number;
}

export const ImpactCard = ({ 
  icon: Icon, 
  title, 
  description, 
  stat,
  index 
}: ImpactCardProps) => {
  return (
    <GlassCard
      variant="dark"
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-gold-500 flex items-center justify-center mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon size={32} className="text-white" />
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-4">
        {description}
      </p>

      {/* Stat */}
      {stat && (
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-gold-400">
          {stat}
        </div>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-gold-500/0 group-hover:from-purple-500/10 group-hover:to-gold-500/10 transition-all duration-300 pointer-events-none" />
    </GlassCard>
  );
};
```

---

## 5. Form Components

### DonationForm.tsx

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Heart, Check } from 'lucide-react';

const donationAmounts = [25, 50, 100, 250, 500];

export const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonate = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
  };

  return (
    <GlassCard variant="dark" className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">Support Our Mission</h2>
              <p className="text-gray-300">Every dollar helps end the school-to-prison pipeline</p>
            </div>

            {/* Amount Selection */}
            <div className="grid grid-cols-3 gap-4">
              {donationAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`
                    p-4 rounded-xl font-bold text-lg transition-all
                    ${selectedAmount === amount
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ${amount}
                </motion.button>
              ))}

              {/* Custom Amount */}
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            </div>

            {/* Donor Info */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleDonate}
              disabled={isProcessing || (!selectedAmount && !customAmount)}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="inline-block"
                >
                  <Heart className="animate-pulse" />
                </motion.div>
              ) : (
                <>
                  <Heart className="inline mr-2" />
                  Donate Now
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-gold-500 flex items-center justify-center mx-auto"
            >
              <Check size={48} className="text-white" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white">Thank You!</h3>
            <p className="text-xl text-gray-300">
              Your donation of ${selectedAmount || customAmount} will make a real difference
            </p>
            
            <motion.button
              onClick={() => {
                setIsSuccess(false);
                setSelectedAmount(null);
                setCustomAmount('');
              }}
              className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Make Another Donation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};
```

---

## 6. Button Components

### CTAButton.tsx

```tsx
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export const CTAButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...props 
}: CTAButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-2xl hover:shadow-yellow-500/50',
    secondary: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50',
    outline: 'bg-white/10 border-2 border-purple-400 text-white hover:bg-purple-500/20 hover:border-yellow-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={cn(
        'font-bold rounded-full backdrop-blur-xl flex items-center gap-2 justify-center transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && (
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.button>
  );
};
```

---

## 7. Animation Components

### ScrollReveal.tsx

```tsx
'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ScrollReveal = ({ 
  children, 
  delay = 0,
  direction = 'up',
  className 
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directions = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 50 },
    right: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      ref={ref}
      initial={directions[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

### CountUpStats.tsx

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp = ({ 
  end, 
  duration = 2,
  prefix = '',
  suffix = '',
  className 
}: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ scale: 0.5 }}
      animate={isInView ? { scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};
```

---

## Utility Functions

### utils.ts

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const easeInOutCubic = (t: number) => {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const smoothScroll = (target: string | number) => {
  const element = typeof target === 'string' 
    ? document.querySelector(target)
    : target;
    
  if (typeof element === 'number') {
    window.scrollTo({ top: element, behavior: 'smooth' });
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
```

---

## Custom Hooks

### useScrollProgress.ts

```typescript
'use client';

import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
```

### useMediaQuery.ts

```typescript
'use client';

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
```

---

## Global Styles

### globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --purple-primary: 124 58 237;
    --purple-light: 167 139 250;
    --purple-dark: 91 33 182;
    
    --gold-primary: 245 158 11;
    --gold-light: 252 211 77;
    --gold-dark: 217 119 6;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-black text-white;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .glass-morphic {
    @apply backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  .text-gradient-gold {
    @apply bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent;
  }

  .text-gradient-purple {
    @apply bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent;
  }
}

@layer utilities {
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  
  .animation-delay-600 {
    animation-delay: 600ms;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0F0F0F;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgb(124, 58, 237) 0%, rgb(245, 158, 11) 100%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgb(167, 139, 250) 0%, rgb(252, 211, 77) 100%);
}
```

---

## Usage Examples

### Complete Page Example

```tsx
// app/page.tsx
import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Impact } from '@/components/sections/Impact';
import { Events } from '@/components/sections/Events';
import { DonationForm } from '@/components/forms/DonationForm';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      
      <ScrollReveal>
        <Mission />
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <Impact />
      </ScrollReveal>
      
      <ScrollReveal delay={0.4}>
        <Events />
      </ScrollReveal>
      
      <ScrollReveal delay={0.6}>
        <section className="py-20 px-4">
          <DonationForm />
        </section>
      </ScrollReveal>
    </main>
  );
}
```

---

**Document Version**: 1.0  
**Created**: October 19, 2025  
**Created By**: StrayDog Syndications LLC
