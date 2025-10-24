import { motion } from 'framer-motion';
import { ExternalLink, Heart, Users, Building } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Partner {
  name: string;
  url: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const partners: Partner[] = [
  {
    name: 'Open Doors RI',
    url: 'https://www.opendoorsri.org',
    description:
      'Supporting individuals transitioning from incarceration with housing and employment services.',
    icon: Building,
  },
  {
    name: 'Reentry Campus Program',
    url: 'https://www.reentrycampusprogram.org',
    description:
      'Providing education and support for successful community reintegration.',
    icon: Users,
  },
];

export default function Partners() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-royal-900/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-4">
            <Heart className="w-5 h-5 text-gold-500" />
            <span className="text-sm font-medium text-gold-500">
              Community Partners
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-gradient-gold">Together</span> We Rise
          </h2>
          <p className="text-xl text-neutral-50/70 max-w-3xl mx-auto">
            We're proud to collaborate with like-minded organizations dedicated to
            breaking the school-to-prison pipeline and building stronger communities.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card-hover p-8 group block"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-verdean-500 to-verdean-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <partner.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold group-hover:text-gold-500 transition-colors">
                      {partner.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-neutral-50/50 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <p className="text-neutral-50/70 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-verdean-400 group-hover:text-verdean-300 transition-colors">
                    <span>Visit Website</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to action for partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Want to <span className="text-gradient-gold">Partner</span> With Us?
          </h3>
          <p className="text-xl text-neutral-50/70 max-w-2xl mx-auto mb-8">
            We're always looking to expand our network of organizations working
            toward positive community change. Let's collaborate!
          </p>
          <a href="mailto:contact@leadbyexample.org" className="btn-primary inline-block">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
