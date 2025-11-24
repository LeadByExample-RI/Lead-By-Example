import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DonationModal from '@/components/DonationModal';
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

  useEffect(() => {
    // Listen for donation modal trigger from navbar or any component
    const handleOpenModal = () => setShowDonationModal(true);
    window.addEventListener('open-donation-modal', handleOpenModal);
    
    // Prevent body scroll when modal is open
    if (showDonationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('open-donation-modal', handleOpenModal);
      document.body.style.overflow = 'unset';
    };
  }, [showDonationModal]);
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

      {/* Donation Modal - Renders at ROOT level, outside all components */}
      <StripeProvider>
        <DonationModal 
          isOpen={showDonationModal} 
          onClose={() => setShowDonationModal(false)}
          initialAmount={50}
        />
      </StripeProvider>
    </>
  );
}

export default MyApp;
