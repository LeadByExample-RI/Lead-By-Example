# 🎯 Stripe Payment Integration Guide
## Lead By Example - Complete Implementation

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Dependencies & Setup](#phase-1-dependencies--setup)
4. [Phase 2: Environment Configuration](#phase-2-environment-configuration)
5. [Phase 3: Backend API Routes](#phase-3-backend-api-routes)
6. [Phase 4: Frontend Components](#phase-4-frontend-components)
7. [Phase 5: Integration with Existing Code](#phase-5-integration-with-existing-code)
8. [Phase 6: Testing](#phase-6-testing)
9. [Phase 7: Deployment](#phase-7-deployment)
10. [Troubleshooting](#troubleshooting)

---

## Overview

**What We're Building:**
- Secure Stripe payment integration for donations
- Custom donation amounts + preset options ($25, $50, $100, $250)
- Real-time payment processing
- Webhook handling for payment confirmations
- Glassmorphic UI matching existing design
- Mobile-responsive donation modal

**Tech Stack:**
- Stripe API (v12+)
- Next.js 14 API Routes
- TypeScript for type safety
- React Hook Form + Zod validation
- Framer Motion animations

**Security Features:**
- Server-side payment processing
- Environment variable protection
- Webhook signature verification
- PCI compliance through Stripe Elements

---

## Prerequisites

**Before Starting:**
- [ ] Active Stripe account (free at stripe.com)
- [ ] VS Code installed
- [ ] Node.js 18+ installed
- [ ] Project cloned and dependencies installed
- [ ] Basic understanding of Next.js API routes

**Get Your Stripe Keys:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Save these for Phase 2

---

## Phase 1: Dependencies & Setup

### Step 1.1: Install Required Packages

Open VS Code terminal (Ctrl+` or Cmd+`) and run:

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

**What each package does:**
- `stripe` - Server-side Stripe SDK (for API routes)
- `@stripe/stripe-js` - Client-side Stripe.js loader
- `@stripe/react-stripe-js` - React components for Stripe Elements

### Step 1.2: Verify Installation

Check `package.json` to confirm these appear in dependencies:

```json
"dependencies": {
  "@stripe/react-stripe-js": "^2.4.0",
  "@stripe/stripe-js": "^2.4.0",
  "stripe": "^14.9.0",
  // ... existing dependencies
}
```

---

## Phase 2: Environment Configuration

### Step 2.1: Update `.env.example`

Open `.env.example` and add Stripe variables:

```bash
# =============================================================================
# STRIPE PAYMENT CONFIGURATION
# =============================================================================

# Stripe Publishable Key (Safe for client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Stripe Secret Key (Server-side only - NEVER expose to client)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Webhook Secret (For webhook signature verification)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe API Version (Optional - defaults to latest)
STRIPE_API_VERSION=2023-10-16
```

### Step 2.2: Update `.env.local`

Copy the same content to `.env.local` with your actual keys:

```bash
# NEVER commit this file to Git!
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51A...
STRIPE_SECRET_KEY=sk_test_51A...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 2.3: Verify `.gitignore`

Ensure `.env.local` is in `.gitignore`:

```bash
# local env files
.env*.local
.env
```

✅ **Safety Check:** Never commit API keys to Git!

---

## Phase 3: Backend API Routes

### Step 3.1: Create API Directory Structure

Create new folders in your project:

```
src/
└── pages/
    └── api/
        ├── stripe/
        │   ├── create-payment-intent.ts  ← NEW
        │   └── webhook.ts                ← NEW
        └── (existing files)
```

### Step 3.2: Create Payment Intent Endpoint

**File:** `src/pages/api/stripe/create-payment-intent.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, donorName, donorEmail } = req.body;

    // Validation
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        donorName: donorName || 'Anonymous',
        donorEmail,
        campaign: 'All Sides of Town Cookout 2025',
        organization: 'Lead By Example',
      },
      description: `Donation to Lead By Example - ${donorName || 'Anonymous'}`,
      receipt_email: donorEmail,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    res.status(500).json({
      error: 'Payment processing failed',
      message: error.message,
    });
  }
}
```

### Step 3.3: Create Webhook Handler

**File:** `src/pages/api/stripe/webhook.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Disable body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('✅ Payment succeeded:', {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        donor: paymentIntent.metadata.donorName,
      });
      
      // TODO: Update your database with successful payment
      // Example: await updateDonationTotal(paymentIntent.amount);
      
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.error('❌ Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
```

### Step 3.4: Install `micro` Package

The webhook needs the `micro` package for buffer handling:

```bash
npm install micro
npm install -D @types/micro
```

---

## Phase 4: Frontend Components

### Step 4.1: Create Donation Types

**File:** `src/types/donation.ts`

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
}

export interface DonationButtonProps {
  onOpenDonation: () => void;
  className?: string;
}
```

### Step 4.2: Create Stripe Provider Wrapper

**File:** `src/components/StripeProvider.tsx`

```typescript
'use client';

import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside component to avoid recreating on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeProviderProps {
  children: ReactNode;
}

export default function StripeProvider({ children }: StripeProviderProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#FFD700', // Gold accent
            colorBackground: '#4B306A', // Royal purple
            colorText: '#F6F6F6', // Light text
            colorDanger: '#FF6B6B',
            borderRadius: '12px',
            fontFamily: 'system-ui, sans-serif',
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
```

### Step 4.3: Create Donation Modal Component

**File:** `src/components/DonationModal.tsx`

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Heart, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { DonationFormData } from '@/types/donation';

// Validation schema
const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1'),
  donorName: z.string().min(2, 'Name must be at least 2 characters'),
  donorEmail: z.string().email('Invalid email address'),
  isAnonymous: z.boolean(),
  newsletter: z.boolean(),
});

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 250];

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 50,
      isAnonymous: false,
      newsletter: true,
    },
  });

  const isAnonymous = watch('isAnonymous');

  // Step 1: Create payment intent
  const createPaymentIntent = async (data: DonationFormData) => {
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
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
      return clientSecret;
    } catch (error) {
      console.error('Payment intent error:', error);
      throw error;
    }
  };

  // Step 2: Process payment
  const onSubmit = async (data: DonationFormData) => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentStatus('idle');

    try {
      // Create payment intent if not already created
      const secret = clientSecret || (await createPaymentIntent(data));

      // Confirm payment
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
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          // Optionally refresh page to update donation total
          // window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue('amount', amount);
    setShowCustomAmount(false);
  };

  const handleCustomAmount = () => {
    setShowCustomAmount(true);
    setSelectedAmount(null);
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-[#4B306A]/90 to-[#421B5A]/90 backdrop-blur-xl 
                         border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full 
                         max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#4B306A]/95 backdrop-blur-sm border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#E5C100] 
                                    flex items-center justify-center">
                      <Heart className="w-5 h-5 text-[#4B306A]" fill="currentColor" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Support Our Mission</h2>
                      <p className="text-sm text-white/70">All Sides of Town Cookout 2025</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                               flex items-center justify-center transition-colors"
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
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-400">Thank you for your donation!</p>
                        <p className="text-sm text-white/70">Your support means everything to our community.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {paymentStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-4"
                  >
                    <p className="text-red-400">Payment failed. Please try again.</p>
                  </motion.div>
                )}

                {/* Amount Selection */}
                <div className="space-y-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#FFD700]" />
                    Select Donation Amount
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedAmount === amount
                            ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]'
                            : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                        }`}
                      >
                        <span className="text-2xl font-bold">${amount}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleCustomAmount}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      showCustomAmount
                        ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]'
                        : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                    }`}
                  >
                    Custom Amount
                  </button>

                  {showCustomAmount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <input
                        type="number"
                        {...register('amount', { valueAsNumber: true })}
                        placeholder="Enter custom amount"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                                 text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]"
                      />
                    </motion.div>
                  )}

                  {errors.amount && (
                    <p className="text-red-400 text-sm">{errors.amount.message}</p>
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
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {errors.donorName && (
                      <p className="text-red-400 text-sm mt-1">{errors.donorName.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      {...register('donorEmail')}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                               text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]"
                    />
                    {errors.donorEmail && (
                      <p className="text-red-400 text-sm mt-1">{errors.donorEmail.message}</p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('isAnonymous')}
                        className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#FFD700] 
                                 focus:ring-[#FFD700] focus:ring-offset-0"
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
                                 focus:ring-[#FFD700] focus:ring-offset-0"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!stripe || isProcessing || paymentStatus === 'success'}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#E5C100] 
                           text-[#4B306A] font-bold rounded-xl shadow-lg 
                           hover:shadow-xl hover:scale-105 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : paymentStatus === 'success' ? (
                    <>
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Thank You!
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Complete Donation
                    </>
                  )}
                </button>

                {/* Security Note */}
                <p className="text-center text-sm text-white/50">
                  🔒 Secure payment powered by Stripe. Your information is encrypted and protected.
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

### Step 4.4: Create Donate Button Component

**File:** `src/components/DonateButton.tsx`

```typescript
'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { DonationButtonProps } from '@/types/donation';

export default function DonateButton({ onOpenDonation, className = '' }: DonationButtonProps) {
  return (
    <motion.button
      onClick={onOpenDonation}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#E5C100] 
                 text-[#4B306A] font-bold rounded-xl shadow-lg 
                 hover:shadow-xl transition-all
                 flex items-center justify-center gap-2 ${className}`}
    >
      <Heart className="w-5 h-5" fill="currentColor" />
      Donate Now
    </motion.button>
  );
}
```

---

## Phase 5: Integration with Existing Code

### Step 5.1: Wrap App with Stripe Provider

**File:** `src/pages/_app.tsx`

Update your existing `_app.tsx`:

```typescript
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import StripeProvider from '@/components/StripeProvider';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <StripeProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </StripeProvider>
  );
}
```

### Step 5.2: Update Hero Component

**File:** `src/pages/index.tsx` (or wherever your Hero section is)

Add donation modal functionality:

```typescript
'use client';

import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DonationModal from '@/components/DonationModal';
import DonateButton from '@/components/DonateButton';
// ... other imports

export default function Home() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Lead By Example - Breaking the School-to-Prison Pipeline</title>
        {/* ... other meta tags */}
      </Head>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* ... existing hero content ... */}

        {/* Update your existing "Donate" buttons */}
        <DonateButton
          onOpenDonation={() => setIsDonationModalOpen(true)}
          className="mt-6"
        />

        {/* ... rest of your hero section ... */}
      </section>

      {/* ... rest of your page sections ... */}
    </>
  );
}
```

### Step 5.3: Update TypeScript Paths

**File:** `tsconfig.json`

Ensure your paths configuration includes types:

```json
{
  "compilerOptions": {
    // ... existing config ...
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

---

## Phase 6: Testing

### Step 6.1: Test Environment Variables

Create a test file: `src/utils/testStripe.ts`

```typescript
export function validateStripeConfig() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!publishableKey || !publishableKey.startsWith('pk_')) {
    throw new Error('Invalid Stripe publishable key');
  }

  if (!secretKey || !secretKey.startsWith('sk_')) {
    throw new Error('Invalid Stripe secret key');
  }

  console.log('✅ Stripe configuration valid');
  return true;
}
```

### Step 6.2: Local Testing Checklist

Run through this checklist:

```
Local Testing:
[ ] 1. Start dev server: npm run dev
[ ] 2. Open http://localhost:3000
[ ] 3. Click "Donate Now" button
[ ] 4. Modal opens with glassmorphic design
[ ] 5. Select preset amount ($50)
[ ] 6. Enter test information:
       Name: Test Donor
       Email: test@example.com
[ ] 7. Payment form loads (Stripe Elements)
[ ] 8. Use Stripe test card: 4242 4242 4242 4242
       Expiry: Any future date
       CVC: Any 3 digits
       ZIP: Any 5 digits
[ ] 9. Click "Complete Donation"
[ ] 10. Success message appears
[ ] 11. Check browser console for errors
[ ] 12. Check terminal for webhook logs
```

### Step 6.3: Stripe Test Cards

Use these for testing different scenarios:

```
Success:
4242 4242 4242 4242 - Success

Requires Authentication:
4000 0025 0000 3155 - 3D Secure authentication

Declined:
4000 0000 0000 9995 - Declined card

Insufficient Funds:
4000 0000 0000 9995 - Insufficient funds
```

### Step 6.4: Webhook Testing (Local)

Install Stripe CLI for local webhook testing:

```bash
# Install Stripe CLI
# Mac: brew install stripe/stripe-cli/stripe
# Windows: scoop install stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret it provides
# Add to .env.local as STRIPE_WEBHOOK_SECRET
```

---

## Phase 7: Deployment

### Step 7.1: Vercel Environment Variables

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
STRIPE_SECRET_KEY = sk_live_...
STRIPE_WEBHOOK_SECRET = whsec_... (production webhook secret)
```

⚠️ **Important:** Use LIVE keys for production, not test keys!

### Step 7.2: Create Production Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy webhook signing secret
6. Add to Vercel environment variables

### Step 7.3: Deploy to Vercel

```bash
# Commit your changes
git add .
git commit -m "feat: add Stripe payment integration"
git push origin main

# Vercel will auto-deploy if connected
# Or deploy manually:
vercel --prod
```

### Step 7.4: Post-Deployment Testing

```
Production Testing:
[ ] 1. Visit your live site
[ ] 2. Click "Donate Now"
[ ] 3. Test with real credit card (small amount like $1)
[ ] 4. Verify payment appears in Stripe Dashboard
[ ] 5. Check webhook logs in Stripe Dashboard
[ ] 6. Verify email receipt sent
[ ] 7. Test on mobile device
[ ] 8. Test different browsers
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: "Stripe is not defined"
**Solution:** Ensure environment variables are set correctly:
```bash
# Check .env.local
cat .env.local | grep STRIPE
```

#### Issue: "Invalid API key"
**Solution:** 
- Verify you're using the correct key format
- Test keys: `pk_test_...` and `sk_test_...`
- Live keys: `pk_live_...` and `sk_live_...`
- Never mix test and live keys

#### Issue: Payment modal doesn't open
**Solution:** Check console for errors:
```javascript
// In browser console:
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// Should show pk_test_... or pk_live_...
```

#### Issue: Webhook signature verification fails
**Solution:**
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Verify webhook URL is correct in Stripe Dashboard
- Check that `micro` package is installed

#### Issue: TypeScript errors
**Solution:**
```bash
# Regenerate types
npm run type-check

# Install missing type definitions
npm install -D @types/micro @types/stripe
```

#### Issue: Styles not matching
**Solution:** Verify Tailwind config includes new component paths:
```javascript
// tailwind.config.js
content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

---

## Security Checklist

Before going live:

```
Security Review:
[ ] Environment variables never committed to Git
[ ] .env.local in .gitignore
[ ] Using HTTPS in production
[ ] Webhook signatures verified
[ ] Amount validation on server-side
[ ] Email validation on server-side
[ ] Error messages don't expose sensitive data
[ ] Rate limiting considered (optional)
[ ] CORS configured if needed
[ ] Payment confirmation emails enabled
```

---

## Performance Optimization

### Lazy Load Stripe Components

Only load Stripe when needed:

```typescript
import dynamic from 'next/dynamic';

const DonationModal = dynamic(() => import('@/components/DonationModal'), {
  ssr: false, // Don't server-side render
  loading: () => <div>Loading payment form...</div>
});
```

---

## Success Metrics

Track these after deployment:

```
Analytics to Monitor:
- Total donations received
- Average donation amount
- Donation completion rate
- Failed payment rate
- Mobile vs desktop donations
- Peak donation times
- User drop-off points
```

---

## Support Resources

**Stripe Documentation:**
- https://stripe.com/docs/payments/accept-a-payment
- https://stripe.com/docs/webhooks

**Next.js API Routes:**
- https://nextjs.org/docs/api-routes/introduction

**Testing:**
- https://stripe.com/docs/testing

**Get Help:**
- Stripe Support: https://support.stripe.com
- Next.js Discord: https://nextjs.org/discord

---

## Congratulations! 🎉

You've successfully integrated Stripe payments into Lead By Example!

**What You Built:**
✅ Secure payment processing
✅ Beautiful donation modal
✅ Real-time payment confirmation
✅ Webhook handling
✅ Mobile-responsive design
✅ Production-ready code

**Next Steps:**
1. Test thoroughly in test mode
2. Switch to live keys when ready
3. Monitor Stripe Dashboard
4. Collect feedback from donors
5. Optimize based on metrics

---

**Questions or Issues?**
Contact StrayDog Syndications LLC for support.

Built with ❤️ for Lead By Example
