'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Load Stripe outside component to avoid recreating on every render
// This is a performance optimization
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface StripeProviderProps {
  children: ReactNode;
}

export default function StripeProvider({ children }: StripeProviderProps) {
  // Customize Stripe Elements appearance to match Lead By Example brand
  const appearance: StripeElementsOptions['appearance'] = {
    theme: 'night',
    variables: {
      // Cape Verdean color palette
      colorPrimary: '#FFD700', // Gold accent
      colorBackground: '#4B306A', // Royal purple
      colorText: '#F6F6F6', // Light text
      colorDanger: '#FF6B6B', // Error red
      colorSuccess: '#10B981', // Success green

      // Typography
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSizeBase: '16px',
      fontWeightNormal: '400',
      fontWeightMedium: '500',
      fontWeightBold: '600',

      // Spacing and borders
      spacingUnit: '4px',
      borderRadius: '12px',

      // Input fields
      colorTextPlaceholder: 'rgba(246, 246, 246, 0.5)',
    },
    rules: {
      '.Input': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '12px 16px',
        boxShadow: 'none',
      },
      '.Input:focus': {
        border: '1px solid #FFD700',
        boxShadow: '0 0 0 3px rgba(255, 215, 0, 0.1)',
        outline: 'none',
      },
      '.Input--invalid': {
        border: '1px solid #FF6B6B',
      },
      '.Label': {
        color: '#F6F6F6',
        fontWeight: '500',
        marginBottom: '8px',
      },
      '.Error': {
        color: '#FF6B6B',
        fontSize: '14px',
        marginTop: '4px',
      },
    },
  };

  // If Stripe is not configured, render children without Stripe Elements
  if (!stripePromise) {
    console.warn('Stripe publishable key not configured. Stripe features will be disabled.');
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      {children}
    </Elements>
  );
}
