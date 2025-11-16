export interface Fundraiser {
  id: string;
  title: string;
  goal: number;
  raised: number;
  date: string;
  time: string;
  location: string;
  locationLat?: number;
  locationLng?: number;
  features: string[];
  description?: string;
}

export interface OrganizationInfo {
  address: string;
  phone: string;
  email: string;
  lat?: number;
  lng?: number;
}

export interface KeyStatistics {
  youthServed: number;
  successRate: number;
  communityPartners: number;
}

export const currentFundraiser: Fundraiser = {
  id: 'all-sides-cookout-2025',
  title: 'All Sides of Town Cookout 2025',
  goal: 10000,
  raised: 6250,
  date: 'August 2, 2025',
  time: '12:30pm-8:00pm',
  location: 'Lincoln Woods Site A&B',
  locationLat: 41.9240,
  locationLng: -71.4395,
  features: [
    'Free food for all attendees',
    'Free haircuts',
    'Activities for youth and adults',
    'Backpack giveaway for students'
  ],
  description: 'Join us for our annual community cookout bringing together families from all neighborhoods for a day of food, fun, and fellowship.'
};

export const keyStatistics: KeyStatistics = {
  youthServed: 500,
  successRate: 87,
  communityPartners: 25
};

export const organizationInfo: OrganizationInfo = {
  address: '120 Hawkins Street, Providence, RI 02908',
  phone: '(401) 699-6544',
  email: 'contact@leadbyexample.org',
  lat: 41.8093,
  lng: -71.4211
};

export const pastFundraisers: Fundraiser[] = [
  {
    id: 'back-to-school-2024',
    title: 'Back to School Drive 2024',
    goal: 10000,
    raised: 15000,
    date: 'August 15, 2024',
    time: '10:00am-2:00pm',
    location: 'Providence Recreation Center',
    features: [
      'Free school supplies',
      'Backpack distribution',
      'Health screenings',
      'Educational resources'
    ],
    description: 'Providing essential school supplies and resources to ensure every student starts the year prepared for success.'
  },
  {
    id: 'youth-summit-2024',
    title: 'Youth Empowerment Summit 2024',
    goal: 8500,
    raised: 8500,
    date: 'June 20, 2024',
    time: '9:00am-5:00pm',
    location: 'Brown University Campus',
    features: [
      'Leadership workshops',
      'Career counseling',
      'Mentorship matching',
      'College preparation'
    ],
    description: 'Empowering youth with the skills, knowledge, and connections needed for future success.'
  },
  {
    id: 'winter-clothing-2023',
    title: 'Winter Clothing Drive 2023',
    goal: 10000,
    raised: 12000,
    date: 'December 10, 2023',
    time: '11:00am-4:00pm',
    location: 'Dexter Street Training Ground',
    features: [
      'Free winter coats',
      'Warm clothing distribution',
      'Hot meals served',
      'Health checks'
    ],
    description: 'Keeping our community warm during the harsh winter months with essential clothing and supplies.'
  }
];