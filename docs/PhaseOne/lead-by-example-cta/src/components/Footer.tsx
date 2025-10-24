import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-transparent to-neutral-900/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-gold">
              Lead By Example
            </h3>
            <p className="text-sm text-neutral-50/70 leading-relaxed">
              Breaking the school-to-prison pipeline through mentorship,
              community engagement, and positive action.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-gold-500/20 transition-colors"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="w-5 h-5 text-gold-500" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                'About Us',
                'Our Mission',
                'Programs',
                'Success Stories',
                'Get Involved',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-neutral-50/70 hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gold-500 group-hover:w-4 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-neutral-50/70">
                <MapPin className="w-5 h-5 text-verdean-500 flex-shrink-0 mt-0.5" />
                <span>
                  120 Hawkins Street
                  <br />
                  Providence, RI 02908
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-verdean-500 flex-shrink-0" />
                <a
                  href="tel:+14016996544"
                  className="text-neutral-50/70 hover:text-gold-500 transition-colors"
                >
                  (401) 699-6544
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-verdean-500 flex-shrink-0" />
                <a
                  href="mailto:contact@leadbyexample.org"
                  className="text-neutral-50/70 hover:text-gold-500 transition-colors"
                >
                  contact@leadbyexample.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter CTA */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-sm text-neutral-50/70">
              Subscribe to our newsletter for the latest updates and stories of
              change.
            </p>
            <button className="btn-secondary w-full">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-50/60">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <span>© {currentYear} Lead By Example.</span>
              <Heart className="w-4 h-4 text-gold-500 animate-pulse" />
              <span>All rights reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="hover:text-gold-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-gold-500 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-gold-500 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Developer Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-6 border-t border-white/5 text-center"
          >
            <p className="text-xs text-neutral-50/40">
              Website designed and developed with{' '}
              <Heart className="inline w-3 h-3 text-gold-500" /> by{' '}
              <a
                href="https://www.straydog-syndications-llc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500/70 hover:text-gold-500 transition-colors font-medium"
              >
                StrayDog Syndications LLC
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-verdean-500 via-gold-500 to-royal-500 opacity-50" />
    </footer>
  );
}
