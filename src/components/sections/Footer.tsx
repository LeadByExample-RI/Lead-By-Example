import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Heading, Text } from '@/components/ui/Typography'

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/leadbyexampleri', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/leadbyexampleri', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/leadbyexampleri', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/lead-by-example-ri', label: 'LinkedIn' },
]

const quickLinks = [
  { label: 'About Us', href: '#mission' },
  { label: 'Get Involved', href: '#mentors' },
]

const programLinks = [
  { label: 'Youth Mentorship', href: '#mentors' },
  { label: 'Educational Support', href: '#resources' },
  { label: 'Family Services', href: '#partners' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="relative bg-gradient-to-b from-secondary-900 to-neutral-900">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Organization Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
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
              <div className="flex items-start gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a
                    href="mailto:robertleadbyexample@gmail.com"
                    className="text-sm text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    robertleadbyexample@gmail.com
                  </a>
                  <a
                    href="mailto:ronaldleadbyexample@gmail.com"
                    className="text-sm text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    ronaldleadbyexample@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent-400" />
                <Text size="sm">(401) 699-6544</Text>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent-400" />
                <Text size="sm">120 Hawkins Street, Providence, RI 02908</Text>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
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
                    <Text size="sm">{link.label}</Text>
                  </motion.a>
                </li>
              ))}
              <li>
                <motion.button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('open-donation-modal'))}
                  className="text-white/70 hover:text-accent-400 transition-colors duration-300 text-left"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Text size="sm">Donate</Text>
                </motion.button>
              </li>
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
                    <Text size="sm">{link.label}</Text>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Heading level={4} className="text-white mb-6">
              Stay Connected
            </Heading>
            <Text className="text-white/70 mb-6">
              Follow us on social media for updates and community highlights.
            </Text>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 hover:border-accent-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70 hover:text-accent-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white/60">
              <Text size="sm">
                © {currentYear} Lead By Example. All rights reserved.
              </Text>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <Text size="sm">Built with</Text>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl"
              >
                ❤️
              </motion.div>
              <Text size="sm">by StrayDog Syndications LLC for our community</Text>
            </div>

            <div className="flex gap-6">
              <motion.a
                href="#privacy"
                className="text-white/60 hover:text-accent-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                <Text size="sm">Privacy Policy</Text>
              </motion.a>
              <motion.a
                href="#terms"
                className="text-white/60 hover:text-accent-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                <Text size="sm">Terms of Service</Text>
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
