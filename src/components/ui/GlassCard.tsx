import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'strong'
  hover?: boolean
  animate?: boolean
}

const variants = {
  default: 'bg-white/10 backdrop-blur-md border border-white/20',
  subtle: 'bg-white/5 backdrop-blur-sm border border-white/10',
  strong: 'bg-white/20 backdrop-blur-lg border border-white/30',
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'default',
  hover = true,
  animate = true,
  ...props 
}: GlassCardProps) {
  const baseClasses = cn(
    'rounded-2xl shadow-soft',
    variants[variant],
    hover && 'transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-medium',
    className
  )

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  )
}