import { cn } from '@/utils/helpers';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Badge component for status indicators and labels
 *
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 */
export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-500/20 text-slate-300 border-slate-400/30',
    success: 'bg-success-500/20 text-success-300 border-success-400/30',
    warning: 'bg-warning-500/20 text-warning-300 border-warning-400/30',
    error: 'bg-error-500/20 text-error-300 border-error-400/30',
    info: 'bg-primary-500/20 text-primary-300 border-primary-400/30',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        'backdrop-blur-sm',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
