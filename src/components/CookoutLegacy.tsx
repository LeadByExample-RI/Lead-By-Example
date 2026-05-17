import Image from 'next/image';

export default function CookoutLegacy() {
  return (
    <section className="bg-[#01514C]">
      {/* Pavilion Photo - Atmospheric background only */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl min-h-[480px]">
          <Image
            src="/images/community/cookout-pavilion.png"
            alt="Community members gathered at Lincoln Woods pavilion"
            fill
            className="object-cover"
            priority
          />
          {/* Heavy dark overlay - atmospheric background only */}
          <div className="absolute inset-0 bg-[#080b12]/70" />
        </div>
      </div>
    </section>
  );
}
