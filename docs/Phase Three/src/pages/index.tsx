import { Hero } from '@/components/Hero';
import { Testimonials } from '@/components/Testimonials';
import { Archive } from '@/components/Archive';
import { Newsletter } from '@/components/Newsletter';
import { Partners } from '@/components/Partners';
import { Footer } from '@/components/Footer';
import { Fundraiser } from '@/types';

// Current fundraiser data
const currentFundraiser: Fundraiser = {
  id: 'current-2025',
  title: 'All Sides of Town Cookout 2025',
  description: 'Join us for our biggest community event yet! Bringing together families from all neighborhoods for food, fun, and unity.',
  goal: 10000,
  raised: 6250,
  date: 'August 2, 2025',
  location: 'Lincoln Woods State Park, Site A&B',
  status: 'active',
  features: [
    'Free food for all attendees',
    'Free haircuts and styling',
    'Activities and games for youth',
    'Backpack giveaway for students',
    'Community resources fair',
    'Live music and entertainment',
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero fundraiser={currentFundraiser} />
      <Testimonials />
      <Archive />
      <Newsletter />
      <Partners />
      <Footer />
    </main>
  );
}
