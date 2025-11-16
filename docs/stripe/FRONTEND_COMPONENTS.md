# Frontend Components Package
# Complete Stripe Integration for Lead By Example

This file contains all frontend components needed for the Stripe integration.
Create each file in your project as indicated below.

---

## 1. Type Definitions
## File: src/types/donation.ts

```typescript
export interface DonationFormData {
  amount: number;
  customAmount?: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  newsletter: boolean;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
}

export interface DonationButtonProps {
  onOpenDonation: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
}

export interface StripeProviderProps {
  children: React.ReactNode;
}
```

---

## 2. Stripe Provider Wrapper
## File: src/components/StripeProvider.tsx

```typescript
'use client';

import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

// Load Stripe outside component to avoid recreating on every render
// This is a performance optimization
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      {children}
    </Elements>
  );
}
```

---

## 3. Donate Button Component
## File: src/components/DonateButton.tsx

```typescript
'use client';

import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DonationButtonProps } from '@/types/donation';

export default function DonateButton({
  onOpenDonation,
  className = '',
  variant = 'primary',
  size = 'md',
}: DonationButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: `bg-gradient-to-r from-[#FFD700] to-[#E5C100] 
              text-[#4B306A] font-bold shadow-lg hover:shadow-xl`,
    outline: `bg-transparent border-2 border-[#FFD700] 
              text-[#FFD700] font-bold hover:bg-[#FFD700]/10`,
  };

  return (
    <motion.button
      onClick={onOpenDonation}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-xl transition-all
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      <Heart className="w-5 h-5" fill={variant === 'primary' ? 'currentColor' : 'none'} />
      <span>Donate Now</span>
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  );
}
```

---

## 4. Main Donation Modal Component
## File: src/components/DonationModal.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Heart, Loader2, CheckCircle, XCircle, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { DonationFormData, DonationModalProps } from '@/types/donation';

// Validation schema with Zod
const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1').max(999999, 'Maximum donation is $999,999'),
  donorName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  donorEmail: z.string().email('Invalid email address'),
  isAnonymous: z.boolean(),
  newsletter: z.boolean(),
});

// Preset donation amounts
const PRESET_AMOUNTS = [25, 50, 100, 250];

export default function DonationModal({
  isOpen,
  onClose,
  initialAmount = 50,
}: DonationModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(initialAmount);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: initialAmount,
      isAnonymous: false,
      newsletter: true,
    },
  });

  const isAnonymous = watch('isAnonymous');
  const currentAmount = watch('amount');

  // Create payment intent when amount is selected
  useEffect(() => {
    if (currentAmount && currentAmount >= 1 && !clientSecret && !isCreatingIntent) {
      // Only create intent if form is partially filled
      const email = watch('donorEmail');
      const name = watch('donorName');
      
      if (email || name) {
        createPaymentIntent({
          amount: currentAmount,
          donorName: name || 'Anonymous',
          donorEmail: email || 'temp@example.com',
          isAnonymous: false,
          newsletter: true,
        });
      }
    }
  }, [currentAmount]);

  // Create payment intent
  const createPaymentIntent = async (data: DonationFormData) => {
    setIsCreatingIntent(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: data.amount,
          donorName: data.isAnonymous ? 'Anonymous' : data.donorName,
          donorEmail: data.donorEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create payment intent');
      }

      const { clientSecret: secret } = await response.json();
      setClientSecret(secret);
    } catch (error: any) {
      console.error('Payment intent error:', error);
      setErrorMessage(error.message || 'Failed to initialize payment. Please try again.');
    } finally {
      setIsCreatingIntent(false);
    }
  };

  // Process payment
  const onSubmit = async (data: DonationFormData) => {
    if (!stripe || !elements) {
      setErrorMessage('Payment system not ready. Please refresh the page.');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('idle');
    setErrorMessage('');

    try {
      // Create payment intent if not already created
      const secret = clientSecret || (await createPaymentIntent(data));

      if (!secret) {
        throw new Error('Failed to initialize payment');
      }

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: secret,
        confirmParams: {
          return_url: `${window.location.origin}/donation-success`,
          receipt_email: data.donorEmail,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment error:', error);
        setPaymentStatus('error');
        setErrorMessage(error.message || 'Payment failed. Please try again.');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        
        // Close modal and refresh after success
        setTimeout(() => {
          onClose();
          // Optionally refresh page to update donation totals
          // window.location.reload();
        }, 3000);
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      setPaymentStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue('amount', amount);
    setShowCustomAmount(false);
    setClientSecret(null); // Reset client secret to create new intent
  };

  const handleCustomAmount = () => {
    setShowCustomAmount(true);
    setSelectedAmount(null);
    setClientSecret(null); // Reset client secret
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      // Reset state
      setPaymentStatus('idle');
      setErrorMessage('');
      setClientSecret(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-[#4B306A]/95 to-[#421B5A]/95 backdrop-blur-xl 
                         border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full 
                         my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#4B306A]/95 backdrop-blur-sm border-b border-white/10 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#E5C100] 
                                flex items-center justify-center shadow-lg"
                    >
                      <Heart className="w-6 h-6 text-[#4B306A]" fill="currentColor" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Support Our Mission</h2>
                      <p className="text-sm text-white/70">All Sides of Town Cookout 2025</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isProcessing}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                             flex items-center justify-center transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Success Message */}
                {paymentStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                      <div>
                        <p className="font-semibold text-green-400">Thank you for your donation!</p>
                        <p className="text-sm text-white/70">
                          Your support means everything to our community. You'll receive a receipt via email.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {(paymentStatus === 'error' || errorMessage) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-red-400">Payment Error</p>
                        <p className="text-sm text-white/70">{errorMessage || 'Please try again.'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Info Message */}
                <div className="bg-[#01514C]/20 border border-[#01514C]/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#01514C] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/80">
                      Your donation directly supports the All Sides of Town Cookout 2025, providing 
                      free food, haircuts, activities, and backpack giveaways for youth in our community.
                    </p>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="space-y-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#FFD700]" />
                    Select Donation Amount
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((amount) => (
                      <motion.button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedAmount === amount
                            ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700] shadow-lg'
                            : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                        }`}
                      >
                        <span className="text-2xl font-bold">${amount}</span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleCustomAmount}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      showCustomAmount
                        ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]'
                        : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                    }`}
                  >
                    Custom Amount
                  </motion.button>

                  {showCustomAmount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          max="999999"
                          {...register('amount', { valueAsNumber: true })}
                          placeholder="Enter amount"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 
                                   text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]
                                   focus:ring-2 focus:ring-[#FFD700]/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {errors.amount && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Your Information</h3>

                  <div>
                    <input
                      type="text"
                      {...register('donorName')}
                      placeholder="Full Name"
                      disabled={isAnonymous}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                               text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]
                               focus:ring-2 focus:ring-[#FFD700]/20
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {errors.donorName && !isAnonymous && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        {errors.donorName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      {...register('donorEmail')}
                      placeholder="Email Address (for receipt)"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                               text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]
                               focus:ring-2 focus:ring-[#FFD700]/20"
                    />
                    {errors.donorEmail && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        {errors.donorEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('isAnonymous')}
                        className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#FFD700] 
                                 focus:ring-[#FFD700] focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-white/80 group-hover:text-white transition-colors">
                        Make this donation anonymous
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('newsletter')}
                        className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#FFD700] 
                                 focus:ring-[#FFD700] focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-white/80 group-hover:text-white transition-colors">
                        Send me updates about Lead By Example
                      </span>
                    </label>
                  </div>
                </div>

                {/* Stripe Payment Element */}
                {clientSecret && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <h3 className="text-white font-semibold">Payment Information</h3>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <PaymentElement />
                    </div>
                  </motion.div>
                )}

                {isCreatingIntent && (
                  <div className="flex items-center justify-center gap-2 text-white/70">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Preparing payment...</span>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!stripe || isProcessing || paymentStatus === 'success' || !clientSecret}
                  whileHover={{ scale: !stripe || isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: !stripe || isProcessing ? 1 : 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#E5C100] 
                           text-[#4B306A] font-bold rounded-xl shadow-lg 
                           hover:shadow-xl transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : paymentStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Thank You!
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Complete Donation ${currentAmount?.toFixed(2) || '0.00'}
                    </>
                  )}
                </motion.button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-center text-sm text-white/50">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure payment powered by Stripe • All information encrypted
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-white/40">
                  Lead By Example is a 501(c)(3) nonprofit organization.
                  <br />
                  Your donation is tax-deductible to the extent allowed by law.
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Usage Example
## How to integrate into your index.tsx or Hero component

```typescript
'use client';

