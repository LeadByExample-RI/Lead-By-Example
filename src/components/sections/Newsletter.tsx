import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { Heading, Text } from '@/components/ui/Typography'
import { cn } from '@/utils/helpers'

// Validation schema
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one interest'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

const interestOptions = [
  { id: 'events', label: 'Community Events' },
  { id: 'fundraisers', label: 'Fundraising Campaigns' },
  { id: 'volunteer', label: 'Volunteer Opportunities' },
  { id: 'success', label: 'Success Stories' },
  { id: 'partnerships', label: 'Partnership Updates' },
]

export function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
  })

  const watchedInterests = watch('interests')

  const onSubmit = async (_data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // In a real app, you would send the data to your newsletter service
      // TODO: Implement newsletter signup API call
      
      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary-900 to-secondary-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 md:p-12" variant="dark">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-accent-500/20 rounded-full mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-8 h-8 text-accent-400" />
              </motion.div>
              
              <Heading level={2} className="text-white mb-4" gradient>
                Stay Connected
              </Heading>
              
              <Text size="lg" className="text-white/80 max-w-2xl mx-auto">
                Join our newsletter to receive updates on community events, success stories, and opportunities to make a difference.
              </Text>
            </div>

            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-success-500/20 border border-success-500/30 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <Text className="text-success-300">
                    Thank you for subscribing! Check your email for confirmation.
                  </Text>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-error-500/20 border border-error-500/30 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-error-400" />
                  <Text className="text-error-300">
                    Something went wrong. Please try again later.
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-white font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className={cn(
                      'w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50',
                      'focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50',
                      'backdrop-blur-sm transition-all duration-300',
                      errors.firstName
                        ? 'border-error-500/50 focus:ring-error-500/50 focus:border-error-500/50'
                        : 'border-white/20 hover:border-white/30'
                    )}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <Text size="sm" className="text-error-400 mt-1">
                      {errors.firstName.message}
                    </Text>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={cn(
                      'w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50',
                      'focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50',
                      'backdrop-blur-sm transition-all duration-300',
                      errors.email
                        ? 'border-error-500/50 focus:ring-error-500/50 focus:border-error-500/50'
                        : 'border-white/20 hover:border-white/30'
                    )}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <Text size="sm" className="text-error-400 mt-1">
                      {errors.email.message}
                    </Text>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white font-medium mb-4">
                  What interests you? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {interestOptions.map((option) => (
                    <motion.label
                      key={option.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300',
                        watchedInterests?.includes(option.id)
                          ? 'bg-accent-500/20 border-accent-500/50 text-accent-300'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        {...register('interests')}
                        type="checkbox"
                        value={option.id}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          'w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200',
                          watchedInterests?.includes(option.id)
                            ? 'bg-accent-500 border-accent-500'
                            : 'border-white/30'
                        )}
                      >
                        {watchedInterests?.includes(option.id) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <Text size="sm">{option.label}</Text>
                    </motion.label>
                  ))}
                </div>
                {errors.interests && (
                  <Text size="sm" className="text-error-400 mt-2">
                    {errors.interests.message}
                  </Text>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-48"
                >
                  {isSubmitting ? (
                    'Subscribing...'
                  ) : (
                    <>
                      Subscribe to Newsletter
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </GlassButton>
              </div>

              {/* Privacy Notice */}
              <div className="text-center pt-4">
                <Text size="sm" className="text-white/60">
                  We respect your privacy. Unsubscribe at any time. 
                  <br />
                  By subscribing, you agree to our privacy policy.
                </Text>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}