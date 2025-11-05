import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Heading, Text } from '@/components/ui/Typography';
import { motion } from 'framer-motion';
import { ExternalLink, Handshake, Heart, Mail, Phone, Users } from 'lucide-react';
import Image from 'next/image';

const partners = [
  {
    id: 1,
    name: 'Open Doors RI',
    description:
      'A comprehensive reentry program providing support, resources, and opportunities for individuals transitioning back into the community.',
    website: 'https://opendoorsri.org',
    logo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20minimalist%20logo%20for%20Open%20Doors%20RI%20organization%20with%20door%20symbol%20and%20clean%20typography&image_size=square',
    services: [
      'Job placement assistance',
      'Housing support',
      'Educational programs',
      'Mental health services',
    ],
    impact: '500+ individuals supported annually',
  },
  {
    id: 2,
    name: 'Reentry Campus Program',
    description:
      'An innovative campus-based program focused on education, skill development, and community integration for formerly incarcerated individuals.',
    website: 'https://www.reentrycampusprogram.org/',
    logo: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20logo%20for%20Reentry%20Campus%20Program%20with%20graduation%20cap%20and%20building%20elements&image_size=square',
    services: [
      'College preparation',
      'Vocational training',
      'Life skills workshops',
      'Career counseling',
    ],
    impact: '85% graduation rate',
  },
];

const partnershipBenefits = [
  {
    icon: Users,
    title: 'Community Impact',
    description: "Join a network of organizations making real change in people's lives",
  },
  {
    icon: Heart,
    title: 'Shared Mission',
    description: 'Align with our values of empowerment, support, and community building',
  },
  {
    icon: Handshake,
    title: 'Collaborative Growth',
    description: 'Expand your reach and impact through strategic partnerships',
  },
];

export function Partners() {
  return (
    <section id="partners" className="bg-gradient-to-b from-neutral-900 to-primary-900 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading level={2} className="mb-6 text-white" gradient>
            Our Community Partners
          </Heading>
          <Text size="lg" className="mx-auto max-w-3xl text-white/80">
            We collaborate with outstanding organizations that share our commitment to empowering
            youth and strengthening communities.
          </Text>
        </motion.div>

        {/* Partner Organizations */}
        <motion.div
          className="mb-16 grid gap-8 lg:grid-cols-2"
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
              <GlassCard className="h-full p-8" variant="dark">
                <div className="mb-6 flex items-start gap-6">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border border-white/20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <Heading level={3} className="text-white">
                        {partner.name}
                      </Heading>
                      <motion.a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-400 transition-colors hover:text-accent-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Visit ${partner.name} website`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                    </div>
                    <div className="inline-block rounded-full bg-accent-500/20 px-3 py-1 text-sm text-accent-400">
                      {partner.impact}
                    </div>
                  </div>
                </div>

                <Text className="mb-6 text-white/80">{partner.description}</Text>

                <div className="mb-6">
                  <Text className="mb-3 font-semibold text-white">Key Services:</Text>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {partner.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-center gap-2 text-white/70">
                        <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary-400" />
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
                  <ExternalLink className="h-4 w-4" />
                </GlassButton>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          className="mb-16 grid gap-6 md:grid-cols-3"
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
              <GlassCard className="h-full p-6 text-center" variant="default">
                <benefit.icon className="mx-auto mb-4 h-12 w-12 text-accent-400" />
                <Heading level={4} className="mb-3 text-white">
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
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8" variant="dark">
            <div className="mb-8 text-center">
              <Heading level={3} className="mb-4 text-white">
                Become a Partner
              </Heading>
              <Text className="mx-auto max-w-2xl text-white/80">
                Join our network of community partners and help us create lasting positive change.
                Together, we can empower more youth and strengthen our communities.
              </Text>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div>
                <Heading level={4} className="mb-4 text-white">
                  Get In Touch
                </Heading>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/80">
                    <Mail className="h-5 w-5 text-accent-400" />
                    <Text size="sm">partnerships@leadbyexample.org</Text>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone className="h-5 w-5 text-accent-400" />
                    <Text size="sm">(401) 555-0123</Text>
                  </div>
                </div>
              </div>

              {/* Partnership Types */}
              <div>
                <Heading level={4} className="mb-4 text-white">
                  Partnership Opportunities
                </Heading>
                <ul className="space-y-2">
                  {[
                    'Program collaboration',
                    'Resource sharing',
                    'Event partnerships',
                    'Funding opportunities',
                  ].map((opportunity, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/70">
                      <div className="h-2 w-2 rounded-full bg-secondary-400" />
                      <Text size="sm">{opportunity}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <GlassButton variant="primary" size="lg">
                <Mail className="h-5 w-5" />
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
  );
}
