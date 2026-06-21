import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GlassButton, Heading, Text } from '@/components/ui';
import { cn } from '@/utils/helpers';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    role: 'Program Graduate, Class of 2022',
    content: 'Lead By Example changed my life completely. The mentorship I received helped me turn away from negative influences and focus on my education. Today I\'m studying criminal justice with the goal of helping other young people avoid the path I almost took.',
    initials: 'MR'
  },
  {
    id: '2',
    name: 'James Thompson',
    role: 'Community Partner',
    content: 'As a local business owner, I\'ve seen firsthand the impact Lead By Example has on our youth. They don\'t just talk about making a difference - they actually do it. The programs provide real skills and genuine opportunities for growth.',
    initials: 'JT'
  },
  {
    id: '3',
    name: 'Aisha Williams',
    role: 'Parent of Participant',
    content: 'I was worried about my son\'s future until he joined Lead By Example. The transformation has been incredible. He\'s more focused, responsible, and now has real goals for his life. This program gives our community hope.',
    initials: 'AW'
  },
  {
    id: '4',
    name: 'Robert Chen',
    role: 'Program Graduate, Class of 2021',
    content: 'The skills I learned through Lead By Example helped me secure a scholarship and enroll in college. Without their guidance and support, I wouldn\'t be where I am today. They truly believe in second chances.',
    initials: 'RC'
  }
];

interface StoryFormData {
  firstName: string;
  lastName: string;
  story: string;
  phone: string;
  email: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  story?: string;
  phone?: string;
  email?: string;
}

function ShareStoryModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<StoryFormData>({
    firstName: '',
    lastName: '',
    story: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'This field is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'This field is required';
    if (!formData.story.trim()) newErrors.story = 'This field is required';
    if (!formData.phone.trim()) newErrors.phone = 'This field is required';
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body = [
      `First Name: ${formData.firstName}`,
      `Last Name: ${formData.lastName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      '',
      'Story:',
      formData.story,
    ].join('%0A');

    const mailto = `mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=New%20Story%20Submission%20from%20Lead%20By%20Example%20Website&body=${body}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all';

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-center"
        >
          <div className="text-5xl mb-4">✅</div>
          <Heading level={3} className="text-white mb-4">Thank you for sharing your story!</Heading>
          <Text className="text-white/80 mb-6">We&apos;ll be in touch soon.</Text>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <Heading level={3} className="text-white">Share Your Story</Heading>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={inputClass}
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={inputClass}
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <textarea
              name="story"
              placeholder="Tell us your story..."
              rows={5}
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              className={inputClass}
            />
            {errors.story && <p className="text-red-400 text-sm mt-1">{errors.story}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all mt-2"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [showStoryModal, setShowStoryModal] = useState(false);

  const nextTestimonial = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevTestimonial();
      if (e.key === 'ArrowRight') nextTestimonial();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === 'left' ? -45 : 45,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }),
    center: {
      x: 0, opacity: 1, scale: 1, rotateY: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === 'left' ? 45 : -45,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="success-stories" className="section-padding bg-gradient-to-b from-secondary-950 via-secondary-900 to-secondary-950">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading level={2} className="text-white mb-4">
            Voices of Impact
          </Heading>
          <Text size="lg" className="text-white/90 max-w-3xl mx-auto">
            Hear from the lives transformed through our programs and the community that makes it all possible.
          </Text>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16 px-10 sm:px-0">
          <div className="relative min-h-[20rem] sm:min-h-[24rem] flex items-center justify-center [perspective:2000px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-w-2xl"
              >
                <GlassCard variant="dark" className="p-5 sm:p-8 h-full flex flex-col justify-between">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {currentTestimonial.initials}
                    </div>
                    <div className="flex-1">
                      <Heading level={3} className="text-white mb-1">
                        {currentTestimonial.name}
                      </Heading>
                      <Text size="sm" className="text-accent-500">
                        {currentTestimonial.role}
                      </Text>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center mb-6">
                    <Text size="lg" className="text-white/90 italic text-center leading-relaxed">
                      &ldquo;{currentTestimonial.content}&rdquo;
                    </Text>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-accent-500 text-4xl">&rdquo;</div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={prevTestimonial}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform focus-ring"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextTestimonial}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform focus-ring"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mb-16">
          {testimonials.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToTestimonial(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300 focus-ring',
                index === currentIndex ? 'w-8 bg-accent-500' : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: 'Graduation Rate', value: '87%', description: 'of participants complete high school' },
            { label: 'Post-Program Success', value: '92%', description: 'pursue higher education or meaningful employment' },
            { label: 'Community Satisfaction', value: '95%', description: 'of families report positive outcomes' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3 + index * 0.1 } }}
            >
              <GlassCard variant="light" className="p-6">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <Text size="sm" className="text-white/80">{stat.description}</Text>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => setShowStoryModal(true)}
          >
            Share Your Story
          </GlassButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {showStoryModal && (
          <ShareStoryModal onClose={() => setShowStoryModal(false)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
