import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Users, Calendar, MapPin } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Heading, Text } from '@/components/ui/Typography'
import { GlassButton } from '@/components/ui/GlassButton'
import { Heading, Text } from '@/components/ui/Typography'


const partners = [
  {
    id: 1,
    name: "Open Doors RI",
    description: "A comprehensive reentry program providing support, resources, and opportunities for individuals transitioning back into the community.",
    website: "https://opendoorsri.org",
    logo: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20minimalist%20logo%20for%20Open%20Doors%20RI%20organization%20with%20door%20symbol%20and%20clean%20typography&image_size=square",
    services: [
      "Job placement assistance",
      "Housing support",
      "Educational programs",
      "Mental health services"
    ],
    impact: "500+ individuals supported annually"
  },
  {
    id: 2,
    name: "Reentry Campus Program",
    description: "An innovative campus-based program focused on education, skill development, and community integration for formerly incarcerated individuals.",
    website: "https://reentryCampus.org",
    logo: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20logo%20for%20Reentry%20Campus%20Program%20with%20graduation%20cap%20and%20building%20elements&image_size=square",
    services: [
      "College preparation",
      "Vocational training",
      "Life skills workshops",
      "Career counseling"
    ],
    impact: "85% graduation rate"
  }
]

const partnershipBenefits = [
  {
    icon: Users,
    title: "Community Impact",
    description: "Join a network of organizations making real change in people's lives"
  },
  {
    icon: Heart,
    title: "Shared Mission",
    description: "Align with our values of empowerment, support, and community building"
  },
  {
    icon: Handshake,
    title: "Collaborative Growth",
    description: "Expand your reach and impact through strategic partnerships"
  }
]

export function Partners() {
  return (
    <section className="py-20 bg-gradient-to-b from-neutral-900 to-primary-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading level={2} className="text-white mb-6" gradient>
            Our Community Partners
          </Heading>
          <Text size="lg" className="text-white/80 max-w-3xl mx-auto">
            We collaborate with outstanding organizations that share our commitment to empowering youth and strengthening communities.
          </Text>
        </motion.div>

        {/* Partner Organizations */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={partner.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-8 h-full" variant="dark">
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Heading level={3} className="text-white">
                        {partner.name}
                      </Heading>
                      <motion.a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-400 hover:text-accent-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Visit ${partner.name} website`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    </div>
                    <div className="inline-block px-3 py-1 bg-accent-500/20 text-accent-400 text-sm rounded-full">
                      {partner.impact}
                    </div>
                  </div>
                </div>

                <Text className="text-white/80 mb-6">
                  {partner.description}
                </Text>

                <div className="mb-6">
                  <Text className="text-white font-semibold mb-3">
                    Key Services:
                  </Text>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {partner.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-center gap-2 text-white/70">
                        <div className="w-2 h-2 bg-primary-400 rounded-full flex-shrink-0" />
                        <Text size="sm">{service}</Text>
                      </li>
                    ))}
                  </ul>
                </div>

                <GlassButton
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(partner.website, '_blank')}
                >
                  Learn More
                  <ExternalLink className="w-4 h-4" />
                </GlassButton>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {partnershipBenefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 text-center h-full" variant="default">
                <benefit.icon className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <Heading level={4} className="text-white mb-3">
                  {benefit.title}
                </Heading>
                <Text size="sm" className="text-white/70">
                  {benefit.description}
                </Text>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership CTA */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8" variant="dark">
            <div className="text-center mb-8">
              <Heading level={3} className="text-white mb-4">
                Become a Partner
              </Heading>
              <Text className="text-white/80 max-w-2xl mx-auto">
                Join our network of community partners and help us create lasting positive change. Together, we can empower more youth and strengthen our communities.
              </Text>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <Heading level={4} className="text-white mb-4">
                  Get In Touch
                </Heading>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/80">
                    <Mail className="w-5 h-5 text-accent-400" />
                    <Text size="sm">partnerships@leadbyexample.org</Text>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone className="w-5 h-5 text-accent-400" />
                    <Text size="sm">(401) 555-0123</Text>
                  </div>
                </div>
              </div>

              {/* Partnership Types */}
              <div>
                <Heading level={4} className="text-white mb-4">
                  Partnership Opportunities
                </Heading>
                <ul className="space-y-2">
                  {[
                    "Program collaboration",
                    "Resource sharing",
                    "Event partnerships",
                    "Funding opportunities"
                  ].map((opportunity, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/70">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full" />
                      <Text size="sm">{opportunity}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <GlassButton variant="primary" size="lg">
                <Mail className="w-5 h-5" />
                Contact Us
              </GlassButton>
              <GlassButton variant="outline" size="lg">
                Download Partnership Info
              </GlassButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}