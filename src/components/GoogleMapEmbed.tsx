'use client'

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import type { Libraries } from '@react-google-maps/api'

// IMPORTANT: Define libraries at module scope, not inside the component.
// A new array reference on every render causes useJsApiLoader to reload the
// Maps script on each render cycle, which breaks the Elements context and
// triggers a console warning from Google Maps.
const LIBRARIES: Libraries = []

// Default location: Lead By Example HQ
// DEVELOPER ACTION: Update these if the primary display address changes.
const DEFAULT_CENTER = { lat: 41.8093, lng: -71.4211 }
const DEFAULT_LOCATION_NAME = 'Lead By Example — 120 Hawkins St, Providence, RI'

// mapContainerStyle requires explicit pixel dimensions — a map with no height will not render.
// 400px matches the minimum visible height of the MapPlaceholder modal on all breakpoints.
const MAP_CONTAINER_STYLE = { width: '100%', height: '400px' }

interface GoogleMapEmbedProps {
  lat?: number
  lng?: number
  locationName?: string
  zoom?: number
}

export function GoogleMapEmbed({
  lat,
  lng,
  locationName = DEFAULT_LOCATION_NAME,
  zoom = 15,
}: GoogleMapEmbedProps) {
  const center = {
    lat: lat ?? DEFAULT_CENTER.lat,
    lng: lng ?? DEFAULT_CENTER.lng,
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: LIBRARIES,
  })

  if (loadError) {
    return (
      <div
        role="alert"
        style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Map unavailable — check your connection or API key configuration.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading map"
        style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Loading map…
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER_STYLE}
      center={center}
      zoom={zoom}
    >
      <MarkerF position={center} title={locationName} />
    </GoogleMap>
  )
}
