'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '@/types/components';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
// Animations will be defined inline for now
// import { heroAnimations, createStaggerVariants } from '@/utils/animations';

const Hero: React.FC<HeroProps> = ({
  variant = 'default',
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  backgroundVideo,
  overlay = false,
  animations,
  className
}) => {
  const containerClasses = cn(
    'relative min-h-screen flex items-center justify-center',
    'px-4 sm:px-6 lg:px-8',
    variant === 'centered' && 'text-center',
    variant === 'split' && 'grid lg:grid-cols-2 gap-12 items-center',
    className
  );

  const contentClasses = cn(
    'relative z-10 max-w-4xl mx-auto',
    variant === 'split' && 'max-w-none'
  );

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const heroAnimations = {
    title: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
    },
    subtitle: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 }
    },
    description: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.6 }
    },
    actions: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.8 }
    },
    background: {
      initial: { scale: 1.1, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 1.2, ease: 'easeOut' }
    }
  };

  return (
    <section className={containerClasses}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <motion.img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            initial={heroAnimations.background.initial}
            animate={heroAnimations.background.animate}
            transition={heroAnimations.background.transition}
          />
          {overlay && (
            <div className="absolute inset-0 bg-black/50" />
          )}
        </div>
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <motion.video
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            initial={heroAnimations.background.initial}
            animate={heroAnimations.background.animate}
            transition={heroAnimations.background.transition}
          />
          {overlay && (
            <div className="absolute inset-0 bg-black/50" />
          )}
        </div>
      )}

      {/* Content */}
      <motion.div
        className={contentClasses}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {subtitle && (
          <motion.p
            className={cn(
              'text-sm font-semibold uppercase tracking-wide mb-4',
              backgroundImage || backgroundVideo 
                ? 'text-white/90' 
                : 'text-primary-600'
            )}
            variants={animations?.subtitle || heroAnimations.subtitle}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6',
            backgroundImage || backgroundVideo 
              ? 'text-white' 
              : 'text-neutral-900 dark:text-neutral-100'
          )}
          variants={animations?.title || heroAnimations.title}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className={cn(
              'text-lg sm:text-xl max-w-3xl mb-8',
              backgroundImage || backgroundVideo 
                ? 'text-white/90' 
                : 'text-neutral-600 dark:text-neutral-400',
              variant === 'centered' && 'mx-auto'
            )}
            variants={animations?.description || heroAnimations.description}
          >
            {description}
          </motion.p>
        )}

        {(primaryAction || secondaryAction) && (
          <motion.div
            className={cn(
              'flex flex-col sm:flex-row gap-4',
              variant === 'centered' && 'justify-center'
            )}
            variants={animations?.actions || heroAnimations.actions}
          >
            {primaryAction && (
              <Button
                variant={primaryAction.variant || 'primary'}
                size={primaryAction.size || 'lg'}
                href={primaryAction.href}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
            
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || 'outline'}
                size={secondaryAction.size || 'lg'}
                href={secondaryAction.href}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className={cn(
            'w-6 h-10 border-2 rounded-full flex justify-center',
            backgroundImage || backgroundVideo 
              ? 'border-white/50' 
              : 'border-neutral-300'
          )}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className={cn(
              'w-1 h-3 rounded-full mt-2',
              backgroundImage || backgroundVideo 
                ? 'bg-white/70' 
                : 'bg-neutral-400'
            )}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export { Hero };
export type { HeroProps };
