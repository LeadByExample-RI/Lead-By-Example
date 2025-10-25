interface PrevalentFundraiserProps {
  fundraiser: {
    id: number;
    title: string;
    shortDescription: string;
    image: string;
    raised: number;
    goal: number;
    percentage: number;
    daysLeft: number;
    donors: number;
  };
  onJoin: () => void;
}

export default function PrevalentFundraiser({ fundraiser, onJoin }: PrevalentFundraiserProps) {
  return (
    <section id="home" className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-royal-purple mb-3">
            Featured Cause
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {/* Main Fundraiser Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-gold overflow-hidden 
                          hover:shadow-gold/40 hover:border-gold-light transition-all duration-500 
                          transform hover:scale-[1.02]">
            
            <div className="grid md:grid-cols-5 gap-0">
              
              {/* Image Section - Takes 2 columns */}
              <div className="md:col-span-2 relative h-64 md:h-auto">
                <img 
                  src={fundraiser.image}
                  alt={fundraiser.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Active Badge */}
                <div className="absolute top-6 left-6 bg-royal-purple text-off-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">
                  <span className="inline-block w-2 h-2 bg-gold rounded-full mr-2 animate-pulse"></span>
                  ACTIVE NOW
                </div>
              </div>
              
              {/* Content Section - Takes 3 columns */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                
                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-royal-purple mb-4 leading-tight">
                    {fundraiser.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {fundraiser.shortDescription}
                  </p>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cape-verde">${fundraiser.raised.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Raised</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-royal-purple">{fundraiser.donors}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Donors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gold-dark">{fundraiser.daysLeft}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Days Left</p>
                  </div>
                </div>

                {/* Progress Bar with Shimmer */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">Progress to Goal</span>
                    <span className="text-lg font-bold text-royal-purple">{fundraiser.percentage}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="relative w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-royal-purple via-cape-verde to-gold 
                                 rounded-full transition-all duration-700 ease-out shadow-lg"
                      style={{ width: `${fundraiser.percentage}%` }}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                    animate-shimmer"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">${fundraiser.raised.toLocaleString()} raised</span>
                    <span className="text-sm font-semibold text-gray-700">Goal: ${fundraiser.goal.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="flex-1 bg-gold hover:bg-gold-dark text-black font-bold text-lg py-4 px-8 
                                   rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                                   transition-all duration-300 border-2 border-gold-dark
                                   focus-visible:ring-4 focus-visible:ring-gold focus-visible:ring-offset-2"
                    onClick={onJoin}
                    aria-label={`Join ${fundraiser.title} fundraiser`}
                  >
                    Join This Cause →
                  </button>
                  <button 
                    className="flex-1 bg-royal-purple hover:bg-royal-purple-dark text-off-white font-bold 
                                   text-lg py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                                   transition-all duration-300
                                   focus-visible:ring-4 focus-visible:ring-royal-purple focus-visible:ring-offset-2"
                    onClick={onJoin}
                    aria-label={`Learn more about ${fundraiser.title}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
