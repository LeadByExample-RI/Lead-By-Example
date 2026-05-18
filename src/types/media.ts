export interface CommunityPhoto {
  src: string;
  alt: string;
  caption: string;
  category: string;
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
}
