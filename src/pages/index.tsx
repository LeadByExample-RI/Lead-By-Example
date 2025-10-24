import Head from 'next/head';
import { Hero } from '@/components/sections/Hero';
import { Archive } from '@/components/sections/Archive';
import { Testimonials } from '@/components/sections/Testimonials';
import { Partners } from '@/components/sections/Partners';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lead By Example - Inspiring Change Through Action</title>
        <meta name="description" content="Empowering youth through community support, mentorship, and opportunities that create lasting positive change in our neighborhoods." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Lead By Example - Inspiring Change Through Action" />
        <meta property="og:description" content="Join us in empowering youth and strengthening communities through our fundraising initiatives and programs." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Archive Section */}
        <Archive />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Partners Section */}
        <Partners />

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}