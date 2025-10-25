import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lead By Example - Breaking the School-to-Prison Pipeline</title>
        <meta name="description" content="Inspiring change through action. Building mentorship relationships that transform communities and empower youth in Providence, Rhode Island." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#01514C" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lead By Example - Breaking the School-to-Prison Pipeline" />
        <meta property="og:description" content="Inspiring change through action. Building mentorship relationships that transform communities and empower youth." />
        <meta property="og:site_name" content="Lead By Example" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lead By Example" />
        <meta name="twitter:description" content="Inspiring change through action. Building mentorship relationships that transform communities." />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
