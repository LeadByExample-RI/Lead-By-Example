export type PhotoCategory = 'advocacy' | 'community' | 'journey' | 'celebration';

export interface CommunityPhoto {
  src: string;
  alt: string;
  caption: string;
  category: PhotoCategory;
  isMonochrome?: boolean;
  objectPosition?: string;
}

export interface CookoutEdition {
  edition: number;
  label: string;
  year: number;
  location: string;
  timeRange: string;
  tagline: string;
  gradientClass: string;
  // No goal/raised/amount fields — intentional
}
