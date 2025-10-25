import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import PrevalentFundraiser from '@/components/PrevalentFundraiser';
import FundraiserArchive from '@/components/FundraiserArchive';
import CommunitySection from '@/components/CommunitySection';
import FundraiserModal from '@/components/FundraiserModal';

const activeFundraiser = {
  id: 1,
  title: "Clean Water for São Vicente",
  shortDescription: "Help us bring sustainable clean water solutions to 500 families in São Vicente. Every contribution makes a difference.",
  fullDescription: "Access to clean water is a fundamental human right, yet many families in São Vicente still struggle with water scarcity. This project aims to install modern water filtration systems and repair existing infrastructure to ensure 500 families have reliable access to safe drinking water.",
  image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  raised: 12450,
  goal: 20000,
  percentage: 62,
  donors: 143,
  daysLeft: 8,
  status: 'active' as const,
  category: "Infrastructure"
};

const pastFundraisers = [
  {
    id: 2,
    title: "School Supplies Drive 2024",
    shortDescription: "Successfully provided 300 students with essential school supplies.",
    fullDescription: "This initiative ensured that every child in our community started the school year with the tools they need to succeed.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    raised: 8500,
    goal: 7000,
    percentage: 121,
    donors: 89,
    daysLeft: 0,
    status: 'completed' as const,
    category: "Education"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    location: "Praia, Santiago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    quote: "This platform brought our community together like never before."
  }
];

export default function Home() {
  const [selectedFundraiser, setSelectedFundraiser] = useState<{
    id: number;
    title: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    raised: number;
    goal: number;
    percentage: number;
    donors: number;
    daysLeft: number;
    status: 'active' | 'completed';
    category: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFundraiserClick = (id: number) => {
    const fundraiser = [activeFundraiser, ...pastFundraisers].find(f => f.id === id);
    if (fundraiser) {
      setSelectedFundraiser(fundraiser);
      setIsModalOpen(true);
    }
  };

  const handleJoinClick = () => {
    setSelectedFundraiser(activeFundraiser);
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Cape Verde Cares - Lead By Example</title>
        <meta name="description" content="A community platform to support Cape Verdean initiatives." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen">
        <Header />
        
        <main>
          <PrevalentFundraiser 
            fundraiser={activeFundraiser}
            onJoin={handleJoinClick}
          />
          
          <FundraiserArchive 
            fundraisers={pastFundraisers}
            onCardClick={handleFundraiserClick}
          />
          
          <CommunitySection testimonials={testimonials} />
        </main>

        <footer className="bg-cape-verde-dark text-off-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading font-bold text-xl mb-4 text-gold">Cape Verde Cares</h3>
                <p className="text-sm text-gray-300">Building a stronger community.</p>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                  <li><a href="#fundraisers" className="hover:text-gold transition-colors">Fundraisers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Connect</h4>
                <p className="text-sm text-gray-300">Lead by example.</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gold/20 text-center text-sm text-gray-400">
              <p>&copy; 2025 Cape Verde Cares. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <FundraiserModal 
          fundraiser={selectedFundraiser}
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
