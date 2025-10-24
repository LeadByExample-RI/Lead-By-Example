'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '@/types/components';
import { cn } from '@/utils/cn';
// Animation will be added inline for now
// import { microAnimations } from '@/utils/animations';

const cardVariants = {
  elevated: 'bg-white dark:bg-neutral-800 shadow-soft border border-neutral-200 dark:border-neutral-700',
  outlined: 'bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700',
  filled: 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
  unstyled: ''
};

const cardPadding = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
};

const cardRadius = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};

const cardShadow = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'elevated',
    padding = 'md',
    radius = 'lg',
    shadow = 'none',
    interactive = false,
    children,
    className,
    onClick,
    ...props
  }, ref) => {
    const cardClasses = cn(
      // Base styles
      'transition-all duration-200',
      
      // Variant styles
      cardVariants[variant],
      
      // Padding
      cardPadding[padding],
      
      // Border radius
      cardRadius[radius],
      
      // Shadow (only if not using elevated variant which has its own shadow)
      variant !== 'elevated' && cardShadow[shadow],
      
      // Interactive styles
      interactive && 'cursor-pointer',
      
      className
    );

    if (interactive || onClick) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          onClick={onClick}
          whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)', transition: { duration: 0.2 } }}
          whileTap={{ y: 0, transition: { duration: 0.1 } }}
          role={onClick ? 'button' : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={onClick ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          } : undefined}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components for better composition
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-100', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-600 dark:text-neutral-400', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-0', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
};
export type { CardProps };
