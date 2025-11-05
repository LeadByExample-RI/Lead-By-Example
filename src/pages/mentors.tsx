import { Navbar } from '@/components/layout/Navbar';
import MentorMatching from '@/components/MentorMatching';
import { Footer } from '@/components/sections/Footer';
import Head from 'next/head';

export default function MentorsPage() {
  return (
    <>
      <Head>
        <title>Our Mentors | Lead By Example</title>
        <meta
          name="description"
          content="Meet our mentors with lived experience who are making a difference in the community. Connect with mentors who understand your journey and can guide you to success."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leadbyexample.org/mentors" />
        <meta property="og:title" content="Our Mentors | Lead By Example" />
        <meta
          property="og:description"
          content="Meet our mentors with lived experience who are making a difference in the community."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leadbyexample.org/mentors" />
        <meta property="twitter:title" content="Our Mentors | Lead By Example" />
        <meta
          property="twitter:description"
          content="Meet our mentors with lived experience who are making a difference in the community."
        />
        <meta property="twitter:image" content="/twitter-image.jpg" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Page Header */}
        <section className="relative mt-16 bg-gradient-to-r from-verdean-600 to-verdean-500 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Meet Our Mentors</h1>
              <p className="mx-auto max-w-3xl text-xl text-verdean-50 md:text-2xl">
                Men and women with lived experience, leading by example and making a difference in
                our community
              </p>
            </div>
          </div>
        </section>

        {/* Mentor Matching Component */}
        <MentorMatching />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