import { useState } from 'react';
import DonationModal from '@/components/DonationModal';
import DonateButton from '@/components/DonateButton';

export default function Hero() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <section className="hero-section">
      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        initialAmount={50}
      />

      {/* Your existing hero content */}
      <div className="hero-content">
        <h1>Support Our Mission</h1>
        
        {/* Primary CTA */}
        <DonateButton
          onOpenDonation={() => setIsDonationModalOpen(true)}
          variant="primary"
          size="lg"
        />

        {/* Or use outline variant */}
        <DonateButton
          onOpenDonation={() => setIsDonationModalOpen(true)}
          variant="outline"
          size="md"
        />
      </div>
    </section>
  );
}
```

---

## Installation Checklist

```bash
# 1. Install dependencies
npm install stripe @stripe/stripe-js @stripe/react-stripe-js micro
npm install -D @types/micro

# 2. Create type definitions
# Create: src/types/donation.ts (content above)

# 3. Create components
# Create: src/components/StripeProvider.tsx
# Create: src/components/DonateButton.tsx
# Create: src/components/DonationModal.tsx

# 4. Wrap app with StripeProvider
# Update: src/pages/_app.tsx

# 5. Integrate into your Hero/landing page
# Update: src/pages/index.tsx

# 6. Test locally
npm run dev
```

---

## Quick Integration Steps

1. **Copy type definitions** to `src/types/donation.ts`
2. **Copy StripeProvider** to `src/components/StripeProvider.tsx`
3. **Copy DonateButton** to `src/components/DonateButton.tsx`
4. **Copy DonationModal** to `src/components/DonationModal.tsx`
5. **Update _app.tsx** to wrap with StripeProvider
6. **Add DonateButton** to your hero section
7. **Add state management** for modal open/close
8. **Test with Stripe test cards**

---

End of Frontend Components Package
