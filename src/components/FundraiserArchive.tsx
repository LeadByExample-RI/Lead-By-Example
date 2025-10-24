import FundraiserCard from './FundraiserCard';

interface FundraiserArchiveProps {
  fundraisers: Array<{
    id: number;
    title: string;
    shortDescription: string;
    image: string;
    raised: number;
    goal: number;
    status: 'active' | 'completed';
  }>;
  onCardClick: (id: number) => void;
}

export default function FundraiserArchive({ fundraisers, onCardClick }: FundraiserArchiveProps) {
  return (
    <section id="fundraisers" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-cape-verde mb-4">
            Past Fundraisers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating our community's achievements and the impact we've made together
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {fundraisers.map((fundraiser) => (
            <FundraiserCard 
              key={fundraiser.id}
              fundraiser={fundraiser}
              onClick={() => onCardClick(fundraiser.id)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/fundraisers" 
            className="inline-block bg-cape-verde hover:bg-cape-verde-dark text-off-white font-bold 
                     text-lg py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                     transition-all duration-300 focus-visible:ring-4 focus-visible:ring-cape-verde focus-visible:ring-offset-2"
            aria-label="View all fundraisers"
          >
            View All Fundraisers
          </a>
        </div>
      </div>
    </section>
  );
}
