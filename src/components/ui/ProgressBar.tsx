import { cn } from '@/utils/helpers';
import React, { forwardRef } from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning';
  showPercentage?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = 'default',
      showPercentage = true,
      animated = true,
      size = 'md',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    };

    const variantClasses = {
      default: 'bg-gradient-to-r from-accent-500 to-accent-400 shadow-lg shadow-accent-500/30',
      success: 'bg-gradient-to-r from-accent-500 to-accent-400 shadow-lg shadow-accent-500/30',
      warning: 'bg-gradient-to-r from-accent-600 to-accent-500 shadow-lg shadow-accent-500/30',
    };

    const baseClasses = cn(
      'w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 shadow-inner',
      sizeClasses[size],
      className
    );

    const fillClasses = cn(
      'h-full rounded-full transition-all duration-500 ease-out relative',
      variantClasses[variant],
      animated && 'animate-progress-fill',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer'
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        <div
          className={fillClasses}
          style={
            {
              width: `${percentage}%`,
              '--progress-width': `${percentage}%`,
            } as React.CSSProperties
          }
        />
        {showPercentage && (
          <span className="ml-3 min-w-[3rem] text-right text-sm font-medium text-white">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
