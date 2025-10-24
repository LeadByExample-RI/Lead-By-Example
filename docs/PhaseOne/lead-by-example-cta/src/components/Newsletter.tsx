import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/helpers';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const interests = [
  'Event Updates',
  'Success Stories',
  'Volunteer Opportunities',
  'Donation Drives',
];

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isInView } = useInView();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Newsletter signup:', data);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-gold-500/20 via-verdean-500/20 to-royal-500/20 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-16"
        >
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Mail className="w-10 h-10 text-neutral-900" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Stay <span className="text-gradient-gold">Connected</span>
            </h2>
            <p className="text-xl text-neutral-50/70 max-w-2xl mx-auto">
              Join our community and receive updates about upcoming events, success
              stories, and opportunities to make a difference.
            </p>
          </div>

          {/* Success message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-verdean-500/20 border border-verdean-500 rounded-xl p-4 flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6 text-verdean-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-verdean-400">
                  Successfully subscribed!
                </div>
                <div className="text-sm text-neutral-50/70">
                  Check your email to confirm your subscription.
                </div>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Email row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-neutral-50/80"
                >
                  First Name *
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  className={cn(
                    'input-glass w-full',
                    errors.firstName && 'border-red-500'
                  )}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName.message}
                  </motion.div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-50/80"
                >
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={cn(
                    'input-glass w-full',
                    errors.email && 'border-red-500'
                  )}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-50/80">
                I'm interested in: *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className="glass-card p-4 rounded-xl cursor-pointer hover:bg-white/15 transition-all duration-300 has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/10 group"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        {...register('interests')}
                        type="checkbox"
                        value={interest}
                        className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-gold-500 checked:border-gold-500 transition-all cursor-pointer"
                      />
                      <span className="text-sm font-medium group-has-[:checked]:text-gold-500 transition-colors">
                        {interest}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.interests.message}
                </motion.div>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full relative overflow-hidden group"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full"
                  />
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Bell className="w-5 h-5" />
                  Subscribe to Newsletter
                </div>
              )}
            </motion.button>

            {/* Privacy note */}
            <p className="text-xs text-center text-neutral-50/50">
              We respect your privacy. Unsubscribe at any time. Read our{' '}
              <a href="#" className="text-gold-500 hover:text-gold-400 underline">
                privacy policy
              </a>
              .
            </p>
          </form>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
            {[
              {
                icon: Bell,
                title: 'Event Alerts',
                description: 'Be the first to know about upcoming cookouts and events',
              },
              {
                icon: CheckCircle,
                title: 'Impact Updates',
                description: 'See how your support is making a difference',
              },
              {
                icon: Mail,
                title: 'Monthly Newsletter',
                description: 'Stories, stats, and ways to get involved',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center space-y-3"
              >
                <benefit.icon className="w-8 h-8 mx-auto text-gold-500" />
                <h4 className="font-semibold text-neutral-50">{benefit.title}</h4>
                <p className="text-sm text-neutral-50/60">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
