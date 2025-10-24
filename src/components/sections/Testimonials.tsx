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

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

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

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Keyboard navigation
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
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === 'left' ? 45 : -45,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-b from-royal-900 to-royal-800">
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
        <div className="relative max-w-4xl mx-auto mb-16">
          <div 
            className="relative h-96 flex items-center justify-center"
            style={{ perspective: '2000px' }}
          >
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
                <GlassCard variant="dark" className="p-8 h-full flex flex-col justify-between">
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

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform focus-ring"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform focus-ring"
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
              key={index}
              onClick={() => goToTestimonial(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300 focus-ring',
                index === currentIndex
                  ? 'w-8 bg-accent-500'
                  : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { 
              label: 'Graduation Rate', 
              value: '87%', 
              description: 'of participants complete high school'
            },
            { 
              label: 'Post-Program Success', 
              value: '92%', 
              description: 'pursue higher education or meaningful employment'
            },
            { 
              label: 'Community Satisfaction', 
              value: '95%', 
              description: 'of families report positive outcomes'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3 + index * 0.1 }
              }}
            >
              <GlassCard variant="light" className="p-6">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <Text size="sm" className="text-white/80">
                  {stat.description}
                </Text>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => {
              // Handle get involved click
              // TODO: Implement share story functionality
            }}
          >
            Share Your Story
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;