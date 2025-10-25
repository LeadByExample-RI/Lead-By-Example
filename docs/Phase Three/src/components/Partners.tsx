'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Building2, GraduationCap, Mail, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { Partner } from '@/types';

const partners: Partner[] = [
  {
    id: '1',
    name: 'Open Doors RI',
    description: 'Providing housing and employment support for formerly incarcerated individuals seeking to rebuild their lives.',
    url: 'https://www.opendoorsri.org',
  },
  {
    id: '2',
    name: 'Reentry Campus Program',
    description: 'Offering education and community reintegration services to help individuals successfully transition back into society.',
    url: 'https://www.reentrycampusprogram.org',
  },
];

export function Partners() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Our <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Together, we're building a stronger community through collaboration and shared vision
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card p-8 card-lift group block"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-accent-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {index === 0 ? (
                    <Building2 className="w-8 h-8 text-royal-900" />
                  ) : (
                    <GraduationCap className="w-8 h-8 text-royal-900" />
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold group-hover:text-gradient transition-colors">
                      {partner.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 md:p-12 text-center border-2 border-gold-500/30"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-accent-gold mb-4">
              <Mail className="w-8 h-8 text-royal-900" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold">
              Want to Partner With Us?
            </h3>
            
            <p className="text-white/80 text-lg">
              Join our network of organizations working to break the school-to-prison pipeline 
              and create positive change in our communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="mailto:contact@leadbyexample.org"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:4016996544"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <span>Call Us: (401) 699-6544</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
