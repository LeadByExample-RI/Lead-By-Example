import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DonationModal from '@/components/DonationModal';
import CookoutDonationModal from '@/components/CookoutDonationModal';
import StripeProvider from '@/components/StripeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showCookoutDonationModal, setShowCookoutDonationModal] = useState(false);

  useEffect(() => {
    // Listen for donation modal trigger from navbar
    const handleOpenModal = () => setShowDonationModal(true);
    // Listen for cookout donation modal trigger from Hero/Cookout section
    const handleOpenCookoutModal = () => setShowCookoutDonationModal(true);
    
    window.addEventListener('open-donation-modal', handleOpenModal);
    window.addEventListener('open-cookout-donation-modal', handleOpenCookoutModal);
    
    // Prevent body scroll when either modal is open
    if (showDonationModal || showCookoutDonationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('open-donation-modal', handleOpenModal);
      window.removeEventListener('open-cookout-donation-modal', handleOpenCookoutModal);
      document.body.style.overflow = 'unset';
    };
  }, [showDonationModal, showCookoutDonationModal]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#01514C" />
        <meta name="msapplication-TileColor" content="#01514C" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Security headers - Note: X-Frame-Options is set in vercel.json, not in meta tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Performance optimizations */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://vercel.live" />

        {/* Stripe DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//js.stripe.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
      </Head>

      <div className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Component {...pageProps} />
      </div>

      {/* Donation Modals - Render at ROOT level, outside all components */}
      <StripeProvider>
        {/* General Mission Donation Modal - Triggered from Navbar */}
        <DonationModal 
          isOpen={showDonationModal} 
          onClose={() => setShowDonationModal(false)}
          initialAmount={50}
        />
        
        {/* Cookout-Specific Donation Modal - Triggered from Hero/Cookout section */}
        <CookoutDonationModal 
          isOpen={showCookoutDonationModal} 
          onClose={() => setShowCookoutDonationModal(false)}
          initialAmount={50}
        />
      </StripeProvider>
    </>
  );
}

export default MyApp;
