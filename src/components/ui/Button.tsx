'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ButtonProps } from '@/types/components';
import { cn } from '@/utils/cn';
// Animation will be added inline for now
// import { microAnimations } from '@/utils/animations';

const buttonVariants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:hover:bg-primary-950',
  ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:hover:bg-primary-950',
  link: 'text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500'
};

const buttonSizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className,
    href,
    target,
    onClick,
    type = 'button',
    ...props
  }, ref) => {
    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      
      // Variant styles
      variant !== 'link' && 'rounded-lg shadow-sm',
      buttonVariants[variant],
      
      // Size styles
      buttonSizes[size],
      
      // Full width
      fullWidth && 'w-full',
      
      // Loading state
      loading && 'cursor-wait',
      
      className
    );

    const content = (
      <>
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : leftIcon ? (
          <span className="w-4 h-4 flex-shrink-0">{leftIcon}</span>
        ) : null}
        
        {children}
        
        {!loading && rightIcon && (
          <span className="w-4 h-4 flex-shrink-0">{rightIcon}</span>
        )}
      </>
    );

    const MotionComponent = motion.button;

    if (href && !disabled && !loading) {
      return (
        <Link href={href} target={target} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <MotionComponent
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={baseClasses}
        whileHover={!disabled && !loading ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.98, transition: { duration: 0.1 } } : undefined}
        {...props}
      >
        {content}
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
