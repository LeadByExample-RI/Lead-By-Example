import type { ReactNode } from 'react';
import type { CommunityPhoto, CookoutEdition } from '@/types/media';

// ─── Resource Hub ─────────────────────────────────────────────────────────────

export interface ResourceItem {
  id: string;
  theme: 'amethyst' | 'jade';
  icon: ReactNode;
  category: string;
  title: string;
  description: string;
  views: string;
  rating: string;
  url: string;
}

// ─── Community Mosaic grid layout ─────────────────────────────────────────────

export const GRID_CONFIG = [
  { spans: 'col-span-1 md:col-span-6 lg:col-span-8 row-span-2', sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 66vw' },
  { spans: 'col-span-1 md:col-span-2 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 25vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', sizes: '(max-width: 768px) 100vw, 33vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-6 row-span-2', sizes: '(max-width: 768px) 100vw, 50vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-3 row-span-2', sizes: '(max-width: 768px) 100vw, 25vw' },
  { spans: 'col-span-1 md:col-span-4 lg:col-span-3 row-span-2', sizes: '(max-width: 768px) 100vw, 25vw' },
] as const;

// ─── GemTile 3-D extrusion depths (px) ───────────────────────────────────────

export const EXTRUSION_DEPTHS = [2, 4, 6, 8] as const;

// ─── Community Photos ─────────────────────────────────────────────────────────

export const communityPhotos: CommunityPhoto[] = [
  // ── Celebration ──────────────────────────────────────────────────────────
  {
    src: '/images/community/cookout-pavilion.png',
    alt: 'A large crowd of community members gathered at the Duffy Pavilion during an All Sides of Town cookout',
    caption: 'The whole community, one table.',
    category: 'celebration',
    objectPosition: 'center center',
  },

  // ── Community ─────────────────────────────────────────────────────────────
  {
    src: '/images/community/bowling.jpg',
    alt: 'Lead By Example youth and mentors bowling together at a community event',
    caption: 'Every lane, a shared story.',
    category: 'community',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/bench-bowl.jpg',
    alt: 'Community members seated on benches together at a Lead By Example bowling event',
    caption: 'Sidelines are where stories begin.',
    category: 'community',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/ryders.png',
    alt: "Lead By Example members gathered at a Ryder's community event in Providence",
    caption: 'Every corner of Providence.',
    category: 'community',
    objectPosition: 'center center',
  },
  {
    src: '/images/bw/cafe-visit.jpg',
    alt: 'Lead By Example youth and mentors at a community cafe visit',
    caption: 'Conversations that change the course.',
    category: 'community',
    objectPosition: 'center center',
  },

  // ── Advocacy ─────────────────────────────────────────────────────────────
  {
    src: '/images/community/panelists.png',
    alt: 'Lead By Example representatives testifying at a formal government hearing panel',
    caption: 'When communities speak, systems listen.',
    category: 'advocacy',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/bored-meeting.jpg',
    alt: 'Community members and advocates seated around a conference table during a Lead By Example planning session',
    caption: 'The work behind the work.',
    category: 'advocacy',
    objectPosition: 'center top',
  },

  // ── Journey ───────────────────────────────────────────────────────────────
  {
    src: '/images/bw/history-culture.jpg',
    alt: 'Lead By Example mentors and youth posing at the National Museum of African American History and Culture in Washington D.C.',
    caption: 'Roots that ground us.',
    category: 'journey',
    objectPosition: 'center center',
  },
];

// ─── Cookout Editions ─────────────────────────────────────────────────────────
// gradientClass uses semantic tokens only: verdean, royal, gold (no indigo/violet/teal/etc.)

export const cookoutEditions: CookoutEdition[] = [
  {
    edition: 1,
    label: '1st Annual',
    year: 2019,
    location: 'Lincoln Woods',
    timeRange: '12:00pm – 7:00pm',
    tagline: 'The day all sides of town found common ground.',
    gradientClass: 'from-verdean-800 to-verdean-900',
  },
  {
    edition: 2,
    label: '2nd Annual',
    year: 2020,
    location: 'Lincoln Woods',
    timeRange: '12:00pm – 7:00pm',
    tagline: 'Even the unexpected could not stop this community.',
    gradientClass: 'from-royal-800 to-royal-900',
  },
  {
    edition: 3,
    label: '3rd Annual',
    year: 2021,
    location: 'Lincoln Woods',
    timeRange: '12:00pm – 7:00pm',
    tagline: 'Coming back stronger, together.',
    gradientClass: 'from-verdean-800 to-verdean-900',
  },
  {
    edition: 4,
    label: '4th Annual',
    year: 2022,
    location: 'Lincoln Woods',
    timeRange: '12:30pm – 8:00pm',
    tagline: 'Hundreds of families, one shared table.',
    gradientClass: 'from-royal-800 to-royal-900',
  },
  {
    edition: 5,
    label: '5th Annual',
    year: 2023,
    location: 'Lincoln Woods',
    timeRange: '12:30pm – 8:00pm',
    tagline: 'Five years of showing up, no matter what.',
    gradientClass: 'from-royal-800 to-royal-900',
  },
  {
    edition: 6,
    label: '6th Annual',
    year: 2026,
    location: 'Lincoln Woods Site A&B',
    timeRange: '12:30pm – 8:00pm',
    tagline: 'This July — everyone welcome.',
    gradientClass: 'from-gold-800 to-gold-900',
  },
];
