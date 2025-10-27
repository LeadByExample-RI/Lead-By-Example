import { Archive } from '@/components/sections/Archive';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Newsletter } from '@/components/sections/Newsletter';
import { Partners } from '@/components/sections/Partners';
import { Testimonials } from '@/components/sections/Testimonials';
import Head from 'next/head';

export default function Home() {
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
        <Hero
          title="Breaking the School-to-Prison Pipeline"
          description="Providing mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we're building stronger communities through opportunity and empowerment."
          primaryAction={{
            label: 'Donate Now',
            href: '#donate',
          }}
          secondaryAction={{
            label: 'Learn More',
            href: '#about',
          }}
        />

        {/* Testimonials Section - Success Stories Carousel */}
        <Testimonials />

        {/* Archive Section - Past Achievements */}
        <Archive />

        {/* Newsletter Section - Email Signup with Validation */}
        <Newsletter />

        {/* Partners Section - Community Organizations */}
        <Partners />

        {/* Footer - Contact Info & Links */}
        <Footer />
      </main>
    </>
  );
}
