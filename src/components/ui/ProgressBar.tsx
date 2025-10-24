import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  label?: string
  animate?: boolean
  variant?: 'default' | 'gradient' | 'glass'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  default: 'bg-primary-500',
  gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500',
  glass: 'bg-white/30 backdrop-blur-sm',
}

const sizes = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  label,
  animate = true,
  variant = 'gradient',
  size = 'md',
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setDisplayValue(percentage)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(percentage)
    }
  }, [percentage, animate])

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white/90">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium text-white/70">
            {Math.round(displayValue)}%
          </span>
        </div>
      )}
      
      <div className={cn(
        'w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm',
        sizes[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            variants[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: animate ? 1.5 : 0,
            ease: 'easeOut',
            delay: animate ? 0.2 : 0,
          }}
          style={{
            boxShadow: variant === 'gradient' 
              ? '0 0 10px rgba(255, 215, 0, 0.3)' 
              : undefined
          }}
        />
      </div>
    </div>
  )
}