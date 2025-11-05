'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPlaceholder } from '../MapPlaceholder'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [mapData, setMapData] = useState<{
    locationName?: string
    locationAddress?: string
    locationLat?: number
    locationLng?: number
  }>({})

  // Navigation links configuration
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#mission', label: 'Our Mission' },
    { href: '#success-stories', label: 'Success Stories' },
    { href: '#impact', label: 'Impact' },
    { href: '#get-involved', label: 'Get Involved' },
    { href: '#partners', label: 'Partners' },
  ]

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(href)
      setIsMobileMenuOpen(false)
    }
  }

  // Scroll detection for enhanced glassmorphism and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Detect active section
      const sections = navLinks.map(link => link.href)
      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Listen for custom map events from other components
  useEffect(() => {
    const handleShowMap = (event: CustomEvent) => {
      const { locationName, locationAddress, locationLat, locationLng } = event.detail
      setMapData({ locationName, locationAddress, locationLat, locationLng })
      setIsMapOpen(true)
    }

    const handleHideMap = () => {
      setIsMapOpen(false)
    }

    window.addEventListener('showMapPlaceholder' as any, handleShowMap)
    window.addEventListener('hideMapPlaceholder' as any, handleHideMap)
    return () => {
      window.removeEventListener('showMapPlaceholder' as any, handleShowMap)
      window.removeEventListener('hideMapPlaceholder' as any, handleHideMap)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 navbar-shimmer transition-all duration-500 ${
        isScrolled
          ? 'glass-effect-strong shadow-glass-dark navbar-glass-scrolled'
          : 'glass-effect-dark navbar-glass'
      }`}
    >
      {/* Animated gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0.3 : 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold/5 via-transparent to-royal-purple/5" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced hover effects */}
          <motion.div
            className='relative flex-shrink-0'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <span className="text-2xl font-heading font-bold text-gold transition-all duration-300 group-hover:opacity-80">
                Lead By Example
              </span>
            </Link>
            
            {/* Glow effect on hover */}
            <motion.div
              className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 blur-xl opacity-0'
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href
              
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
                    className='absolute inset-0 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0'
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content wrapper */}
                  <span className='relative z-10 flex items-center gap-2 font-medium text-off-white/90 transition-colors duration-200 group-hover:text-gold'>
                    {link.label}
                  </span>
                  
                  {/* Floating particle effects (5 particles in circle pattern) */}
                  {[...Array(5)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className='pointer-events-none absolute h-1 w-1 rounded-full bg-gold/60'
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
              )
            })}
          </div>

          {/* CTA Button - Desktop with enhanced hover effects */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className='group relative'
            >
              <button
                className="relative overflow-hidden glass-button text-off-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
              >
                {/* Animated border glow */}
                <motion.div
                  className='absolute inset-0 rounded-full border-2 border-gold/0'
                  whileHover={{ borderColor: 'rgba(255, 215, 0, 0.8)' }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Background pulse */}
                <motion.div
                  className='absolute inset-0 bg-gold/20 rounded-full'
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
                
                <span className='relative z-10'>Donate Now</span>
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-button text-off-white"
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
            className="md:hidden glass-effect-dark border-t border-white/20 backdrop-blur-2xl"
            style={{
              background: 'linear-gradient(to bottom, rgba(1, 81, 76, 0.3), rgba(75, 48, 106, 0.25))',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient overlay for mobile menu */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold/5 to-transparent" />
            </div>
            
            <div className="px-4 py-6 space-y-3 relative z-10">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href
                
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`group relative block px-4 py-3 rounded-lg transition-all duration-300 overflow-hidden ${
                      isActive ? 'bg-gradient-to-r from-gold/30 to-gold/50' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Gradient background that appears on hover */}
                    <motion.div
                      className='absolute inset-0 rounded-lg bg-gradient-to-r from-gold/20 to-gold/40 opacity-0'
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Link text */}
                    <span className="relative z-10 font-medium text-off-white/90 group-hover:text-gold transition-colors duration-200">
                      {link.label}
                    </span>
                    
                    {/* Floating particle effects (3 particles for mobile) */}
                    {[...Array(3)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className='pointer-events-none absolute h-1 w-1 rounded-full bg-gold/60'
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
                )
              })}
              
              {/* Mobile CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='group relative mt-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <button
                  className="relative overflow-hidden w-full glass-button text-off-white font-semibold py-3 rounded-full transition-all duration-300"
                >
                  {/* Background pulse */}
                  <motion.div
                    className='absolute inset-0 bg-gold/20 rounded-full'
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
                  
                  <span className='relative z-10'>Donate Now</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Placeholder Modal */}
      <MapPlaceholder
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        locationName={mapData.locationName}
        locationAddress={mapData.locationAddress}
        locationLat={mapData.locationLat}
        locationLng={mapData.locationLng}
      />
    </nav>
  )
}
