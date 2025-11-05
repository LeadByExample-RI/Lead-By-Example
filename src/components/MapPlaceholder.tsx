'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface MapPlaceholderProps {
  isOpen: boolean
  onClose: () => void
  locationName?: string
  locationAddress?: string
  locationLat?: number
  locationLng?: number
}

export function MapPlaceholder({
  isOpen,
  onClose,
  locationName = 'Location',
  locationAddress,
  locationLat,
  locationLng,
}: MapPlaceholderProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop/Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[99999] flex items-start justify-center px-4 pt-32 pb-8 overflow-y-auto">
            <motion.div
              className="relative w-full max-w-[1200px] bg-white rounded-lg shadow-2xl border-2 border-[#4B306A] overflow-hidden my-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#01514c] to-[#01514c]/90 p-6 border-b-2 border-[#4B306A]">
                <h2 className="text-2xl font-bold text-white pr-12">
                  {locationName}
                </h2>
                {locationAddress && (
                  <p className="text-white/80 mt-1 text-sm">{locationAddress}</p>
                )}
                
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#4B306A] transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close map"
                >
                  <X size={24} strokeWidth={3} />
                </motion.button>
              </div>

              {/* Map Placeholder Content */}
              <div className="relative bg-[#F6F6F6] h-[500px] flex flex-col items-center justify-center">
                {/* Placeholder with animated border */}
                <motion.div
                  className="relative w-full h-full bg-gradient-to-br from-[#E8E8E8] to-[#F0F0F0] flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Animated Map Icon */}
                  <motion.div
                    className="text-6xl mb-4"
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

                  {/* Placeholder Text */}
                  <motion.div
                    className="text-center space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-[#4B306A]">
                      Google Map Placeholder
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Google Map will load here
                    </p>
                    
                    {/* Location Data Display */}
                    {(locationLat || locationLng) && (
                      <div className="mt-4 text-sm text-gray-500">
                        <p className="font-mono">
                          Coordinates: {locationLat?.toFixed(6)}, {locationLng?.toFixed(6)}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Pulsing rings effect */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-[#01514c]/30 rounded-full"
                    animate={{
                      scale: [1, 1.5, 2],
                      opacity: [0.5, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-[#FFD700]/30 rounded-full"
                    animate={{
                      scale: [1, 1.5, 2],
                      opacity: [0.5, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                      delay: 1,
                    }}
                  />

                  {/* Comment for future integration */}
                  {/* 
                    TODO: Google Maps Integration
                    Replace this placeholder with Google Maps iframe or API
                    
                    Example iframe implementation:
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${locationLat},${locationLng}`}
                      width="100%"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    
                    Or use Google Maps JavaScript API:
                    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
                    
                    Data attributes available:
                    - locationLat: {locationLat}
                    - locationLng: {locationLng}
                    - locationAddress: {locationAddress}
                  */}
                </motion.div>
              </div>

              {/* Footer with API Integration Note */}
              <div className="bg-white border-t-2 border-[#4B306A] p-4">
                <p className="text-xs text-gray-500 text-center">
                  💡 <strong>Developer Note:</strong> This is a placeholder. Integrate Google Maps API with your API key to display the actual map.
                  {(locationLat && locationLng) && ` Location data is ready for integration.`}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
