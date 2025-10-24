// Store and State Management Types
import { NavigationItem, SiteSettings } from './api';

// Global App State
export interface AppState {
  ui: UIState;
  user: UserState;
  content: ContentState;
  forms: FormsState;
}

// UI State
export interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  loading: boolean;
  notifications: Notification[];
  modals: ModalState[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

export interface ModalState {
  id: string;
  component: string;
  props?: Record<string, unknown>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// User State
export interface UserState {
  isAuthenticated: boolean;
  profile?: UserProfile;
  preferences: UserPreferences;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

// Content State
export interface ContentState {
  pages: Record<string, PageContent>;
  navigation: NavigationItem[];
  siteSettings: SiteSettings;
  loading: boolean;
  error?: string;
}

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

// Forms State
export interface FormsState {
  submissions: Record<string, FormSubmission>;
  loading: Record<string, boolean>;
  errors: Record<string, string>;
}

export interface FormSubmission {
  id: string;
  formType: string;
  data: Record<string, unknown>;
  status: 'pending' | 'success' | 'error';
  submittedAt: Date;
  response?: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

// Store Actions
export interface UIActions {
  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  openModal: (modal: Omit<ModalState, 'id'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

export interface UserActions {
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ContentActions {
  setPageContent: (slug: string, content: PageContent) => void;
  setNavigation: (navigation: NavigationItem[]) => void;
  setSiteSettings: (settings: SiteSettings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadPageContent: (slug: string) => Promise<void>;
  loadNavigation: () => Promise<void>;
  loadSiteSettings: () => Promise<void>;
}

export interface FormsActions {
  setSubmission: (id: string, submission: FormSubmission) => void;
  setLoading: (formId: string, loading: boolean) => void;
  setError: (formId: string, error: string) => void;
  clearError: (formId: string) => void;
  submitForm: (formType: string, data: Record<string, unknown>) => Promise<void>;
}

// Store Selectors
export interface UISelectors {
  theme: UIState['theme'];
  isDarkMode: boolean;
  isLoading: boolean;
  notifications: Notification[];
  modals: ModalState[];
  isMobileMenuOpen: boolean;
  isSidebarOpen: boolean;
}

export interface UserSelectors {
  isAuthenticated: boolean;
  user: UserProfile | null;
  preferences: UserPreferences;
  hasRole: (role: UserProfile['role']) => boolean;
}

export interface ContentSelectors {
  getPageContent: (slug: string) => PageContent | null;
  navigation: NavigationItem[];
  siteSettings: SiteSettings | null;
  isLoading: boolean;
  error: string | null;
}

export interface FormsSelectors {
  getSubmission: (id: string) => FormSubmission | null;
  isLoading: (formId: string) => boolean;
  getError: (formId: string) => string | null;
  getSubmissionsByType: (formType: string) => FormSubmission[];
}
