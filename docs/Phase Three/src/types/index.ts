/**
 * Type definitions for Lead By Example website
 */

export interface Fundraiser {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  date: string;
  location: string;
  features?: string[];
  status: 'active' | 'completed' | 'upcoming';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface ArchivedFundraiser {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  date: string;
  location: string;
  impact?: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
}

export interface NewsletterFormData {
  firstName: string;
  email: string;
  interests: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}
