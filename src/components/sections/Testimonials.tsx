import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Heading, Text } from '@/components/ui/Typography'
import { fadeInUp, staggerChildren } from '@/utils/animations'

const testimonials = [
  {
    id: 1,
    name: "Marcus Thompson",
    role: "Program Graduate",
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20headshot%20of%20young%20African%20American%20man%20smiling%20confidently%20wearing%20business%20casual%20attire&image_size=square",
    quote: "Lead By Example changed my life completely. The mentorship and support I received helped me graduate high school and get into college. Now I'm studying business and want to give back to my community.",
    rating: 5,
    impact: "High School Graduate, College Student"
  },
  {
    id: 2,
    name: "Lisa Rodriguez",
    role: "Community Member",
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20headshot%20of%20Hispanic%20woman%20smiling%20warmly%20wearing%20professional%20attire&image_size=square",
    quote: "As a single mother, the support from Lead By Example has been incredible. The back-to-school drive provided everything my kids needed, and the community events brought us together in ways I never expected.",
    rating: 5,
    impact: "Mother of 3, Community Volunteer"
  },
  {
    id: 3,
    name: "DeShawn Williams",
    role: "Youth Mentor",
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20headshot%20of%20young%20Black%20man%20with%20friendly%20smile%20wearing%20casual%20professional%20clothing&image_size=square",
    quote: "I started as someone who needed help, and now I'm helping others. The program taught me leadership skills and gave me purpose. Seeing other young people succeed because of our work is the best feeling in the world.",
    rating: 5,
    impact: "Former Participant, Now Mentor"
  },
  {
    id: 4,
    name: "Amanda Chen",
    role: "Local Business Owner",
    image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20headshot%20of%20Asian%20American%20woman%20smiling%20confidently%20in%20business%20attire&image_size=square",
    quote: "Partnering with Lead By Example has been one of the best decisions for our business. We've seen firsthand how they transform lives and strengthen our community. Their transparency and impact are remarkable.",
    rating: 5,
    impact: "Business Partner, Community Supporter"
  }
]

const impactStats = [
  { label: "Graduation Rate", value: "87%" },
  { label: "Success Rate", value: "92%" },
  { label: "Satisfaction", value: "95%" }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevTestimonial()
      if (e.key === 'ArrowRight') nextTestimonial()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-800 to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Heading level={2} className="text-white mb-6" gradient>
            Voices of Impact
          </Heading>
          <Text variant="lead" className="text-white/80 max-w-3xl mx-auto">
            Hear directly from the people whose lives have been transformed through our community programs and initiatives.
          </Text>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {impactStats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <GlassCard className="p-6 text-center" variant="strong">
                <div className="text-4xl font-bold text-accent-400 mb-2">
                  {stat.value}
                </div>
                <Text variant="small" className="text-white/70">
                  {stat.label}
                </Text>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, rotateY: 90, z: -100 }}
                animate={{ opacity: 1, rotateY: 0, z: 0 }}
                exit={{ opacity: 0, rotateY: -90, z: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <GlassCard className="p-8 h-full" variant="strong">
                  <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                    {/* Profile Image */}
                    <motion.div
                      className="flex-shrink-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="relative">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-accent-400/50"
                        />
                        <div className="absolute -top-2 -right-2 bg-accent-500 rounded-full p-2">
                          <Quote className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <div className="flex-1 text-center md:text-left">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {/* Rating Stars */}
                        <div className="flex justify-center md:justify-start gap-1 mb-4">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <Text variant="lead" className="text-white/90 mb-6 italic">
                          "{testimonials[currentIndex].quote}"
                        </Text>

                        {/* Author Info */}
                        <div>
                          <Heading level={4} className="text-white mb-1">
                            {testimonials[currentIndex].name}
                          </Heading>
                          <Text variant="small" className="text-accent-400 mb-2">
                            {testimonials[currentIndex].role}
                          </Text>
                          <Text variant="small" className="text-white/60">
                            {testimonials[currentIndex].impact}
                          </Text>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-accent-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <Text variant="small" className="text-white/50">
              {isAutoPlaying ? 'Auto-playing' : 'Manual control'} • Use arrow keys to navigate
            </Text>
          </div>
        </div>
      </div>
    </section>
  )
}