'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LoadingProps } from '@/types/components';
import { cn } from '@/utils/cn';

const loadingSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const loadingColors = {
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  neutral: 'text-neutral-600'
};

const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  className
}) => {
  const sizeClass = loadingSizes[size];
  const colorClass = loadingColors[color];

  const renderSpinner = () => (
    <motion.div
      className={cn(
        'border-2 border-current border-t-transparent rounded-full',
        sizeClass,
        colorClass
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'rounded-full bg-current',
            size === 'xs' ? 'w-1 h-1' : 
            size === 'sm' ? 'w-1.5 h-1.5' :
            size === 'md' ? 'w-2 h-2' :
            size === 'lg' ? 'w-3 h-3' : 'w-4 h-4',
            colorClass
          )}
          animate={{
            y: [0, -8, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn(
        'rounded-full bg-current',
        sizeClass,
        colorClass
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );

  const renderSkeleton = () => (
    <div className={cn('space-y-3', className)}>
      <motion.div
        className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.div
        className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
    </div>
  );

  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      {renderLoading()}
      {text && (
        <motion.p
          className={cn('text-sm font-medium', colorClass)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Skeleton component for layout placeholders
const Skeleton: React.FC<{ className?: string; children?: React.ReactNode }> = ({
  className,
  children
}) => (
  <motion.div
    className={cn(
      'bg-neutral-200 dark:bg-neutral-700 rounded',
      className
    )}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

export { Loading, Skeleton };
export type { LoadingProps };
