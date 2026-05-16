import type { CommunityPhoto, CookoutEdition } from '@/types/media';

export const communityPhotos: CommunityPhoto[] = [
  // ── Celebration ──────────────────────────────────────────────────────────
  {
    src: '/images/community/cookout-pavilion.png',
    alt: 'A large crowd of community members gathered at the Duffy Pavilion during an All Sides of Town cookout',
    caption: 'The whole community, one table.',
    category: 'celebration',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/pavilion-dramatic-cool.png',
    alt: 'Dramatic wide-angle shot of the All Sides of Town cookout pavilion filled with attendees',
    caption: 'Where the community gathers.',
    category: 'celebration',
    objectPosition: 'center center',
  },

  // ── Community ─────────────────────────────────────────────────────────────
  {
    src: '/images/community/bowl-vignette.jpg',
    alt: 'Community members smiling and gathered at a table during a Lead By Example bowling event',
    caption: 'Joy looks like this.',
    category: 'community',
    objectPosition: 'center top',
  },
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
    src: '/images/community/cafe-warm.jpg',
    alt: 'Youth and mentors gathered at a Cape Verdean cafe for a Lead By Example community meeting',
    caption: 'Where bonds are built over real conversations.',
    category: 'community',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/ryders.png',
    alt: 'Lead By Example members gathered at a Ryder\'s community event in Providence',
    caption: 'Every corner of Providence.',
    category: 'community',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/ryders-burn.png',
    alt: 'Community members at a Ryder\'s event with dramatic warm lighting',
    caption: 'Showing up for each other.',
    category: 'community',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/culture-amp.jpg',
    alt: 'Youth and mentors at a culture amplification event hosted by Lead By Example',
    caption: 'Culture as a compass.',
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
  {
    src: '/images/community/meeting-vignette.jpg',
    alt: 'Community advocates gathered in a candid planning meeting with a vignette treatment',
    caption: 'Planning the path forward.',
    category: 'advocacy',
    objectPosition: 'center center',
  },
  {
    src: '/images/community/panel-vignette.png',
    alt: 'Lead By Example representatives at a community panel discussion with a vignette treatment',
    caption: 'Voices at the table.',
    category: 'advocacy',
    objectPosition: 'center center',
  },

  // ── Journey ───────────────────────────────────────────────────────────────
  {
    src: '/images/community/history-culture-warm.jpg',
    alt: 'Lead By Example mentors and youth posing at the National Museum of African American History and Culture in Washington D.C.',
    caption: 'Learning where we come from.',
    category: 'journey',
    objectPosition: 'center center',
  },

  // ── Black & white (isMonochrome: reveal color on hover) ───────────────────
  {
    src: '/images/bw/b-w-cool-bowl.jpg',
    alt: 'Black and white photo of a child bowling at a Lead By Example community event',
    caption: 'Building confidence, one frame at a time.',
    category: 'community',
    isMonochrome: true,
    objectPosition: 'center center',
  },
  {
    src: '/images/bw/cafe-visit.jpg',
    alt: 'Black and white photo of Lead By Example youth and mentors at a community cafe visit',
    caption: 'Conversations that change the course.',
    category: 'community',
    isMonochrome: true,
    objectPosition: 'center center',
  },
  {
    src: '/images/bw/history-culture.jpg',
    alt: 'Black and white photo of Lead By Example mentors and youth at a history and culture museum',
    caption: 'Roots that ground us.',
    category: 'journey',
    isMonochrome: true,
    objectPosition: 'center center',
  },
];

export const cookoutEditions: CookoutEdition[] = [
  {
    edition: 1,
    label: '1st Annual',
    year: 2019,
    location: 'Lincoln Woods',
    timeRange: '12:00pm – 7:00pm',
    tagline: 'The day all sides of town found common ground.',
    gradientClass: 'from-teal-900 to-teal-950',
  },
  {
    edition: 2,
    label: '2nd Annual',
    year: 2020,
    location: 'Lincoln Woods',
    timeRange: '12:00pm – 7:00pm',
    tagline: 'Even the unexpected could not stop this community.',
    gradientClass: 'from-purple-900 to-purple-950',
  },
  {
    edition: 3,
    label: '3rd Annual',
    year: 2021,
    location: 'Lincoln Woods',
    timeRange: '12:00pm – 7:00pm',
    tagline: 'Coming back stronger, together.',
    gradientClass: 'from-emerald-900 to-emerald-950',
  },
  {
    edition: 4,
    label: '4th Annual',
    year: 2022,
    location: 'Lincoln Woods',
    timeRange: '12:30pm – 8:00pm',
    tagline: 'Hundreds of families, one shared table.',
    gradientClass: 'from-indigo-900 to-indigo-950',
  },
  {
    edition: 5,
    label: '5th Annual',
    year: 2023,
    location: 'Lincoln Woods',
    timeRange: '12:30pm – 8:00pm',
    tagline: 'Five years of showing up, no matter what.',
    gradientClass: 'from-violet-900 to-violet-950',
  },
  {
    edition: 6,
    label: '6th Annual',
    year: 2026,
    location: 'Lincoln Woods Site A&B',
    timeRange: '12:30pm – 8:00pm',
    tagline: 'This July — everyone welcome.',
    gradientClass: 'from-amber-900 to-amber-950',
  },
];
