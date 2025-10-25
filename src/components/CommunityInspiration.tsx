interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  quote: string;
}

interface CommunitySectionProps {
  testimonials: Testimonial[];
}

export default function CommunityInspiration({ testimonials }: CommunitySectionProps) {
  const proverbs = [
    {
      creole: "Quem tene amor, tene tudu.",
      english: "Whoever has love, has everything.",
      category: "Unity"
    }
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-royal-purple via-royal-purple-dark to-cape-verde relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-4">
            Our Community Spirit
          </h2>
          <p className="text-xl text-off-white max-w-3xl mx-auto">
            Voices from across Cape Verde, united in purpose and pride
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Featured Proverb */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-md border-2 border-gold/40 rounded-3xl p-10 md:p-14 
                        shadow-2xl hover:border-gold hover:shadow-gold/20 transition-all duration-500">
            
            {/* Quote Icon */}
            <svg className="w-16 h-16 text-gold mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            
            {/* Proverb in Creole */}
            <p className="text-3xl md:text-4xl font-heading text-off-white italic mb-6 leading-relaxed">
              &ldquo;{proverbs[0].creole}&rdquo;
            </p>
            
            {/* English Translation */}
            <p className="text-xl md:text-2xl text-gold-light font-semibold mb-4">
              {proverbs[0].english}
            </p>
            
            {/* Category Badge */}
            <div className="inline-block bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-bold">
              Cape Verdean Wisdom • {proverbs[0].category}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-7 shadow-xl hover:shadow-2xl 
                       transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Avatar & Info */}
              <div className="flex items-center gap-4 mb-5">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gold"
                />
                <div>
                  <h4 className="font-bold text-royal-purple text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-gold via-gold-light to-gold rounded-2xl p-10 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-royal-purple mb-4">
              Be Part of Our Story
            </h3>
            <p className="text-lg text-royal-purple-dark mb-6">
              Join our community in making lasting change across Cape Verde
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#home" 
                className="bg-royal-purple hover:bg-royal-purple-dark text-off-white font-bold 
                         py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                         transition-all duration-300 focus-visible:ring-4 focus-visible:ring-royal-purple focus-visible:ring-offset-2"
              >
                Start a Fundraiser
              </a>
              <a 
                href="#community" 
                className="bg-white hover:bg-gray-50 text-royal-purple font-bold py-4 px-8 
                         rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                         transition-all duration-300 border-2 border-royal-purple
                         focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Join the Community
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
