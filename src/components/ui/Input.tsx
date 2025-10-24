'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InputProps } from '@/types/components';
import { cn } from '@/utils/cn';
// Animation will be added inline for now
// import { microAnimations } from '@/utils/animations';

const inputVariants = {
  default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
  filled: 'bg-neutral-100 border-transparent focus:bg-white focus:border-primary-500 focus:ring-primary-500',
  flushed: 'border-0 border-b-2 border-neutral-300 rounded-none focus:border-primary-500 focus:ring-0 px-0',
  unstyled: 'border-0 focus:ring-0 p-0'
};

const inputSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base'
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    type = 'text',
    size = 'md',
    variant = 'default',
    placeholder,
    label,
    helperText,
    errorMessage,
    required = false,
    disabled = false,
    readOnly = false,
    leftElement,
    rightElement,
    className,
    id,
    name,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const inputId = id || name || generatedId;
    const hasError = Boolean(errorMessage);

    const inputClasses = cn(
      // Base styles
      'w-full transition-all duration-200 placeholder:text-neutral-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'read-only:bg-neutral-50 read-only:cursor-default',
      
      // Variant styles
      variant !== 'unstyled' && 'border rounded-lg',
      inputVariants[variant],
      
      // Size styles
      inputSizes[size],
      
      // Error state
      hasError && variant !== 'unstyled' && 'border-error-500 focus:border-error-500 focus:ring-error-500',
      
      // Left/right elements padding
      leftElement && 'pl-10',
      rightElement && 'pr-10',
      
      className
    );

    const containerClasses = cn(
      'relative',
      disabled && 'opacity-50'
    );

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-neutral-700 dark:text-neutral-300',
              required && "after:content-['*'] after:ml-0.5 after:text-error-500"
            )}
          >
            {label}
          </label>
        )}
        
        <div className={containerClasses}>
          {leftElement && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400 w-4 h-4">{leftElement}</span>
            </div>
          )}
          
          <motion.input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            className={inputClasses}
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
            aria-invalid={hasError}
            aria-describedby={
              helperText || errorMessage 
                ? `${inputId}-description` 
                : undefined
            }
            {...props}
          />
          
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-neutral-400 w-4 h-4">{rightElement}</span>
            </div>
          )}
        </div>
        
        {(helperText || errorMessage) && (
          <p
            id={`${inputId}-description`}
            className={cn(
              'text-xs',
              hasError ? 'text-error-600' : 'text-neutral-500'
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
