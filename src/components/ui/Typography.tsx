import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  animate?: boolean
  gradient?: boolean
}

interface TextProps {
  children: React.ReactNode
  variant?: 'body' | 'lead' | 'small' | 'muted'
  className?: string
  animate?: boolean
}

const headingStyles = {
  1: 'text-4xl md:text-6xl font-bold tracking-tight',
  2: 'text-3xl md:text-5xl font-bold tracking-tight',
  3: 'text-2xl md:text-4xl font-semibold tracking-tight',
  4: 'text-xl md:text-3xl font-semibold tracking-tight',
  5: 'text-lg md:text-2xl font-medium tracking-tight',
  6: 'text-base md:text-xl font-medium tracking-tight',
}

const textStyles = {
  body: 'text-base leading-relaxed',
  lead: 'text-lg md:text-xl leading-relaxed font-medium',
  small: 'text-sm leading-relaxed',
  muted: 'text-sm leading-relaxed opacity-70',
}

export function Heading({ 
  children, 
  level = 1, 
  className, 
  animate = false,
  gradient = false,
  ...props 
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const baseClasses = cn(
    headingStyles[level],
    gradient && 'bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent',
    className
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Tag className={baseClasses} {...props}>
          {children}
        </Tag>
      </motion.div>
    )
  }

  return (
    <Tag className={baseClasses} {...props}>
      {children}
    </Tag>
  )
}

export function Text({ 
  children, 
  variant = 'body', 
  className, 
  animate = false,
  ...props 
}: TextProps) {
  const baseClasses = cn(textStyles[variant], className)

  if (animate) {
    return (
      <motion.p
        className={baseClasses}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        {...props}
      >
        {children}
      </motion.p>
    )
  }

  return (
    <p className={baseClasses} {...props}>
      {children}
    </p>
  )
}