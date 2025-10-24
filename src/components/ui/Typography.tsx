import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
  children: React.ReactNode;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, gradient = false, children, ...props }, ref) => {
    const baseClasses = cn(
      'font-bold text-balance',
      gradient && 'gradient-text',
      className
    );

    const sizeClasses = {
      1: 'text-4xl md:text-5xl lg:text-6xl',
      2: 'text-3xl md:text-4xl lg:text-5xl',
      3: 'text-2xl md:text-3xl lg:text-4xl',
      4: 'text-xl md:text-2xl lg:text-3xl',
      5: 'text-lg md:text-xl lg:text-2xl',
      6: 'text-base md:text-lg lg:text-xl',
    };

    const combinedClasses = cn(baseClasses, sizeClasses[level]);

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
      <Tag
        ref={ref}
        className={combinedClasses}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  gradient?: boolean;
  children: React.ReactNode;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = 'base', weight = 'normal', gradient = false, children, ...props }, ref) => {
    const baseClasses = cn(
      'text-balance',
      gradient && 'gradient-text',
      className
    );

    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const weightClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const combinedClasses = cn(
      baseClasses,
      sizeClasses[size],
      weightClasses[weight]
    );

    return (
      <p
        ref={ref}
        className={combinedClasses}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export { Heading, Text };