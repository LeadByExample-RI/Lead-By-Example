'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, TrendingUp, Award, Users } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Program Graduate, 2023',
    content: 'Lead By Example gave me the guidance and support I needed to turn my life around. The mentorship program connected me with people who believed in me when I didn\'t believe in myself. Now I\'m enrolled in college and working toward my degree in social work.',
  },
  {
    id: 2,
    name: 'Keisha Williams',
    role: 'Community Volunteer',
    content: 'Seeing the transformation in these young people is incredible. This organization doesn\'t just provide services—they build real relationships and create lasting change. The All Sides of Town Cookout brings our community together like nothing else.',
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Parent & Supporter',
    content: 'My son was struggling in school and falling in with the wrong crowd. The mentors at Lead By Example stepped in and made all the difference. He\'s now graduating high school with honors and has a bright future ahead. This program saves lives.',
  },
  {
    id: 4,
    name: 'Tamika Brown',
    role: 'Former Participant, Now Mentor',
    content: 'This program changed my life, and now I get to give back by mentoring others. Lead By Example doesn\'t just help youth—it creates a cycle of positive change that ripples through entire communities. I\'m proof that this works.',
  },
];

const stats = [
  { icon: TrendingUp, value: '87%', label: 'Graduation Rate' },
  { icon: Award, value: '92%', label: 'Post-Program Success' },
  { icon: Users, value: '95%', label: 'Community Satisfaction' },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-900/30 to-transparent" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Real stories from real people whose lives have been transformed by Lead By Example
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card p-6 text-center card-lift"
            >
              <div className="flex justify-center mb-3">
                <stat.icon className="w-10 h-10 text-gold-500" />
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: 20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 depth-3d"
              >
                {/* Quote icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-accent-gold flex items-center justify-center">
                    <Quote className="w-8 h-8 text-royal-900" />
                  </div>
                </div>

                {/* Testimonial content */}
                <blockquote className="text-center space-y-6">
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author info */}
                  <div className="flex flex-col items-center gap-3 pt-6 border-t border-white/10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-verdean-500 to-royal-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gradient">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-white/70 text-sm">
                        {currentTestimonial.role}
                      </div>
                    </div>
                  </div>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <button
                onClick={handlePrevious}
                className="pointer-events-auto glass-card p-3 hover:bg-white/20 transition-all rounded-full group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto glass-card p-3 hover:bg-white/20 transition-all rounded-full group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gold-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
