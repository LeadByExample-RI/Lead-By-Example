import CommunityCalendar from '@/components/CommunityCalendar';
import DonationModal from '@/components/DonationModal';
import EvolutionJourney from '@/components/EvolutionJourney';
import { Navbar } from '@/components/layout/Navbar';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import MentorMatching from '@/components/MentorMatching';
import StripeProvider from '@/components/StripeProvider';
import ResourceLibrary from '@/components/ResourceLibrary';
import { Archive } from '@/components/sections/Archive';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Newsletter } from '@/components/sections/Newsletter';
import { Partners } from '@/components/sections/Partners';
import { Testimonials } from '@/components/sections/Testimonials';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapData, setMapData] = useState<{
    locationName?: string;
    locationAddress?: string;
    locationLat?: number;
    locationLng?: number;
  }>({});

  // Listen for custom map events from other components
  useEffect(() => {
    const handleShowMap = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { locationName, locationAddress, locationLat, locationLng } = customEvent.detail;
      setMapData({ locationName, locationAddress, locationLat, locationLng });
      setIsMapOpen(true);
    };

    const handleHideMap = () => {
      setIsMapOpen(false);
      setMapData({}); // Clear map data on close
    };

    window.addEventListener('showMapPlaceholder', handleShowMap);
    window.addEventListener('hideMapPlaceholder', handleHideMap);
    return () => {
      window.removeEventListener('showMapPlaceholder', handleShowMap);
      window.removeEventListener('hideMapPlaceholder', handleHideMap);
    };
  }, []);

  // Handle map close with proper cleanup
  const handleMapClose = () => {
    setIsMapOpen(false);
    setMapData({});
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

        {/* Icons and Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Favicon - Removed until icon files are created */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main>
        <Navbar />

        {/* Stripe Donation Modal */}
        <StripeProvider>
          <DonationModal
            isOpen={isDonationModalOpen}
            onClose={() => setIsDonationModalOpen(false)}
            initialAmount={50}
          />
        </StripeProvider>

        {/* Hero Section with Current Fundraiser */}
        <Hero
          title="Breaking the School-to-Prison Pipeline"
          description="Providing mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we're building stronger communities through opportunity and empowerment."
          primaryAction={{
            label: 'Donate Now',
            href: '#donate',
            onClick: () => setIsDonationModalOpen(true),
          }}
          secondaryAction={{
            label: 'Learn More',
            href: '#about',
          }}
        />

        {/* Evolution Journey - Visual Storytelling of Transformation */}
        <section id="journey" className="bg-gradient-to-b from-white to-gray-50">
          <EvolutionJourney />
        </section>

        {/* Mission Section - Our Purpose */}
        <Mission />

        {/* Testimonials Section - Success Stories Carousel */}
        <Testimonials />

        {/* Mentor Matching - Connect with Mentors */}
        <section id="mentors" className="bg-white">
          <MentorMatching />
        </section>

        {/* Resource Library - Educational Content */}
        <section id="resources" className="bg-gradient-to-b from-gray-50 to-white">
          <ResourceLibrary />
        </section>

        {/* Community Calendar - Upcoming Events */}
        <section id="events" className="bg-white">
          <CommunityCalendar />
        </section>

        {/* Archive Section - Past Achievements */}
        <Archive />

        {/* Newsletter Section - Email Signup with Validation */}
        <Newsletter />

        {/* Partners Section - Community Organizations */}
        <Partners />

        {/* Footer - Contact Info & Links */}
        <Footer />

        {/* Map Placeholder Modal - Renders on main page */}
        <MapPlaceholder
          isOpen={isMapOpen}
          onClose={handleMapClose}
          locationName={mapData.locationName}
          locationAddress={mapData.locationAddress}
          locationLat={mapData.locationLat}
          locationLng={mapData.locationLng}
        />
      </main>
    </>
  );
}
