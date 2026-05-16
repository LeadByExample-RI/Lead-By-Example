import EvolutionJourney from '@/components/EvolutionJourney';
import { Navbar } from '@/components/layout/Navbar';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import MentorMatching from '@/components/MentorMatching';
import ResourceLibrary from '@/components/ResourceLibrary';
import { Archive } from '@/components/sections/Archive';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/sections/Mission';
import { Partners } from '@/components/sections/Partners';
import { Testimonials } from '@/components/sections/Testimonials';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const VideoHero = dynamic(() => import('@/components/VideoHero'), { ssr: false });
const CommunityMosaic = dynamic(() => import('@/components/CommunityMosaic'));
const CookoutLegacy = dynamic(() => import('@/components/CookoutLegacy'));

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


        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <main>
        <Navbar />

        {/* Hero Section with Current Fundraiser */}
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

        {/* Community cookout video */}
        <section id="cookout-video" aria-label="Community cookout video">
          <VideoHero />
        </section>

        {/* Evolution Journey - Visual Storytelling of Transformation */}
        <section id="journey" className="bg-gradient-to-b from-white to-gray-50">
          <EvolutionJourney />
        </section>

        {/* Mission Section - Our Purpose */}
        <Mission />

        {/* Community in motion photo gallery */}
        <section id="community" aria-label="Community in motion photo gallery">
          <CommunityMosaic />
        </section>

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

        {/* Archive Section - Past Achievements */}
        <Archive />

        {/* Cookout history and year six invitation */}
        <section id="legacy" aria-label="Cookout history and year six invitation">
          <CookoutLegacy />
        </section>

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
