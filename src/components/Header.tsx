import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-cape-verde via-cape-verde-dark to-royal-purple shadow-2xl">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          
          {/* Logo & Site Name */}
          <div className="flex items-center gap-4">
            {/* Logo/Icon */}
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            
            {/* Site Name - "Lead by Example" */}
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-gold tracking-wide">
                Lead by Example
              </h1>
              <p className="text-xs md:text-sm text-gold-light italic hidden sm:block">
                Cape Verde Community Fundraising
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="/" 
               className="text-gold hover:text-gold-light font-semibold text-lg transition-colors duration-300 hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
               aria-label="Go to home page">
              Home
            </a>
            <a href="/fundraisers" 
               className="text-gold hover:text-gold-light font-semibold text-lg transition-colors duration-300 hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
               aria-label="View all fundraisers">
              Fundraisers
            </a>
            <a href="/community" 
               className="text-gold hover:text-gold-light font-semibold text-lg transition-colors duration-300 hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
               aria-label="Join our community">
              Community
            </a>
            <a href="/about" 
               className="text-gold hover:text-gold-light font-semibold text-lg transition-colors duration-300 hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1"
               aria-label="Learn about us">
              About
            </a>
            <a href="/contact" 
               className="bg-gold hover:bg-gold-dark text-royal-purple font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-gold focus-visible:ring-offset-2"
               aria-label="Contact us to get involved">
              Get Involved
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gold hover:text-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded p-1"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? (
              <XMarkIcon className="w-8 h-8" />
            ) : (
              <Bars3Icon className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cape-verde-dark border-t border-gold/20">
          <ul className="container mx-auto px-4 py-4 space-y-3">
            <li>
              <a 
                href="/" 
                className="block text-gold hover:text-gold-light transition-colors duration-300 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/fundraisers" 
                className="block text-gold hover:text-gold-light transition-colors duration-300 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fundraisers
              </a>
            </li>
            <li>
              <a 
                href="/community" 
                className="block text-gold hover:text-gold-light transition-colors duration-300 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="block text-gold hover:text-gold-light transition-colors duration-300 font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="block bg-gold hover:bg-gold-dark text-royal-purple font-bold py-3 px-6 rounded-full transition-all duration-300 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Involved
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
