import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Program Graduate, 2023',
    content:
      'Lead By Example changed my life. The mentorship I received helped me see a future beyond the streets. Now I\'m in college studying social work to give back to my community.',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Parent',
    content:
      'I was losing my son to the streets. This program gave him direction, positive role models, and most importantly - hope. He graduated high school and is now employed full-time.',
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Community Mentor',
    content:
      'Being part of Lead By Example has been incredibly rewarding. Watching these young people transform and reach their potential reminds me why this work is so vital.',
  },
  {
    id: 4,
    name: 'Keisha Thompson',
    role: 'Program Graduate, 2022',
    content:
      'The All Sides of Town cookout showed me that my neighborhood doesn\'t define me. I made friends from different parts of the city and learned we all want the same things - safety, opportunity, and community.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isInView } = useInView();

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-royal-900/50 to-transparent" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-gradient-gold">Stories</span> of Change
          </h2>
          <p className="text-xl text-neutral-50/70 max-w-3xl mx-auto">
            Real voices from real people whose lives have been transformed through
            community connection and mentorship.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 md:p-16 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full space-y-8"
              >
                {/* Quote icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <Quote className="w-8 h-8 text-neutral-900" />
                </motion.div>

                {/* Content */}
                <p className="text-2xl md:text-3xl leading-relaxed text-neutral-50/90 italic">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-verdean-500 to-royal-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xl text-gradient-gold">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-neutral-50/60">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={previous}
              className="w-14 h-14 glass-card rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gold-500 group-hover:text-gold-400" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gold-500'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-14 h-14 glass-card rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gold-500 group-hover:text-gold-400" />
            </motion.button>
          </div>
        </motion.div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              number: '87%',
              label: 'Graduation Rate',
              description: 'Of participants complete high school',
            },
            {
              number: '92%',
              label: 'Post-Program Success',
              description: 'Employed or in higher education',
            },
            {
              number: '95%',
              label: 'Community Satisfaction',
              description: 'Positive program feedback',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="glass-card p-8 text-center hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="text-5xl md:text-6xl font-bold text-gradient-gold mb-3 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-neutral-50/60">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
