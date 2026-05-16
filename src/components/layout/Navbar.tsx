'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Users,
  Target,
  FileText,
  TrendingUp,
  Handshake,
  Mail,
  Calendar,
  MessageSquare,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tooltip } from '@/components/ui/Tooltip';

export function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === 'admin';
  const [navVariant, setNavVariant] = useState<'transparent' | 'solid'>('transparent');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const baseNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/mentors', label: 'Mentors', icon: Users },
    { href: '/resources', label: 'Resources', icon: FileText },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
    { href: '/#mission', label: 'Mission', icon: Target },
    { href: '/#journey', label: 'Transformation', icon: TrendingUp },
    { href: '/#partners', label: 'Partners', icon: Handshake },
  ];

  const navLinks = isAdmin
    ? [...baseNavLinks, { href: '/admin', label: 'Admin', icon: LayoutDashboard }]
    : baseNavLinks;

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    // Handle homepage sections (format: /#section)
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.substring(1); // Get '#section' from '/#section'
      
      // If we're not on the homepage, navigate there first
      if (router.pathname !== '/') {
        router.push(href).then(() => {
          // After navigation, scroll to the section
          setTimeout(() => {
            const element = document.querySelector(sectionId);
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        });
      } else {
        // Already on homepage, just scroll
        const element = document.querySelector(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
    // For regular page navigation (/, /mentors, /resources, /events), Next.js Link handles it
  };

  // IntersectionObserver: switches navbar between transparent (dark sections)
  // and solid (light sections) as the user scrolls through the page.
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const theme = entry.target.getAttribute('data-section-theme');
          setNavVariant(theme === 'light' ? 'solid' : 'transparent');
        });
      },
      // Detection zone: just below the navbar, covers the top ~30% of viewport
      { rootMargin: '-79px 0px -65% 0px' }
    );

    document.querySelectorAll('[data-section-theme]').forEach((el) =>
      sectionObserver.observe(el)
    );

    // Separate passive scroll listener only for active-link highlighting
    const activeSections = [
      '#home', '#mission', '#journey', '#partners', '#footer',
    ];
    const handleScroll = () => {
      for (const id of activeSections) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        navVariant === 'solid'
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
              const IconComponent = link.icon;

              return (
                <Tooltip
                  key={link.href}
                  content={link.label}
                  position="bottom"
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`group relative rounded-lg px-4 py-2 transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-r from-gold/30 to-gold/50' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    aria-label={link.label}
                  >
                    {/* Gradient background that appears on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content wrapper */}
                    <span className="relative z-10 flex items-center gap-2 font-medium text-off-white/90 transition-colors duration-200 group-hover:text-gold">
                      <IconComponent className={`h-6 w-6 transition-colors duration-300 group-hover:text-[#FFD700] ${navVariant === 'solid' ? 'text-[#FFD700]' : ''}`} />
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
                </Tooltip>
              );
            })}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => window.dispatchEvent(new Event('open-donation-modal'))}
              className="relative overflow-hidden rounded-full bg-[#FFD700] px-6 py-2.5 font-bold text-gray-900 shadow-lg transition-all duration-300 hover:bg-yellow-300"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Subtle ripple pulse to draw the eye */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full bg-white/40"
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Help Make It Happen</span>
            </motion.button>
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
                const IconComponent = link.icon;

                return (
                  <Tooltip
                    key={link.href}
                    content={link.label}
                    position="right"
                  >
                    <motion.a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`group relative block overflow-hidden rounded-lg px-4 py-3 transition-all duration-300 ${
                        isActive ? 'bg-gradient-to-r from-gold/30 to-gold/50' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      aria-label={link.label}
                    >
                      {/* Gradient background that appears on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Link text */}
                      <span className="relative z-10 flex items-center gap-3 font-medium text-off-white/90 transition-colors duration-200 group-hover:text-gold">
                        <IconComponent className={`h-6 w-6 shrink-0 transition-colors duration-300 group-hover:text-[#FFD700] ${navVariant === 'solid' ? 'text-[#FFD700]' : ''}`} />
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
                  </Tooltip>
                );
              })}

              {/* Mobile CTA Button */}
              <motion.button
                onClick={() => window.dispatchEvent(new Event('open-donation-modal'))}
                className="relative mt-4 w-full overflow-hidden rounded-full bg-[#FFD700] py-3 font-bold text-gray-900 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full bg-white/40"
                  animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="relative z-10">Help Make It Happen</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
