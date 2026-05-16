import { cn } from '@/utils/helpers';
import React, { forwardRef } from 'react';

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
      default: 'glass-effect',
      dark: 'glass-effect-dark',
      light: 'glass-effect-strong',
    };

    const baseClasses = cn(
      'rounded-2xl border transition-all duration-300 depth-3d',
      blurClasses[blur],
      variantClasses[variant],
      hover && 'hover-lift cursor-pointer',
      'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/8 before:to-transparent before:pointer-events-none',
      className
    );

    return (
      <div ref={ref} className={cn('relative', baseClasses)} {...props}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
