// API and Data Types

// Content Management Types
export interface PageContent {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: ContentBlock[];
  seo: SEOData;
  publishedAt?: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface ContentBlock {
  id: string;
  type: 'hero' | 'features' | 'text' | 'image' | 'video' | 'form' | 'custom';
  data: Record<string, unknown>;
  order: number;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
  analytics: AnalyticsConfig;
  seo: GlobalSEOSettings;
}

export interface SocialLink {
  platform: string;
  url: string;
  username?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  plausibleDomain?: string;
  mixpanelToken?: string;
}

export interface GlobalSEOSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  organization?: string;
}

export interface NewsletterSubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
}

export interface FeedbackData {
  rating: number;
  feedback: string;
  category: string;
  email?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: Record<string, unknown>;
}

export interface SubscriptionResult {
  success: boolean;
  message: string;
  subscribed: boolean;
}

// Validation Types
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number | RegExp;
  message: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
  options?: SelectOption[];
  helperText?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// API Interfaces
export interface ContentAPI {
  getPageContent: (slug: string) => Promise<PageContent>;
  updatePageContent: (slug: string, content: Partial<PageContent>) => Promise<PageContent>;
  getNavigation: () => Promise<NavigationItem[]>;
  updateNavigation: (items: NavigationItem[]) => Promise<NavigationItem[]>;
  getSiteSettings: () => Promise<SiteSettings>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<SiteSettings>;
}

export interface FormAPI {
  submitContactForm: (data: ContactFormData) => Promise<FormSubmissionResult>;
  subscribeNewsletter: (data: NewsletterSubscriptionData) => Promise<SubscriptionResult>;
  submitFeedback: (data: FeedbackData) => Promise<FormSubmissionResult>;
}

// HTTP Types
export interface APIResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface APIError {
  message: string;
  code?: string;
  status: number;
  details?: Record<string, unknown>;
}

// Navigation Types (imported from components but redefined for API)
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
  external?: boolean;
  order: number;
}
