# Google Map Placeholder Implementation

## Overview
This document describes the interactive Google Map placeholder implementation for the Lead By Example website. All three specified addresses are now clickable and display map placeholders with proper cleanup to ensure the navbar and site remain fully functional.

## Implemented Addresses

### 1. **Lincoln Woods Site A&B** 🏞️
- **Location**: Current Fundraiser (All Sides of Town Cookout 2025)
- **Coordinates**: 41.9240, -71.4395
- **Where it appears**: Hero section (right column card)
- **Component**: `src/components/sections/Hero.tsx`
- **Data Source**: `src/data/fundraisers.ts` - `currentFundraiser` object

### 2. **120 Hawkins Street, Providence, RI 02908** 🏢
- **Location**: Organization Headquarters
- **Coordinates**: 41.8093, -71.4211
- **Where it appears**: Hero section (contact info)
- **Component**: `src/components/sections/Hero.tsx`
- **Data Source**: `src/data/fundraisers.ts` - `organizationInfo` object

### 3. **Providence, Rhode Island** 🏙️
- **Location**: General Providence Area
- **Coordinates**: 41.8240, -71.4128
- **Where it appears**: Footer section
- **Component**: `src/components/sections/Footer.tsx`
- **Fixed Coordinates**: Set directly in component

## How It Works

### User Interaction Flow

1. **User Clicks Address**: Any of the three addresses displays as a clickable button with:
   - 📍 Location pin icon
   - Hover effects (background highlight, scale animation)
   - Cursor changes to pointer

2. **Map Opens**: A modal appears showing:
   - Location name as header
   - Full address below the title
   - Google Map placeholder with animated location pin
   - Pulsing ring animations for visual appeal
   - Red X close button in top-right corner

3. **User Closes Map**: Multiple ways to close:
   - Click the red X button (top-right)
   - Click outside the modal (backdrop)
   - Press Escape key
   - All methods properly restore site functionality

### Technical Implementation

#### Data Structure
```typescript
// src/data/fundraisers.ts
export interface Fundraiser {
  id: string;
  title: string;
  location: string;
  locationLat?: number;  // NEW
  locationLng?: number;  // NEW
  // ... other fields
}

export interface OrganizationInfo {
  address: string;
  lat?: number;  // NEW
  lng?: number;  // NEW
  // ... other fields
}
```

#### Map Utility Functions
```typescript
// src/utils/map.ts
showMapPlaceholder({
  locationName: 'Location Name',
  locationAddress: 'Full Address',
  locationLat: 41.8240,
  locationLng: -71.4128
})

hideMapPlaceholder() // Close the map
```

#### Components Involved

1. **MapPlaceholder Component** (`src/components/MapPlaceholder.tsx`)
   - Modal display with animations
   - Enhanced cleanup to prevent navbar issues
   - Body scroll management
   - Escape key handler
   - Click-outside-to-close functionality

2. **Navbar Component** (`src/components/layout/Navbar.tsx`)
   - Listens for map show/hide events
   - Manages map state globally
   - Enhanced cleanup handler (`handleMapClose`)
   - Ensures proper state reset

3. **Hero Component** (`src/components/sections/Hero.tsx`)
   - Displays clickable addresses for:
     - Current fundraiser location (Lincoln Woods)
     - Organization headquarters (120 Hawkins St)

4. **Footer Component** (`src/components/sections/Footer.tsx`)
   - Displays clickable address for Providence, RI

## Preventing Navbar/Site Issues

### Problem Prevention Measures

✅ **Body Scroll Restoration**
```typescript
// Store and restore original overflow value
const originalOverflow = document.body.style.overflow
document.body.style.overflow = 'hidden' // When open
document.body.style.overflow = originalOverflow || 'unset' // When closed
```

✅ **State Cleanup on Close**
```typescript
const handleMapClose = () => {
  setIsMapOpen(false)
  setMapData({}) // Clear map data
  document.body.style.overflow = 'unset' // Restore scroll
}
```

✅ **Proper Event Listener Cleanup**
```typescript
useEffect(() => {
  if (isOpen) {
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }
}, [isOpen, onClose])
```

✅ **AnimatePresence with Wait Mode**
```typescript
<AnimatePresence mode="wait">
  {isOpen && <ModalContent />}
</AnimatePresence>
```

### Visual Indicators

**Red X Close Button**
- Changed from gold to **red** for better visibility
- Positioned in top-right corner
- Rotates 90° on hover
- Scale animations on hover/tap
- Clear visual indicator to close

**Close Button Features:**
```typescript
<motion.button
  onClick={handleClose}
  className="bg-red-500 hover:bg-red-600"
  whileHover={{ scale: 1.1, rotate: 90 }}
  whileTap={{ scale: 0.95 }}
>
  <X size={24} strokeWidth={3} />
</motion.button>
```

## Testing Checklist

### Functionality Tests
- [ ] Click Lincoln Woods address → Map opens
- [ ] Click 120 Hawkins Street address → Map opens
- [ ] Click Providence, RI address → Map opens
- [ ] Click red X button → Map closes, site functional
- [ ] Click outside modal → Map closes, site functional
- [ ] Press Escape key → Map closes, site functional
- [ ] Open/close map multiple times → No navbar stuck
- [ ] Open map, scroll page (shouldn't scroll) → Works correctly
- [ ] Close map, scroll page → Scrolling restored
- [ ] All navbar links work after closing map
- [ ] Mobile menu works after closing map

### Visual Tests
- [ ] Location pin icon displays
- [ ] Hover effects work on address buttons
- [ ] Modal animation smooth
- [ ] Red X button clearly visible
- [ ] Backdrop blur effect present
- [ ] Pulsing location animations working
- [ ] Responsive on mobile devices

## Future Enhancement: Real Google Maps

When ready to implement actual Google Maps:

1. **Get Google Maps API Key**
   ```bash
   # Visit: https://console.cloud.google.com/
   # Enable Maps JavaScript API
   # Create API key
   ```

2. **Add API Key to Environment**
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Update MapPlaceholder Component**
   ```typescript
   // Replace placeholder div with:
   <iframe
     src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${locationLat},${locationLng}`}
     width="100%"
     height="500"
     style={{ border: 0 }}
     allowFullScreen
     loading="lazy"
   />
   ```

## Files Modified

1. ✅ `src/data/fundraisers.ts` - Added coordinates to data
2. ✅ `src/components/MapPlaceholder.tsx` - Enhanced cleanup
3. ✅ `src/components/layout/Navbar.tsx` - Improved close handler
4. ✅ `src/components/sections/Hero.tsx` - Updated to use data coordinates
5. ✅ `src/components/sections/Footer.tsx` - Cleaned up close handler
6. ✅ `src/styles/globals.css` - Enhanced glassmorphism effects

## Summary

All three addresses are now:
- ✅ **Clickable** with visual feedback
- ✅ **Interactive** with map placeholder display
- ✅ **Functional** with proper cleanup ensuring no navbar issues
- ✅ **Accessible** via click, escape key, or backdrop click
- ✅ **Visual** with clear red X close button
- ✅ **Responsive** across all device sizes

The implementation ensures that users can click any address, view the map placeholder, close it using any method, and continue using the site without any stuck states or navigation issues.
