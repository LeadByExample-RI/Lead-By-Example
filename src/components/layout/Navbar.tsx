'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MapPlaceholder } from '../MapPlaceholder';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapData, setMapData] = useState<{
    locationName?: string;
    locationAddress?: string;
    locationLat?: number;
    locationLng?: number;
  }>({});

  // Navigation links configuration
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '/mentors', label: 'Mentors' },
    { href: '/resources', label: 'Resources' },
    { href: '/events', label: 'Events' },
    { href: '#mission', label: 'Mission' },
    { href: '#success-stories', label: 'Success Stories' },
    { href: '#get-involved', label: 'Get Involved' },
  ];

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
      setIsMobileMenuOpen(false);
    } else {
      // For regular page navigation, just close mobile menu
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll detection for enhanced glassmorphism and active section
  useEffect(() => {
    const sections = [
      '#home',
      '#mission',
      '#success-stories',
      '#impact',
      '#get-involved',
      '#partners',
      '#footer',
    ];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for custom map events from other components
  useEffect(() => {
    const handleShowMap = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { locationName, locationAddress, locationLat, locationLng } = customEvent.detail;
      setMapData({ locationName, locationAddress, locationLat, locationLng });
      setIsMapOpen(true);
    };

    const handleHideMap = () => {
      setIsMapOpen(false);
      setMapData({}); // Clear map data on close
    };

    window.addEventListener('showMapPlaceholder', handleShowMap);
    window.addEventListener('hideMapPlaceholder', handleHideMap);
    return () => {
      window.removeEventListener('showMapPlaceholder', handleShowMap);
      window.removeEventListener('hideMapPlaceholder', handleHideMap);
    };
  }, []);

  // Handle map close with proper cleanup
  const handleMapClose = () => {
    setIsMapOpen(false);
    setMapData({});
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect-strong shadow-glass-dark navbar-glass-scrolled'
          : 'glass-effect-dark navbar-glass'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with enhanced hover effects */}
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="group flex items-center space-x-2">
              <span className="font-heading text-2xl font-bold text-gold transition-all duration-300 group-hover:opacity-80">
                Lead By Example
              </span>
            </Link>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0 blur-xl"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative rounded-lg px-4 py-2 transition-all duration-300 ${
                    isActive ? 'bg-gradient-to-r from-gold/30 to-gold/50' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Gradient background that appears on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content wrapper */}
                  <span className="relative z-10 flex items-center gap-2 font-medium text-off-white/90 transition-colors duration-200 group-hover:text-gold">
                    {link.label}
                  </span>

                  {/* Floating particle effects (5 particles in circle pattern) */}
                  {[...Array(5)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold/60"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        x: [0, Math.cos((particleIndex * 72 * Math.PI) / 180) * 30],
                        y: [0, Math.sin((particleIndex * 72 * Math.PI) / 180) * 30],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: particleIndex * 0.2 + index * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </motion.a>
              );
            })}
          </div>

          {/* CTA Button - Desktop with enhanced hover effects */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <button className="glass-button relative overflow-hidden rounded-full px-6 py-2 font-semibold text-off-white transition-all duration-300">
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gold/0"
                  whileHover={{ borderColor: 'rgba(255, 215, 0, 0.8)' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Background pulse */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <span className="relative z-10">Donate Now</span>
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="glass-button rounded-lg p-2 text-off-white md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="glass-effect-dark border-t border-white/20 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3 px-4 py-6">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`group relative block overflow-hidden rounded-lg px-4 py-3 transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-r from-gold/30 to-gold/50' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Gradient background that appears on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Link text */}
                    <span className="relative z-10 font-medium text-off-white/90 transition-colors duration-200 group-hover:text-gold">
                      {link.label}
                    </span>

                    {/* Floating particle effects (3 particles for mobile) */}
                    {[...Array(3)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold/60"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          x: [0, Math.cos((particleIndex * 120 * Math.PI) / 180) * 20],
                          y: [0, Math.sin((particleIndex * 120 * Math.PI) / 180) * 20],
                          opacity: [0, 0.8, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: particleIndex * 0.3 + index * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </motion.a>
                );
              })}

              {/* Mobile CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <button className="glass-button relative w-full overflow-hidden rounded-full py-3 font-semibold text-off-white transition-all duration-300">
                  {/* Background pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gold/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <span className="relative z-10">Donate Now</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Placeholder Modal */}
      <MapPlaceholder
        isOpen={isMapOpen}
        onClose={handleMapClose}
        locationName={mapData.locationName}
        locationAddress={mapData.locationAddress}
        locationLat={mapData.locationLat}
        locationLng={mapData.locationLng}
      />
    </nav>
  );
}
