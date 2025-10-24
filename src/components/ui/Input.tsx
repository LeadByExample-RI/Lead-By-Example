'use client';

import React from 'react';
import { cn } from '@/utils/helpers';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Input component with label, error states, and helper text
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Invalid email"
 * />
 */
export function Input({
  label,
  error,
  helperText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-white">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        
        <input
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white/10 backdrop-blur-sm',
            'border border-white/20',
            'text-white placeholder:text-white/50',
            'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent',
            'transition-all duration-200',
            error && 'border-error-500 focus:ring-error-500',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <span className="text-sm text-error-400">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span className="text-sm text-white/60">
          {helperText}
        </span>
      )}
    </div>
  );
}
