/**
 * Map Placeholder Utility
 * 
 * Provides functions to show/hide the Google Maps placeholder modal
 * from anywhere in the application using custom events.
 */

interface MapLocationData {
  locationName?: string
  locationAddress?: string
  locationLat?: number
  locationLng?: number
}

/**
 * Triggers the map placeholder modal to open with location data
 * 
 * @param data - Location information to display in the modal
 * @example
 * showMapPlaceholder({
 *   locationName: 'Organization Headquarters',
 *   locationAddress: '123 Main St, City, Country',
 *   locationLat: 16.5388,
 *   locationLng: -24.0132
 * })
 */
export function showMapPlaceholder(data: MapLocationData = {}) {
  const event = new CustomEvent('showMapPlaceholder', {
    detail: data,
  })
  window.dispatchEvent(event)
}

/**
 * Closes the map placeholder modal
 */
export function hideMapPlaceholder() {
  const event = new CustomEvent('hideMapPlaceholder')
  window.dispatchEvent(event)
}
