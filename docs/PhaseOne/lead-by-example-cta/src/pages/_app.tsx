import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lead By Example - Breaking the School-to-Prison Pipeline</title>
        <meta
          name="description"
          content="Lead By Example is dedicated to ending the school-to-prison pipeline through mentorship, community engagement, and positive action in Rhode Island."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#01514C" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lead By Example" />
        <meta
          property="og:description"
          content="Breaking the school-to-prison pipeline through mentorship and community engagement."
        />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lead By Example" />
        <meta
          name="twitter:description"
          content="Breaking the school-to-prison pipeline through mentorship and community engagement."
        />
        
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
