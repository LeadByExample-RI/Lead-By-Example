import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning';
  showPercentage?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
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
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    };

    const variantClasses = {
      default: 'bg-accent-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
    };

    const baseClasses = cn(
      'w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10',
      sizeClasses[size],
      className
    );

    const fillClasses = cn(
      'h-full rounded-full transition-all duration-500 ease-out',
      variantClasses[variant],
      animated && 'animate-progress-fill'
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
          style={{ 
            width: `${percentage}%`,
            '--progress-width': `${percentage}%` 
          } as React.CSSProperties}
        />
        {showPercentage && (
          <span className="ml-3 text-sm font-medium text-white min-w-[3rem] text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };