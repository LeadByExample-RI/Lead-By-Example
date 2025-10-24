import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'light';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', blur = 'md', hover = true, children, ...props }, ref) => {
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    };

    const variantClasses = {
      default: 'bg-white/10 border-white/20 shadow-glass',
      dark: 'bg-black/20 border-white/10 shadow-glass-dark',
      light: 'bg-white/15 border-white/30 shadow-medium',
    };

    const baseClasses = cn(
      'rounded-xl border transition-all duration-300',
      blurClasses[blur],
      variantClasses[variant],
      hover && 'hover:scale-105 hover:shadow-xl hover-lift',
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };