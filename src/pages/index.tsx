import Head from 'next/head';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Testimonials } from '@/components/sections/Testimonials';

export default function Home() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const interestOptions = [
    'Youth Programs',
    'Volunteer Opportunities', 
    'Fundraising Events',
    'Community Updates'
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for subscribing! We&rsquo;ll keep you updated on our impact.');
      setEmail('');
      setFirstName('');
      setInterests([]);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Lead By Example | Breaking the School-to-Prison Pipeline</title>
        <meta
          name="description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we're building stronger communities through opportunity and empowerment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leadbyexample.org/" />
        <meta property="og:title" content="Lead By Example | Breaking the School-to-Prison Pipeline" />
        <meta
          property="og:description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leadbyexample.org/" />
        <meta property="twitter:title" content="Lead By Example | Breaking the School-to-Prison Pipeline" />
        <meta
          property="twitter:description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration."
        />
        <meta property="twitter:image" content="/twitter-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main>
        {/* Hero Section with Current Fundraiser */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            {/* Main Hero Content */}
            <div className="max-w-4xl mx-auto mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                Lead By Example
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Breaking the School-to-Prison Pipeline
              </p>
              <p className="text-lg md:text-xl mb-12 text-primary-50 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                Providing mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we&rsquo;re building stronger communities through opportunity and empowerment.
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">500+</div>
                <div className="text-primary-100">Youth Served</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">87%</div>
                <div className="text-primary-100">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">15+</div>
                <div className="text-primary-100">Years Impact</div>
              </div>
            </div>

            {/* Current Fundraiser Card */}
            <div className="max-w-2xl mx-auto bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <div className="text-accent-400 font-semibold text-sm uppercase tracking-wide mb-2">Current Fundraiser</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">All Sides of Town Cookout 2025</h2>
              <p className="text-primary-50 mb-6">August 2, 2025 • Lincoln Woods Site A&B</p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">$6,250 raised</span>
                  <span className="text-sm font-medium">$10,000 goal</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-400 h-3 rounded-full animate-progress-fill" style={{'--progress-width': '62.5%'} as React.CSSProperties}></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-accent-400">62.5%</span>
                  <span className="text-primary-100 ml-2">Complete</span>
                </div>
              </div>

              <p className="text-primary-50 mb-8">
                Free food, haircuts, activities, and backpack giveaway for our community&rsquo;s youth and families.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Donate Now
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-primary-100 animate-fade-in-up" style={{animationDelay: '1s'}}>
              <p className="mb-2">📍 120 Hawkins Street, Providence, RI 02908</p>
              <p className="mb-2">📞 (401) 699-6544</p>
              <p>✉️ contact@leadbyexample.org</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Archive Section */}
        <section id="archive" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary-600 mb-4">Past Achievements</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Building on years of community impact
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Past Fundraiser 1 */}
              <div className="bg-white border border-primary-100 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">$8,500</div>
                    <div className="text-sm text-neutral-500">Raised</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Back to School Drive 2024</h3>
                <p className="text-neutral-600 mb-4">Provided school supplies and uniforms to 150+ students</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent-600 font-semibold">100% Goal Achieved</span>
                  <span className="text-neutral-500">Aug 2024</span>
                </div>
              </div>

              {/* Past Fundraiser 2 */}
              <div className="bg-white border border-primary-100 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary-600">$12,000</div>
                    <div className="text-sm text-neutral-500">Raised</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Holiday Hope Campaign 2023</h3>
                <p className="text-neutral-600 mb-4">Delivered holiday meals and gifts to 200+ families</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent-600 font-semibold">120% Goal Exceeded</span>
                  <span className="text-neutral-500">Dec 2023</span>
                </div>
              </div>

              {/* Past Fundraiser 3 */}
              <div className="bg-white border border-primary-100 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-primary-900 font-bold text-lg">✓</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent-600">$15,500</div>
                    <div className="text-sm text-neutral-500">Raised</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Community Center Renovation</h3>
                <p className="text-neutral-600 mb-4">Upgraded facilities to serve more youth programs</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent-600 font-semibold">103% Goal Achieved</span>
                  <span className="text-neutral-500">Jun 2023</span>
                </div>
              </div>
            </div>

            {/* Combined Impact */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Combined Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-2">$36,000+</div>
                  <div className="text-primary-600">Total Funds Raised</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-2">500+</div>
                  <div className="text-primary-600">Families Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-2">3</div>
                  <div className="text-primary-600">Major Milestones</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="py-24 bg-gradient-to-br from-primary-500 to-secondary-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Stay Connected</h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Get updates on our programs and upcoming events
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                {submitMessage ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-900 font-bold text-2xl">✓</span>
                    </div>
                    <p className="text-white text-lg" dangerouslySetInnerHTML={{ __html: submitMessage }}></p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                        fullWidth
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        fullWidth
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-white mb-3 block">
                        What interests you most? (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {interestOptions.map((interest) => (
                          <label
                            key={interest}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={interests.includes(interest)}
                              onChange={() => handleInterestToggle(interest)}
                              className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-offset-0"
                            />
                            <span className="text-white group-hover:text-accent-300 transition-colors">
                              {interest}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
                    </Button>

                    <p className="text-primary-100 text-sm text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-24 bg-neutral-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary-600 mb-4">Our Partners</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Working together for community transformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* Open Doors RI */}
              <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 border border-primary-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-700">Open Doors RI</h3>
                    <p className="text-neutral-600">Housing & Employment Support</p>
                  </div>
                </div>
                <p className="text-neutral-600 mb-6">
                  Providing housing and employment opportunities for formerly incarcerated individuals, helping them successfully reintegrate into our community.
                </p>
                <a
                  href="https://www.opendoorsri.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Reentry Campus Program */}
              <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 border border-primary-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-700">Reentry Campus Program</h3>
                    <p className="text-neutral-600">Education & Reintegration</p>
                  </div>
                </div>
                <p className="text-neutral-600 mb-6">
                  Focused on education and community reintegration, providing the tools and support needed for successful transitions back into society.
                </p>
                <a
                  href="https://www.reentrycampusprogram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-semibold transition-colors group"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Partnership CTA */}
            <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Become a Partner</h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                Join us in creating lasting change in our community. Together, we can break cycles and build brighter futures.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Organization Info */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Lead By Example</h3>
                <p className="text-primary-100 mb-6 max-w-md">
                  Breaking the school-to-prison pipeline through mentorship, education, and community support.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center text-primary-100">
                    <span className="mr-3">📍</span>
                    120 Hawkins Street, Providence, RI 02908
                  </p>
                  <p className="flex items-center text-primary-100">
                    <span className="mr-3">📞</span>
                    (401) 699-6544
                  </p>
                  <p className="flex items-center text-primary-100">
                    <span className="mr-3">✉️</span>
                    contact@leadbyexample.org
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#testimonials" className="text-primary-100 hover:text-accent-400 transition-colors">
                      Success Stories
                    </a>
                  </li>
                  <li>
                    <a href="#archive" className="text-primary-100 hover:text-accent-400 transition-colors">
                      Past Achievements
                    </a>
                  </li>
                  <li>
                    <a href="#newsletter" className="text-primary-100 hover:text-accent-400 transition-colors">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#partners" className="text-primary-100 hover:text-accent-400 transition-colors">
                      Our Partners
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center hover:bg-accent-500 transition-colors"
                    aria-label="Facebook"
                  >
                    <span className="text-lg">📘</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center hover:bg-accent-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <span className="text-lg">🐦</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center hover:bg-accent-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <span className="text-lg">📷</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-primary-200 text-sm mb-4 md:mb-0">
                © 2025 Lead By Example. All rights reserved.
              </div>
              <div className="text-primary-200 text-sm">
                Website by{' '}
                <a
                  href="https://www.straydog-syndications-llc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300 transition-colors font-medium"
                >
                  StrayDog Syndications LLC
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
