import React, { forwardRef } from 'react';
import { GlassButton, type GlassButtonProps } from './GlassButton';

export type ButtonVariant = 'gold' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps extends Omit<GlassButtonProps, 'variant'> {
  variant?: ButtonVariant;
}

const variantMap: Record<ButtonVariant, GlassButtonProps['variant']> = {
  gold: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gold', size = 'md', className, ...props }, ref) => {
    return (
      <GlassButton
        ref={ref}
        variant={variantMap[variant]}
        size={size}
        className={className}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
