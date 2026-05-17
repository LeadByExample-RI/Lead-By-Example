'use client';

import Image from 'next/image';

const flyer3rd = '/images/events/3rd-cookout.jpg';
const flyer4th = '/images/events/4th-cookout.jpg';
const flyer5th = '/images/events/5th-cookout.jpg';
const pavilionImage = '/images/events/pavilion.jpg';

export function Events() {
  return (
    <section id="events" className="py-20 bg-[#0a0a0f]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Strict 3-Flyer Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 3rd Annual Flyer (3 cols) */}
          <div className="lg:col-span-3 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={flyer3rd}
              alt="3rd Annual Community Cookout"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
          </div>

          {/* Center Column - Pavilion Photo (6 cols) */}
          <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={pavilionImage}
              alt="Community Pavilion"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Heavy dark overlay - atmospheric background only */}
            <div className="absolute inset-0 bg-[#080b12]/70" />
          </div>

          {/* Right Column - 4th & 5th Annual Flyers stacked (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 flex-1">
              <Image
                src={flyer4th}
                alt="4th Annual Community Cookout"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 flex-1">
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
