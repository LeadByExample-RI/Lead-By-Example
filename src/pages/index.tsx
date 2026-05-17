import CommunityMosaic from '@/components/CommunityMosaic';
import EvolutionJourney from '@/components/EvolutionJourney';
import { Navbar } from '@/components/layout/Navbar';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import MentorMatching from '@/components/MentorMatching';
import SaturnCarousel from '@/components/ui/SaturnCarousel';
import VideoHero from '@/components/VideoHero';
import { Archive } from '@/components/sections/Archive';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Partners } from '@/components/sections/Partners';
import { resources } from '@/data/siteContent';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
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
        <link rel="manifest" href="/site.webmanifest" />

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

        {/* Favicon - Removed until icon files are created */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section with Current Fundraiser - #home */}
        <section id="home">
          <Hero
            title="Breaking the School-to-Prison Pipeline"
            description="Providing mentorship, education, and support to at-risk youth, creating pathways to success instead of incarceration. Together, we're building stronger communities through opportunity and empowerment."
            primaryAction={{
              label: 'Donate Now',
              href: '#donate',
              onClick: () => {
                // Dispatch event to open cookout-specific modal
                window.dispatchEvent(new Event('open-cookout-donation-modal'));
              },
            }}
            secondaryAction={{
              label: 'Learn More',
              href: '#about',
            }}
          />
        </section>

        {/* VideoHero - Cinematic community video */}
        <VideoHero />

        {/* Evolution Journey - Visual Storytelling of Transformation - #journey */}
        <section id="journey" className="bg-gradient-to-b from-white to-gray-50">
          <EvolutionJourney />
        </section>

        {/* Mentor Matching - Connect with Mentors - #mentors */}
        <section id="mentors" className="bg-white">
          <MentorMatching />
        </section>

        {/* Mission Section - Our Purpose - #mission */}
        <section id="mission">
          <Mission />
        </section>

        {/* SaturnCarousel - 3D Resource Ring - #resources */}
        <section id="resources" className="bg-[#080b12] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
              Resource Hub
            </h2>
            <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-12">
              Explore our curated collection of guides, videos, and tools designed to support your journey.
            </p>
            <SaturnCarousel items={resources} />
          </div>
        </section>

        {/* Archive Section - Past Achievements - #impact */}
        <section id="impact">
          <Archive />
        </section>

        {/* Community Mosaic - Before Partners */}
        <CommunityMosaic />

        {/* Partners Section - Community Organizations */}
        <Partners />
      </main>

      <Footer />

      {/* Map Placeholder Modal - Renders outside main flow */}
      <MapPlaceholder
        isOpen={isMapOpen}
        onClose={handleMapClose}
        locationName={mapData.locationName}
        locationAddress={mapData.locationAddress}
        locationLat={mapData.locationLat}
        locationLng={mapData.locationLng}
      />
    </>
  );
}
