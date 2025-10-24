import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Target, Award } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { Heading, Text } from '@/components/ui/Typography'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { formatCurrency, calculateProgress } from '@/utils/format'
import { fadeInUp, staggerChildren } from '@/utils/animations'

const fundraiserData = {
  title: "All Sides of Town Cookout 2025",
  goal: 10000,
  raised: 6250,
  date: "August 2, 2025",
  time: "12:30 PM - 8:00 PM",
  location: "Lincoln Woods State Park, Site A&B",
  features: [
    "Free food for all attendees",
    "Free haircuts & styling",
    "Youth activities & games",
    "Back-to-school backpack giveaway"
  ]
}

const statistics = [
  { icon: Users, label: "Youth Served", value: "500+" },
  { icon: Target, label: "Success Rate", value: "87%" },
  { icon: Award, label: "Community Partners", value: "25+" }
]

export function Hero() {
  const progress = calculateProgress(fundraiserData.raised, fundraiserData.goal)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-secondary-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Mission Statement */}
          <motion.div variants={fadeInUp} className="text-center lg:text-left">
            <Heading level={1} className="text-white mb-6" gradient>
              Leading By Example
            </Heading>
            
            <Text variant="lead" className="text-white/90 mb-8">
              Empowering youth through community support, mentorship, and opportunities that create lasting positive change in our neighborhoods.
            </Text>

            {/* Statistics */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-8"
              variants={staggerChildren}
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <GlassCard className="p-4" variant="subtle">
                    <stat.icon className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <GlassButton size="lg" className="w-full sm:w-auto">
                Learn More About Our Mission
              </GlassButton>
            </motion.div>
          </motion.div>

          {/* Current Fundraiser Card */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8" variant="strong">
              <div className="text-center mb-6">
                <Heading level={3} className="text-white mb-2">
                  Current Fundraiser
                </Heading>
                <Heading level={2} className="text-accent-400 mb-4">
                  {fundraiserData.title}
                </Heading>
              </div>

              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <Text className="text-white font-semibold">
                    Fundraising Progress
                  </Text>
                  <Text className="text-accent-400 font-bold">
                    {progress}% Complete
                  </Text>
                </div>
                
                <ProgressBar
                  value={fundraiserData.raised}
                  max={fundraiserData.goal}
                  variant="gradient"
                  size="lg"
                  animate
                />
                
                <div className="flex justify-between items-center mt-3">
                  <Text variant="small" className="text-white/70">
                    Raised: {formatCurrency(fundraiserData.raised)}
                  </Text>
                  <Text variant="small" className="text-white/70">
                    Goal: {formatCurrency(fundraiserData.goal)}
                  </Text>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-accent-400" />
                  <Text>{fundraiserData.date}</Text>
                </div>
                
                <div className="flex items-center gap-3 text-white/90">
                  <Clock className="w-5 h-5 text-accent-400" />
                  <Text>{fundraiserData.time}</Text>
                </div>
                
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <Text>{fundraiserData.location}</Text>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <Text className="text-white font-semibold mb-4">
                  Event Features:
                </Text>
                <ul className="space-y-2">
                  {fundraiserData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 bg-accent-400 rounded-full" />
                      <Text variant="small">{feature}</Text>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <GlassButton variant="primary" className="flex-1">
                  Donate Now
                </GlassButton>
                <GlassButton variant="outline" className="flex-1">
                  Learn More
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}