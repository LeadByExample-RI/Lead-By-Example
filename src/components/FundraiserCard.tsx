interface FundraiserCardProps {
  fundraiser: {
    id: number;
    title: string;
    shortDescription: string;
    image: string;
    raised: number;
    goal: number;
    status: 'active' | 'completed';
  };
  onClick: () => void;
}

export default function FundraiserCard({ fundraiser, onClick }: FundraiserCardProps) {
  const percentageRaised = Math.round((fundraiser.raised / fundraiser.goal) * 100);
  
  return (
    <article 
      className="bg-white rounded-2xl border-2 border-cape-verde/20 overflow-hidden 
                 hover:border-cape-verde hover:shadow-2xl transform hover:-translate-y-2 
                 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Card Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={fundraiser.image}
          alt={fundraiser.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2
                        ${fundraiser.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-coral-accent text-white'}`}>
          {fundraiser.status === 'completed' ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              COMPLETED
            </>
          ) : (
            <>⚡ ACTIVE</>
          )}
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-royal-purple/0 group-hover:bg-royal-purple/20 
                      transition-all duration-300"></div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-heading font-bold text-royal-purple mb-3 
                     group-hover:text-cape-verde transition-colors">
          {fundraiser.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {fundraiser.shortDescription}
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Raised</p>
            <p className="text-lg font-bold text-cape-verde">${fundraiser.raised.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Goal</p>
            <p className="text-lg font-bold text-gray-700">${fundraiser.goal.toLocaleString()}</p>
          </div>
        </div>

        {/* Mini Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Achievement</span>
            <span className="text-xs font-bold text-royal-purple">{percentageRaised}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cape-verde to-gold h-full rounded-full transition-all duration-500"
              style={{ '--progress-width': `${Math.min(percentageRaised, 100)}%` } as React.CSSProperties & { '--progress-width': string }}
            ></div>
          </div>
        </div>
        
        {/* See Details Button */}
        <button 
          className="w-full bg-gold hover:bg-gold-dark text-black font-bold py-3 px-6 
                   rounded-lg transition-all duration-300 shadow-md hover:shadow-lg 
                   transform group-hover:translate-x-1 focus-visible:ring-4 focus-visible:ring-gold focus-visible:ring-offset-2"
          onClick={onClick}
          aria-label={`See details for ${fundraiser.title}`}
        >
          See Details →
        </button>
      </div>
    </article>
  );
}
