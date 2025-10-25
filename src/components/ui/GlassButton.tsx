import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
      primary: 'bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-bold hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-500/30',
      secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold hover:from-secondary-600 hover:to-secondary-700 shadow-lg shadow-secondary-500/30',
      outline: 'border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/40',
      ghost: 'text-white hover:bg-white/15 border border-white/10',
    };

    const baseClasses = cn(
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus-ring',
      'backdrop-blur-md shadow-glass depth-3d',
      'hover-lift active:scale-95',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
      sizeClasses[size],
      variantClasses[variant],
      loading && 'cursor-wait',
      className
    );

    const renderIcon = () => {
      if (!icon) return null;
      
      const iconClasses = cn(
        'transition-transform duration-300',
        iconPosition === 'right' && 'group-hover:translate-x-1',
        iconPosition === 'left' && 'group-hover:-translate-x-1'
      );

      return <span className={iconClasses}>{icon}</span>;
    };

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!loading && iconPosition === 'left' && renderIcon()}
        
        <span className={loading ? 'opacity-70' : ''}>
          {children}
        </span>
        
        {!loading && iconPosition === 'right' && renderIcon()}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export { GlassButton };