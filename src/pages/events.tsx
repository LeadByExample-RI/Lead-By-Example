import CommunityCalendar from '@/components/CommunityCalendar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import Head from 'next/head';

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Community Events | Lead By Example</title>
        <meta
          name="description"
          content="Join us for cookouts, workshops, sports events, mentorship sessions, and community gatherings. Building stronger connections, one event at a time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leadbyexample.org/events" />
        <meta property="og:title" content="Community Events | Lead By Example" />
        <meta
          property="og:description"
          content="Join us for cookouts, workshops, sports events, and community gatherings."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leadbyexample.org/events" />
        <meta property="twitter:title" content="Community Events | Lead By Example" />
        <meta
          property="twitter:description"
          content="Join us for cookouts, workshops, sports events, and community gatherings."
        />
        <meta property="twitter:image" content="/twitter-image.jpg" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Page Header */}
        <section className="relative mt-16 bg-gradient-to-r from-gold-600 to-gold-500 py-20 text-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Community Events</h1>
              <p className="mx-auto max-w-3xl text-xl text-gray-800 md:text-2xl">
                Join us for cookouts, workshops, sports events, and community gatherings that bring
                us together
              </p>
            </div>
          </div>
        </section>

        {/* Community Calendar Component */}
        <CommunityCalendar />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
