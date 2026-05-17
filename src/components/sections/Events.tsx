import Image from 'next/image';

const flyer3rd = '/images/community/panelists.png';
const flyer4th = '/images/community/ryders.png';
const flyer5th = '/images/community/ryders-burn.png';
const pavilionImage = '/images/community/cookout-pavilion.png';

export function Events() {
  return (
    <section id="events" className="py-20 bg-[#080b12]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Strict 3-Flyer Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Column - 3rd Annual Flyer (3 cols) */}
          <div className="lg:col-span-3 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#080b12]/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Image
              src={flyer3rd}
              alt="3rd Annual Community Cookout"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
          </div>

          {/* Center Column - Pavilion Photo (6 cols) */}
          <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-[#080b12]/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Image
              src={pavilionImage}
              alt="Community Pavilion"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#080b12]/60" />
          </div>

          {/* Right Column - 4th & 5th Annual Flyers stacked (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-[#080b12]/40 backdrop-blur-xl border border-white/10 shadow-2xl flex-1">
              <Image
                src={flyer4th}
                alt="4th Annual Community Cookout"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-[#080b12]/40 backdrop-blur-xl border border-white/10 shadow-2xl flex-1">
              <Image
                src={flyer5th}
                alt="5th Annual Community Cookout"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
