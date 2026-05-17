'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';

export interface MotionGlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'dark' | 'light' | 'amethyst' | 'transparent';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const variantClasses = {
  default: 'bg-[#080b12]/40 border-white/10',
  dark: 'bg-[#080b12]/55 border-white/10',
  light: 'bg-white/15 border-white/20',
  amethyst: 'bg-[#4B306A]/95 border-white/20',
  transparent: 'bg-white/10 border-white/20',
};

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export function MotionGlassCard({
  className,
  variant = 'default',
  blur = 'xl',
  hover = false,
  children,
  ...props
}: MotionGlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-2xl transition-all duration-300',
        blurClasses[blur],
        variantClasses[variant],
        hover && 'hover:scale-[1.02] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
