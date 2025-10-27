import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '@/components/layout/Header';
import { NavigationItem } from '@/types/components';

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'mission', label: 'Our Mission', href: '#mission' },
  { id: 'stories', label: 'Success Stories', href: '#stories' },
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'get-involved', label: 'Get Involved', href: '#get-involved' },
  { id: 'partners', label: 'Partners', href: '#partners' },
];

function MyApp({ Component, pageProps }: AppProps) {
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

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Performance optimizations */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://vercel.live" />
      </Head>

      <Header
        variant="sticky"
        navigation={{
          items: navigationItems,
        }}
        actions={[
          {
            id: 'donate',
            label: 'Donate Now',
            variant: 'primary',
            onClick: () => {
              const donateSection = document.querySelector('#donate');
              if (donateSection) {
                donateSection.scrollIntoView({ behavior: 'smooth' });
              }
            },
          },
        ]}
        mobileMenuEnabled={true}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
