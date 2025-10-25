import { Testimonials } from '@/components/sections/Testimonials';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Head from 'next/head';
import React, { useState } from 'react';

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
    'Community Updates',
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
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
        <meta
          property="og:title"
          content="Lead By Example | Breaking the School-to-Prison Pipeline"
        />
        <meta
          property="og:description"
          content="Lead By Example provides mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leadbyexample.org/" />
        <meta
          property="twitter:title"
          content="Lead By Example | Breaking the School-to-Prison Pipeline"
        />
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
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-float rounded-full bg-accent-500 mix-blend-multiply blur-xl filter"></div>
            <div
              className="absolute right-1/4 top-3/4 h-64 w-64 animate-float rounded-full bg-secondary-400 mix-blend-multiply blur-xl filter"
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/2 h-64 w-64 animate-float rounded-full bg-primary-300 mix-blend-multiply blur-xl filter"
              style={{ animationDelay: '4s' }}
            ></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
            {/* Main Hero Content */}
            <div className="mx-auto mb-12 max-w-4xl">
              <h1 className="mb-6 animate-fade-in-up text-5xl font-bold md:text-7xl">
                Lead By Example
              </h1>
              <p
                className="mb-8 animate-fade-in-up text-xl text-primary-100 md:text-2xl"
                style={{ animationDelay: '0.2s' }}
              >
                Breaking the School-to-Prison Pipeline
              </p>
              <p
                className="mx-auto mb-12 max-w-3xl animate-fade-in-up text-lg text-primary-50 md:text-xl"
                style={{ animationDelay: '0.4s' }}
              >
                Providing mentorship, education, and support to at-risk youth, creating pathways to
                success instead of incarceration. Together, we&rsquo;re building stronger
                communities through opportunity and empowerment.
              </p>
            </div>

            {/* Key Statistics */}
            <div
              className="mb-12 grid animate-fade-in-up grid-cols-1 gap-8 md:grid-cols-3"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="mb-2 text-3xl font-bold text-accent-400 md:text-4xl">500+</div>
                <div className="text-primary-100">Youth Served</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="mb-2 text-3xl font-bold text-accent-400 md:text-4xl">87%</div>
                <div className="text-primary-100">Success Rate</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="mb-2 text-3xl font-bold text-accent-400 md:text-4xl">15+</div>
                <div className="text-primary-100">Years Impact</div>
              </div>
            </div>

            {/* Current Fundraiser Card */}
            <div
              className="mx-auto max-w-2xl animate-fade-in-up rounded-3xl border border-white/30 bg-white/15 p-8 shadow-2xl backdrop-blur-lg"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-400">
                Current Fundraiser
              </div>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                All Sides of Town Cookout 2025
              </h2>
              <p className="mb-6 text-primary-50">August 2, 2025 • Lincoln Woods Site A&B</p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">$6,250 raised</span>
                  <span className="text-sm font-medium">$10,000 goal</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/20">
                  <div
                    className="h-3 animate-progress-fill rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                    style={{ '--progress-width': '62.5%' } as React.CSSProperties}
                  ></div>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-2xl font-bold text-accent-400">62.5%</span>
                  <span className="ml-2 text-primary-100">Complete</span>
                </div>
              </div>

              <p className="mb-8 text-primary-50">
                Free food, haircuts, activities, and backpack giveaway for our community&rsquo;s
                youth and families.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  className="transform rounded-xl bg-accent-500 px-8 py-4 font-semibold text-primary-900 transition-all duration-300 hover:scale-105 hover:bg-accent-600"
                >
                  Donate Now
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="transform rounded-xl border-2 border-white/40 bg-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/30"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div
              className="mt-12 animate-fade-in-up text-primary-100"
              style={{ animationDelay: '1s' }}
            >
              <p className="mb-2">📍 120 Hawkins Street, Providence, RI 02908</p>
              <p className="mb-2">📞 (401) 699-6544</p>
              <p>✉️ contact@leadbyexample.org</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Archive Section */}
        <section id="archive" className="bg-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-primary-600">Past Achievements</h2>
              <p className="mx-auto max-w-2xl text-xl text-neutral-600">
                Building on years of community impact
              </p>
            </div>

            <div className="mb-12 grid gap-8 md:grid-cols-3">
              {/* Past Fundraiser 1 */}
              <div className="transform rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
                    <span className="text-lg font-bold text-white">✓</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">$8,500</div>
                    <div className="text-sm text-neutral-500">Raised</div>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary-700">
                  Back to School Drive 2024
                </h3>
                <p className="mb-4 text-neutral-600">
                  Provided school supplies and uniforms to 150+ students
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-accent-600">100% Goal Achieved</span>
                  <span className="text-neutral-500">Aug 2024</span>
                </div>
              </div>

              {/* Past Fundraiser 2 */}
              <div className="transform rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600">
                    <span className="text-lg font-bold text-white">✓</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-secondary-600">$12,000</div>
                    <div className="text-sm text-neutral-500">Raised</div>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary-700">
                  Holiday Hope Campaign 2023
                </h3>
                <p className="mb-4 text-neutral-600">
                  Delivered holiday meals and gifts to 200+ families
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-accent-600">120% Goal Exceeded</span>
                  <span className="text-neutral-500">Dec 2023</span>
                </div>
              </div>

              {/* Past Fundraiser 3 */}
              <div className="transform rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600">
                    <span className="text-lg font-bold text-primary-900">✓</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent-600">$15,500</div>
                    <div className="text-sm text-neutral-500">Raised</div>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary-700">
                  Community Center Renovation
                </h3>
                <p className="mb-4 text-neutral-600">
                  Upgraded facilities to serve more youth programs
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-accent-600">103% Goal Achieved</span>
                  <span className="text-neutral-500">Jun 2023</span>
                </div>
              </div>
            </div>

            {/* Combined Impact */}
            <div className="rounded-3xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-primary-700">Combined Impact</h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                  <div className="mb-2 text-3xl font-bold text-accent-600">$36,000+</div>
                  <div className="text-primary-600">Total Funds Raised</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-accent-600">500+</div>
                  <div className="text-primary-600">Families Served</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-accent-600">3</div>
                  <div className="text-primary-600">Major Milestones</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section
          id="newsletter"
          className="bg-gradient-to-br from-primary-500 to-secondary-600 py-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">Stay Connected</h2>
              <p className="mx-auto max-w-2xl text-xl text-primary-100">
                Get updates on our programs and upcoming events
              </p>
            </div>

            <div className="mx-auto max-w-2xl">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
                {submitMessage ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500">
                      <span className="text-2xl font-bold text-primary-900">✓</span>
                    </div>
                    <p
                      className="text-lg text-white"
                      dangerouslySetInnerHTML={{ __html: submitMessage }}
                    ></p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
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
                      <label className="mb-3 block text-sm font-medium text-white">
                        What interests you most? (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {interestOptions.map((interest) => (
                          <label
                            key={interest}
                            className="group flex cursor-pointer items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              checked={interests.includes(interest)}
                              onChange={() => handleInterestToggle(interest)}
                              className="h-5 w-5 rounded border-2 border-white/30 bg-white/10 text-accent-500 focus:ring-2 focus:ring-accent-500 focus:ring-offset-0"
                            />
                            <span className="text-white transition-colors group-hover:text-accent-300">
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
                      className="w-full transform rounded-xl bg-accent-500 py-4 font-semibold text-primary-900 transition-all duration-300 hover:scale-105 hover:bg-accent-600 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
                    </Button>

                    <p className="text-center text-sm text-primary-100">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="bg-neutral-100 py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-primary-600">Our Partners</h2>
              <p className="mx-auto max-w-2xl text-xl text-neutral-600">
                Working together for community transformation
              </p>
            </div>

            <div className="mx-auto mb-12 grid max-w-4xl gap-8 md:grid-cols-2">
              {/* Open Doors RI */}
              <div className="transform rounded-2xl border border-primary-100 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
                    <span className="text-xl font-bold text-white">🏠</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-700">Open Doors RI</h3>
                    <p className="text-neutral-600">Housing & Employment Support</p>
                  </div>
                </div>
                <p className="mb-6 text-neutral-600">
                  Providing housing and employment opportunities for formerly incarcerated
                  individuals, helping them successfully reintegrate into our community.
                </p>
                <a
                  href="https://www.opendoorsri.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Visit Website
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Reentry Campus Program */}
              <div className="transform rounded-2xl border border-primary-100 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600">
                    <span className="text-xl font-bold text-white">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-700">Reentry Campus Program</h3>
                    <p className="text-neutral-600">Education & Reintegration</p>
                  </div>
                </div>
                <p className="mb-6 text-neutral-600">
                  Focused on education and community reintegration, providing the tools and support
                  needed for successful transitions back into society.
                </p>
                <a
                  href="https://www.reentrycampusprogram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center font-semibold text-secondary-600 transition-colors hover:text-secondary-700"
                >
                  Visit Website
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Partnership CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-primary-700">Become a Partner</h3>
              <p className="mx-auto mb-6 max-w-2xl text-neutral-600">
                Join us in creating lasting change in our community. Together, we can break cycles
                and build brighter futures.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="transform rounded-xl bg-primary-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary-700"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary-800 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid gap-8 md:grid-cols-4">
              {/* Organization Info */}
              <div className="md:col-span-2">
                <h3 className="mb-4 text-2xl font-bold">Lead By Example</h3>
                <p className="mb-6 max-w-md text-primary-100">
                  Breaking the school-to-prison pipeline through mentorship, education, and
                  community support.
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
                <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#testimonials"
                      className="text-primary-100 transition-colors hover:text-accent-400"
                    >
                      Success Stories
                    </a>
                  </li>
                  <li>
                    <a
                      href="#archive"
                      className="text-primary-100 transition-colors hover:text-accent-400"
                    >
                      Past Achievements
                    </a>
                  </li>
                  <li>
                    <a
                      href="#newsletter"
                      className="text-primary-100 transition-colors hover:text-accent-400"
                    >
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#partners"
                      className="text-primary-100 transition-colors hover:text-accent-400"
                    >
                      Our Partners
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 transition-colors hover:bg-accent-500"
                    aria-label="Facebook"
                  >
                    <span className="text-lg">📘</span>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 transition-colors hover:bg-accent-500"
                    aria-label="Twitter"
                  >
                    <span className="text-lg">🐦</span>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 transition-colors hover:bg-accent-500"
                    aria-label="Instagram"
                  >
                    <span className="text-lg">📷</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col items-center justify-between border-t border-primary-700 pt-8 md:flex-row">
              <div className="mb-4 text-sm text-primary-200 md:mb-0">
                © 2025 Lead By Example. All rights reserved.
              </div>
              <div className="text-sm text-primary-200">
                Website by{' '}
                <a
                  href="https://www.straydog-syndications-llc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-400 transition-colors hover:text-accent-300"
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
