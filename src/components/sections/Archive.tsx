import React from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Heading, Text } from '@/components/ui/Typography'
import { formatCurrency, formatNumber } from '@/utils/helpers'

const archiveData = [
  {
    id: 1,
    title: "Back to School Drive 2024",
    raised: 15000,
    youthServed: 350,
    date: "August 2024",
    description: "Provided school supplies, backpacks, and uniforms to students in need across the community.",
    impact: "87% of recipients improved their academic performance",
    color: "from-primary-500 to-primary-600"
  },
  {
    id: 2,
    title: "Youth Empowerment Summit 2024",
    raised: 8500,
    youthServed: 200,
    date: "June 2024",
    description: "A comprehensive summit featuring workshops, mentorship sessions, and career guidance.",
    impact: "92% of participants reported increased confidence",
    color: "from-secondary-500 to-secondary-600"
  },
  {
    id: 3,
    title: "Winter Clothing Drive 2023",
    raised: 12000,
    youthServed: 280,
    date: "December 2023",
    description: "Distributed warm clothing, coats, and winter essentials to families in need.",
    impact: "95% satisfaction rate from beneficiaries",
    color: "from-accent-500 to-accent-600"
  }
]

const totalImpact = {
  totalRaised: archiveData.reduce((sum, item) => sum + item.raised, 0),
  totalYouthServed: archiveData.reduce((sum, item) => sum + item.youthServed, 0),
  totalEvents: archiveData.length
}

export function Archive() {
  return (
    <section className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading level={2} className="text-white mb-6" gradient>
            Our Impact Archive
          </Heading>
          <Text size="lg" className="text-white/80 max-w-3xl mx-auto">
            Explore our past initiatives and see the tangible difference we've made in our community through dedicated fundraising and outreach efforts.
          </Text>
        </motion.div>

        {/* Combined Impact Statistics */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-6 text-center" variant="strong">
              <DollarSign className="w-12 h-12 text-accent-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {formatCurrency(totalImpact.totalRaised)}
              </div>
              <Text size="sm" className="text-white/70">
                Total Funds Raised
              </Text>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="p-6 text-center" variant="strong">
              <Users className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {formatNumber(totalImpact.totalYouthServed)}+
              </div>
              <Text size="sm" className="text-white/70">
                Youth Impacted
              </Text>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6 text-center" variant="strong">
              <TrendingUp className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {totalImpact.totalEvents}
              </div>
              <Text size="sm" className="text-white/70">
                Successful Events
              </Text>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Archive Cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {archiveData.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <GlassCard className="p-6 h-full" variant="default">
                {/* Header with gradient */}
                <div className={`h-2 w-full bg-gradient-to-r ${event.color} rounded-full mb-6`} />
                
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent-400" />
                  <Text size="sm" className="text-white/70">
                    {event.date}
                  </Text>
                </div>

                <Heading level={4} className="text-white mb-4">
                  {event.title}
                </Heading>

                <Text variant="small" className="text-white/80 mb-6">
                  {event.description}
                </Text>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-accent-400">
                      {formatCurrency(event.raised)}
                    </div>
                    <Text variant="small" className="text-white/60">
                      Raised
                    </Text>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-primary-400">
                      {formatNumber(event.youthServed)}
                    </div>
                    <Text variant="small" className="text-white/60">
                      Youth Served
                    </Text>
                  </div>
                </div>

                {/* Impact Statement */}
                <div className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
                  <Text variant="small" className="text-white/90 font-medium">
                    Impact: {event.impact}
                  </Text>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 max-w-2xl mx-auto" variant="strong">
            <Heading level={3} className="text-white mb-4">
              Be Part of Our Next Success Story
            </Heading>
            <Text className="text-white/80 mb-6">
              Join us in creating positive change and making a lasting impact in our community. Every contribution matters.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Donate Today
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Volunteer With Us
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}