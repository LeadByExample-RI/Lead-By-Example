# Google Maps Placeholder Implementation

## Overview
A complete Google Maps placeholder modal system that allows users to click on location addresses throughout the application to view a map placeholder. The system is designed to be easily upgraded to a full Google Maps integration.

## Features Implemented

### ✅ Modal Overlay System
- **Dark semi-transparent backdrop** (70% opacity with blur effect)
- **Fixed positioning** with z-index 1000+ for proper layering
- **Centered layout** responsive on all screen sizes
- **Max width**: 1200px with 90% viewport width fallback
- **Click-outside-to-close** functionality
- **Escape key support** for accessibility

### ✅ Design Specifications
- **Border**: 2px solid purple (#4B306A)
- **Header background**: Cape Verdean blue gradient (#01514c)
- **Close button**: Gold (#FFD700) with hover effects and rotation animation
- **Placeholder area**: 500px height with gradient background (#E8E8E8 to #F0F0F0)
- **Professional styling** matching the site's design system

### ✅ Animations & Transitions
- **Fade-in effect**: 0.3s ease-in-out for backdrop
- **Scale animation**: 0.9 to 1.0 on modal appearance
- **Bounce effect**: Map icon bounces continuously
- **Pulsing rings**: Two alternating pulse animations in brand colors
- **Smooth transitions** throughout

### ✅ Click Handlers
- **Location address button** in Hero section (Get in Touch card)
- **Hover effects**: Background highlight, icon scale, text underline
- **Data attributes** for future Google Maps integration:
  - `data-location-address`
  - `data-location-lat`
  - `data-location-lng`

### ✅ Utility Functions
Created `/src/utils/map.ts` with:
- `showMapPlaceholder(data)` - Opens modal with location data
- `hideMapPlaceholder()` - Closes modal
- Custom event system for global communication

### ✅ State Management
- Modal state managed in Navbar component
- Custom events allow any component to trigger the map
- Clean event cleanup on unmount

## File Structure

```
src/
├── components/
│   ├── MapPlaceholder.tsx          # Main modal component
│   └── layout/
│       └── Navbar.tsx               # Contains modal state & listeners
├── sections/
│   └── Hero.tsx                     # Updated with clickable address
└── utils/
    ├── map.ts                       # Map utility functions
    └── index.ts                     # Updated exports
```

## Usage Examples

### From Any Component
```tsx
import { showMapPlaceholder } from '@/utils/map'

// Open map with full location data
showMapPlaceholder({
  locationName: 'Lead By Example - Headquarters',
  locationAddress: '120 Hawkins Street, Providence, RI 02908',
  locationLat: 41.8295,
  locationLng: -71.4128
})

// Open with minimal data
showMapPlaceholder({
  locationName: 'Event Location',
  locationAddress: 'Some Address'
})
```

### As a Button
```tsx
<button
  onClick={() => showMapPlaceholder({
    locationName: 'My Location',
    locationAddress: '123 Main St',
    locationLat: 40.7128,
    locationLng: -74.0060
  })}
  className="text-accent-500"
>
  📍 View on Map
</button>
```

## Future Google Maps Integration

### Step 1: Get API Key
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable Maps JavaScript API and Maps Embed API
4. Create credentials (API key)
5. Restrict the API key to your domain

### Step 2: Add API Key to Environment
```env
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Step 3: Update MapPlaceholder Component
Replace the placeholder content in `MapPlaceholder.tsx` with:

```tsx
// Option A: Embed API (Simple)
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${locationLat},${locationLng}&zoom=15`}
  width="100%"
  height="500"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

// Option B: JavaScript API (Advanced - requires additional setup)
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
})

{isLoaded && (
  <GoogleMap
    center={{ lat: locationLat || 0, lng: locationLng || 0 }}
    zoom={15}
    mapContainerStyle={{ width: '100%', height: '500px' }}
  >
    <Marker position={{ lat: locationLat || 0, lng: locationLng || 0 }} />
  </GoogleMap>
)}
```

### Step 4: Install Dependencies (for JavaScript API)
```bash
pnpm add @react-google-maps/api
# or
npm install @react-google-maps/api
```

## Location Data Reference

### Current Implementation
- **Organization HQ**: 
  - Address: 120 Hawkins Street, Providence, RI 02908
  - Coordinates: 41.8295, -71.4128

### Adding More Locations
Update the `organizationInfo` in `/src/data/fundraisers.ts` or pass custom location data when calling `showMapPlaceholder()`.

## Accessibility Features
- ✅ Keyboard navigation (Escape to close)
- ✅ ARIA labels on close button
- ✅ Focus management (prevents body scroll)
- ✅ Click outside to close
- ✅ Semantic HTML structure

## Browser Compatibility
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- ✅ Touch-friendly click targets
- ✅ Smooth animations with reduced motion support

## Color Palette Used
| Element | Color | Hex Code |
|---------|-------|----------|
| Border | Purple | #4B306A |
| Close Button | Gold | #FFD700 |
| Header | Cape Verdean Blue | #01514c |
| Text Accent | Accent Color | (from theme) |
| Placeholder BG | Light Gray | #E8E8E8 - #F0F0F0 |

## Developer Notes
- The placeholder is fully functional and ready for Google Maps integration
- All necessary data attributes are in place
- The system uses custom events for flexibility
- No external dependencies required for the placeholder
- Framer Motion used for smooth animations
- TypeScript interfaces ensure type safety

## Testing Checklist
- [x] Modal opens when clicking address
- [x] Close button works
- [x] Click outside closes modal
- [x] Escape key closes modal
- [x] Animations are smooth
- [x] Responsive on mobile
- [x] Body scroll prevention works
- [x] Location data displays correctly
- [x] No console errors
- [x] TypeScript compilation passes

## Credits
Implemented following step-by-step specifications with:
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling
- Next.js best practices
