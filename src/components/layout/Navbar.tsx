'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Navigation links configuration
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#fundraisers', label: 'Fundraisers' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  // Scroll detection for enhanced glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cape-verde-dark/80 backdrop-blur-xl shadow-glass'
          : 'bg-cape-verde-dark/60 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-heading font-bold text-gold transition-all duration-300 group-hover:opacity-80">
              Lead By Example
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-off-white/90 hover:text-gold font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <button
              className="glass-button text-off-white font-semibold px-6 py-2 rounded-full hover:shadow-gold transition-all duration-300"
            >
              Donate Now
            </button>
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
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-cape-verde-dark/95 border-t border-white/10 backdrop-blur-xl"
        >
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-off-white/90 hover:text-gold font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <button
              className="w-full glass-button text-off-white font-semibold py-3 rounded-full hover:shadow-gold transition-all duration-300"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
