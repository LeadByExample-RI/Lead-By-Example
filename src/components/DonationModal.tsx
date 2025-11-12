'use client';

import { DonationFormData, DonationModalProps } from '@/types/donation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, DollarSign, Heart, Info, Loader2, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export default function DonationModal({ isOpen, onClose, initialAmount = 50 }: DonationModalProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      return secret;
    } catch (error: any) {
      console.error('Payment intent error:', error);
      setErrorMessage(error.message || 'Failed to initialize payment. Please try again.');
      return null;
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
      let secret = clientSecret;
      if (!secret) {
        secret = await createPaymentIntent(data);
        if (!secret) {
          throw new Error('Failed to initialize payment');
        }
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="my-8 w-full max-w-2xl rounded-2xl border border-white/20 bg-gradient-to-br from-[#4B306A]/95 to-[#421B5A]/95 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 rounded-t-2xl border-b border-white/10 bg-[#4B306A]/95 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-[#E5C100] shadow-lg"
                    >
                      <Heart className="h-6 w-6 text-[#4B306A]" fill="currentColor" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Support Our Mission</h2>
                      <p className="text-sm text-white/70">All Sides of Town Cookout 2025</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isProcessing}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                {/* Success Message */}
                {paymentStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-green-500/50 bg-green-500/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-10 w-10 text-green-400" />
                      <div>
                        <p className="font-semibold text-green-400">Thank you for your donation!</p>
                        <p className="text-sm text-white/70">
                          Your support means everything to our community. You&apos;ll receive a
                          receipt via email.
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
                    className="rounded-xl border border-red-500/50 bg-red-500/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <XCircle className="h-8 w-8 flex-shrink-0 text-red-400" />
                      <div>
                        <p className="font-semibold text-red-400">Payment Error</p>
                        <p className="text-sm text-white/70">
                          {errorMessage || 'Please try again.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Info Message */}
                <div className="rounded-xl border border-[#01514C]/50 bg-[#01514C]/20 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#01514C]" />
                    <p className="text-sm text-white/80">
                      Your donation directly supports the All Sides of Town Cookout 2025, providing
                      free food, haircuts, activities, and backpack giveaways for youth in our
                      community.
                    </p>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-semibold text-white">
                    <DollarSign className="h-5 w-5 text-[#FFD700]" />
                    Select Donation Amount
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {PRESET_AMOUNTS.map((amount) => (
                      <motion.button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-xl border-2 p-4 transition-all ${
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
                    className={`w-full rounded-xl border-2 p-4 transition-all ${
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
                        <DollarSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          max="999999"
                          {...register('amount', { valueAsNumber: true })}
                          placeholder="Enter amount"
                          className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {errors.amount && (
                    <p className="flex items-center gap-2 text-sm text-red-400">
                      <XCircle className="h-4 w-4" />
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Your Information</h3>

                  <div>
                    <input
                      type="text"
                      {...register('donorName')}
                      placeholder="Full Name"
                      disabled={isAnonymous}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.donorName && !isAnonymous && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-red-400">
                        <XCircle className="h-4 w-4" />
                        {errors.donorName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      {...register('donorEmail')}
                      placeholder="Email Address (for receipt)"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20"
                    />
                    {errors.donorEmail && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-red-400">
                        <XCircle className="h-4 w-4" />
                        {errors.donorEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="group flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        {...register('isAnonymous')}
                        className="h-5 w-5 cursor-pointer rounded border-white/20 bg-white/10 text-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-0"
                      />
                      <span className="text-white/80 transition-colors group-hover:text-white">
                        Make this donation anonymous
                      </span>
                    </label>

                    <label className="group flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        {...register('newsletter')}
                        className="h-5 w-5 cursor-pointer rounded border-white/20 bg-white/10 text-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-0"
                      />
                      <span className="text-white/80 transition-colors group-hover:text-white">
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
                    <h3 className="font-semibold text-white">Payment Information</h3>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <PaymentElement />
                    </div>
                  </motion.div>
                )}

                {isCreatingIntent && (
                  <div className="flex items-center justify-center gap-2 text-white/70">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Preparing payment...</span>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!stripe || isProcessing || paymentStatus === 'success' || !clientSecret}
                  whileHover={{ scale: !stripe || isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: !stripe || isProcessing ? 1 : 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5C100] px-8 py-4 font-bold text-[#4B306A] shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : paymentStatus === 'success' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Thank You!
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5" fill="currentColor" />
                      Complete Donation ${currentAmount?.toFixed(2) || '0.00'}
                    </>
                  )}
                </motion.button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-center text-sm text-white/50">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
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
