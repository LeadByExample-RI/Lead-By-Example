import { Inter, Poppins } from 'next/font/google';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Archive from '@/components/Archive';
import Newsletter from '@/components/Newsletter';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
});

// Current fundraiser data
const currentFundraiser = {
  title: 'All Sides of Town Cookout 2025',
  description:
    'Join us for our annual community cookout bringing together youth and adults from all neighborhoods. This event features free food, haircuts, activities, and a backbag giveaway for those in need. Everyone is welcome!',
  goal: 10000,
  raised: 6250,
  eventDate: 'August 2, 2025',
  eventLocation: 'Lincoln Woods Site A&B',
};

export default function Home() {
  return (
    <main className={`${inter.variable} ${poppins.variable} font-sans`}>
      {/* Hero Section with Current Fundraiser */}
      <Hero currentFundraiser={currentFundraiser} />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Archive Section */}
      <Archive />

      {/* Newsletter Signup */}
      <Newsletter />

      {/* Partners Section */}
      <Partners />

      {/* Footer */}
      <Footer />
    </main>
  );
}
