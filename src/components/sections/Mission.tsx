import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Heading, Text } from '@/components/ui/index';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const missionPoints = [
  {
    icon: Target,
    title: 'Breaking the Pipeline',
    description: 'Interrupting the school-to-prison pipeline through early intervention and comprehensive support systems.',
  },
  {
    icon: Users,
    title: 'Mentorship & Guidance',
    description: 'Providing one-on-one mentorship and positive role models to help youth navigate challenges and opportunities.',
  },
  {
    icon: Award,
    title: 'Educational Excellence',
    description: 'Supporting academic achievement through tutoring, resources, and college preparation programs.',
  },
  {
    icon: TrendingUp,
    title: 'Pathways to Success',
    description: 'Creating sustainable pathways to employment, higher education, and community leadership.',
  },
];

export function Mission() {
  return (
    <section id="mission" className="section-padding bg-gradient-to-b from-primary-800 to-royal-900">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Heading level={2} className="text-white mb-6" gradient>
            Our Mission
          </Heading>
          <Text size="lg" className="text-white/80 max-w-3xl mx-auto">
            Lead By Example is dedicated to breaking the school-to-prison pipeline by providing 
            comprehensive support, mentorship, and educational opportunities to at-risk youth in our communities.
          </Text>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 h-full hover-lift" variant="dark">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                      <point.icon className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      {point.title}
                    </h3>
                    <Text className="text-white/70">
                      {point.description}
                    </Text>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8" variant="dark">
            <Text size="lg" className="text-white/90 text-center leading-relaxed">
              Through evidence-based programs and community partnerships, we create pathways to success 
              that empower young people to reach their full potential. Our holistic approach addresses 
              the root causes of youth incarceration while building protective factors that lead to 
              long-term positive outcomes.
            </Text>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
