'use client';

import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-black/50 to-transparent pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Lead By <span className="text-gradient">Example</span>
            </h3>
            <p className="text-white/70 leading-relaxed">
              Breaking the school-to-prison pipeline through mentorship, community engagement, 
              and positive action.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-3 hover:bg-white/15 transition-all rounded-lg group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-gold-500 transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-3 hover:bg-white/15 transition-all rounded-lg group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-gold-500 transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-3 hover:bg-white/15 transition-all rounded-lg group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white/70 group-hover:text-gold-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gold-500">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-white/70 hover:text-gold-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-gold-500 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#archive" className="text-white/70 hover:text-gold-500 transition-colors">
                  Past Events
                </a>
              </li>
              <li>
                <a href="#partners" className="text-white/70 hover:text-gold-500 transition-colors">
                  Our Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gold-500">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>120 Hawkins Street<br />Providence, RI 02908</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a 
                  href="tel:4016996544" 
                  className="text-white/70 hover:text-gold-500 transition-colors"
                >
                  (401) 699-6544
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a 
                  href="mailto:contact@leadbyexample.org"
                  className="text-white/70 hover:text-gold-500 transition-colors"
                >
                  contact@leadbyexample.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gold-500">Stay Updated</h4>
            <p className="text-white/70 text-sm">
              Subscribe to our newsletter for the latest updates and events.
            </p>
            <a href="#newsletter" className="btn-primary inline-flex w-full justify-center">
              Subscribe Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Lead By Example. All rights reserved.
            </p>

            {/* Developer credit */}
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>Developed with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <a
                href="https://www.straydog-syndications-llc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 hover:text-gold-400 font-semibold transition-colors"
              >
                StrayDog Syndications LLC
              </a>
            </div>

            {/* Legal links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-gold-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-gold-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
