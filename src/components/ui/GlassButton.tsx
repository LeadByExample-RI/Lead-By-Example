import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  animate?: boolean
}

const variants = {
  primary: 'bg-primary-500/80 hover:bg-primary-500/90 text-white border-primary-400/50 hover:border-primary-400/70',
  secondary: 'bg-secondary-500/80 hover:bg-secondary-500/90 text-white border-secondary-400/50 hover:border-secondary-400/70',
  outline: 'bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50',
  ghost: 'bg-transparent hover:bg-white/10 text-white border-transparent hover:border-white/20',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function GlassButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  animate = true,
  disabled,
  ...props
}: GlassButtonProps) {
  const baseClasses = cn(
    'relative rounded-xl font-medium backdrop-blur-md border transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )

  const ButtonComponent = animate ? motion.button : 'button'
  const motionProps = animate ? {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' }
  } : {}

  return (
    <ButtonComponent
      className={baseClasses}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={cn('flex items-center justify-center gap-2', loading && 'opacity-0')}>
        {children}
      </span>
    </ButtonComponent>
  )
}