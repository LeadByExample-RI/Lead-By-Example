import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  quote: string;
}

interface CommunitySectionProps {
  testimonials: Testimonial[];
}

export default function CommunitySection({ testimonials }: CommunitySectionProps) {
  return (
    <section id="community" className="py-16 bg-gradient-to-br from-royal-purple to-royal-purple-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-gold mb-12">
          Our Community Spirit
        </h2>
        
        {/* Featured Quote Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-gold/30 rounded-2xl p-8 md:p-12">
            <svg 
              className="w-12 h-12 text-gold mb-4" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="text-2xl md:text-3xl font-heading text-off-white italic mb-6">
              "Quem tene amor, tene tudu."
            </p>
            <p className="text-lg text-gold-light">
              — Cape Verdean Proverb: "Whoever has love, has everything."
            </p>
          </div>
        </div>
        
        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-cape-verde flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-royal-purple">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
