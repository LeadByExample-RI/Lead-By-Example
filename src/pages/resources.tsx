import { Navbar } from '@/components/layout/Navbar';
import ResourceLibrary from '@/components/ResourceLibrary';
import { Footer } from '@/components/sections/Footer';
import Head from 'next/head';

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>Resource Library | Lead By Example</title>
        <meta
          name="description"
          content="Access trauma-informed resources, guides, and educational materials designed to support youth and families on their journey to success."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leadbyexample.org/resources" />
        <meta property="og:title" content="Resource Library | Lead By Example" />
        <meta
          property="og:description"
          content="Access trauma-informed resources, guides, and educational materials for youth and families."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leadbyexample.org/resources" />
        <meta property="twitter:title" content="Resource Library | Lead By Example" />
        <meta
          property="twitter:description"
          content="Access trauma-informed resources, guides, and educational materials for youth and families."
        />
        <meta property="twitter:image" content="/twitter-image.jpg" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Page Header */}
        <section className="relative mt-16 bg-gradient-to-r from-royal-600 to-royal-500 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Resource Library</h1>
              <p className="mx-auto max-w-3xl text-xl text-royal-50 md:text-2xl">
                Trauma-informed resources and educational materials to support your journey to
                success
              </p>
            </div>
          </div>
        </section>

        {/* Resource Library Component */}
        <ResourceLibrary />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
