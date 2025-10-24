import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Heading, Text } from '@/components/ui/Typography'
import { fadeInUp, staggerChildren } from '@/utils/animations'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Programs', href: '#programs' },
  { label: 'Get Involved', href: '#volunteer' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
]

const programLinks = [
  { label: 'Youth Mentorship', href: '#mentorship' },
  { label: 'Community Events', href: '#events' },
  { label: 'Educational Support', href: '#education' },
  { label: 'Career Development', href: '#career' },
  { label: 'Family Services', href: '#family' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-secondary-900 to-neutral-900">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Organization Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="mb-6">
              <Heading level={3} className="text-white mb-4" gradient>
                Lead By Example
              </Heading>
              <Text className="text-white/80 mb-6">
                Empowering youth through community support, mentorship, and opportunities that create lasting positive change in our neighborhoods.
              </Text>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent-400" />
                <Text variant="small">info@leadbyexample.org</Text>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent-400" />
                <Text variant="small">(401) 555-0123</Text>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent-400" />
                <Text variant="small">Providence, Rhode Island</Text>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <Heading level={4} className="text-white mb-6">
              Quick Links
            </Heading>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-white/70 hover:text-accent-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text variant="small">{link.label}</Text>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={fadeInUp}>
            <Heading level={4} className="text-white mb-6">
              Our Programs
            </Heading>
            <ul className="space-y-3">
              {programLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-white/70 hover:text-accent-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text variant="small">{link.label}</Text>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div variants={fadeInUp}>
            <Heading level={4} className="text-white mb-6">
              Stay Connected
            </Heading>
            <Text className="text-white/70 mb-6">
              Follow us on social media for updates and community highlights.
            </Text>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 hover:border-accent-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70 hover:text-accent-400" />
                </motion.a>
              ))}
            </div>

            <GlassCard className="p-4" variant="subtle">
              <Text variant="small" className="text-white/80 mb-2">
                Join our newsletter for updates
              </Text>
              <motion.button
                className="w-full px-4 py-2 bg-accent-500/80 hover:bg-accent-500/90 text-white rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 border-t border-white/10"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white/60">
              <Text variant="small">
                © {currentYear} Lead By Example. All rights reserved.
              </Text>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <Text variant="small">Made with</Text>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-accent-400 fill-current" />
              </motion.div>
              <Text variant="small">for our community</Text>
            </div>

            <div className="flex gap-6">
              <motion.a
                href="#privacy"
                className="text-white/60 hover:text-accent-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                <Text variant="small">Privacy Policy</Text>
              </motion.a>
              <motion.a
                href="#terms"
                className="text-white/60 hover:text-accent-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                <Text variant="small">Terms of Service</Text>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}