'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/helpers';

const newsletterSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const interestOptions = [
  { id: 'events', label: 'Event Updates' },
  { id: 'stories', label: 'Success Stories' },
  { id: 'volunteer', label: 'Volunteer Opportunities' },
  { id: 'donations', label: 'Donation Drives' },
];

export function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { ref, isInView } = useInView({ threshold: 0.3 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
    },
  });

  const selectedInterests = watch('interests');

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Newsletter signup:', data);
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-verdean-900/30 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-accent-gold mb-4">
                <Mail className="w-8 h-8 text-royal-900" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay <span className="text-gradient">Connected</span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Join our community and receive updates on upcoming events, success stories, 
                and opportunities to make a difference.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/90">
                    First Name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className={cn(
                      'input-glass focus-visible-ring',
                      errors.firstName && 'input-error'
                    )}
                    placeholder="Enter your first name"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white/90">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={cn(
                      'input-glass focus-visible-ring',
                      errors.email && 'input-error'
                    )}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white/90">
                  What interests you? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interestOptions.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        'glass-card p-4 cursor-pointer transition-all hover:bg-white/15',
                        selectedInterests?.includes(option.id) && 'bg-white/15 border-gold-500'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          {...register('interests')}
                          type="checkbox"
                          value={option.id}
                          className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-gold-500 focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-0"
                          disabled={isSubmitting}
                        />
                        <span className="text-white/90">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.interests.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={cn(
                    'btn-primary w-full flex items-center justify-center gap-2 group',
                    (isSubmitting || submitStatus === 'success') && 'opacity-70 cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-royal-900 border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe to Newsletter</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Success/Error messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p>
                    Thank you for subscribing! Check your email for a confirmation message.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>
                    Something went wrong. Please try again or contact us directly.
                  </p>
                </motion.div>
              )}

              {/* Privacy notice */}
              <p className="text-sm text-white/50 text-center">
                We respect your privacy. Unsubscribe at any time.{' '}
                <a href="#" className="text-gold-500 hover:text-gold-400 underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
