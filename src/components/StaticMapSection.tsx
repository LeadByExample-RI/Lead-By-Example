'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface StaticMapSectionProps {
  locationName?: string
  locationAddress?: string
  locationLat?: number
  locationLng?: number
  embedUrl?: string
}

export function StaticMapSection({
  locationName = 'Lead By Example',
  locationAddress = '120 Hawkins Street, Providence, RI 02908',
  locationLat = 41.8093,
  locationLng = -71.4211,
  embedUrl,
}: StaticMapSectionProps) {
  // Generate Google Maps embed URL if not provided
  const mapUrl = embedUrl || 
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.${Math.floor(Math.random() * 1000000)}!2d${locationLng}!3d${locationLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v${Date.now()}`

  return (
    <section className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-8 h-8 text-gold" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Visit Us
            </h2>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {locationName}
          </p>
          {locationAddress && (
            <p className="text-base text-white/60 mt-2">
              {locationAddress}
            </p>
          )}
        </div>

        {/* Map Container */}
        <motion.div
          className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Google Maps Placeholder */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#E8E8E8] to-[#F0F0F0] flex flex-col items-center justify-center">
            {/* Animated Location Pin */}
            <motion.div
              className="text-8xl mb-4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              📍
            </motion.div>

            {/* Pulsing Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-32 h-32 rounded-full border-4 border-[#01514c] opacity-50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute inset-0 w-32 h-32 rounded-full border-4 border-[#FFD700] opacity-50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </div>

            {/* Placeholder Text */}
            <div className="text-center mt-4 px-4">
              <h3 className="text-2xl font-bold text-[#01514c] mb-2">
                Google Map Placeholder
              </h3>
              <p className="text-gray-600 mb-4">
                Google Map will load here
              </p>
              {locationLat && locationLng && (
                <p className="text-sm text-gray-500">
                  Coordinates: {locationLat.toFixed(4)}, {locationLng.toFixed(4)}
                </p>
              )}
            </div>

            {/* Developer Note */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 text-xs text-gray-600 border border-gray-300">
              <p className="font-semibold mb-2">📝 Developer Note:</p>
              <p className="mb-2">
                <strong>TODO:</strong> Replace this placeholder with Google Maps iframe or API
              </p>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {`<iframe src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${locationLat},${locationLng}" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />`}
              </div>
            </div>

            {/* Uncomment when you have a Google Maps API key */}
            {/* 
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${locationName}`}
            />
            */}
          </div>
        </motion.div>

        {/* Location Details */}
        <motion.div
          className="mt-8 grid md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="font-bold text-white mb-2">Address</h4>
            <p className="text-white/80 text-sm">{locationAddress}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="font-bold text-white mb-2">Coordinates</h4>
            <p className="text-white/80 text-sm">
              {locationLat?.toFixed(4)}, {locationLng?.toFixed(4)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="font-bold text-white mb-2">Get Directions</h4>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${locationLat},${locationLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark underline text-sm transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
