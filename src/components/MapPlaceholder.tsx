'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import dynamic from 'next/dynamic';
const GoogleMapEmbed = dynamic(
  () => import('@/components/GoogleMapEmbed').then((m) => ({ default: m.GoogleMapEmbed })),
  { ssr: false, loading: () => <div className="w-full h-full bg-gradient-to-br from-verdean-900 to-verdean-800 animate-pulse rounded-lg" /> }
);

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
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Handle close with proper cleanup
  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop/Overlay - Below navbar */}
          <motion.div
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-sm z-40 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => handleClose(e)}
            aria-hidden="true"
          />

          {/* Modal Container - Centered below navbar, responsive */}
          <div className="fixed top-20 left-0 right-0 bottom-0 z-50 pointer-events-none flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 overflow-auto">
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full h-full max-w-6xl max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-8rem)] md:h-auto md:max-h-[85vh] overflow-hidden border-2 border-[#4B306A] pointer-events-auto"
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
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-lg z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close map"
                  type="button"
                >
                  <X size={24} strokeWidth={3} />
                </motion.button>
              </div>

              {/* Map Content */}
              <div className="relative bg-[#F6F6F6] flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
                <GoogleMapEmbed
                  lat={locationLat}
                  lng={locationLng}
                  locationName={locationName}
                />
              </div>

              {/* Footer with API Integration Note */}
              <div className="bg-white border-t-2 border-[#4B306A] p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs text-gray-500 text-center">
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
