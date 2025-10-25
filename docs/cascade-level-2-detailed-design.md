# 📋 Level 2: Detailed Design & Specifications

## Context Inheritance from Level 1

- **Architecture**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Performance**: < 3s load, 95+ Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliance
- **State Management**: Zustand + React Context

## Component Architecture Design

### Design System Hierarchy

```
Design System
├── Tokens (Colors, Typography, Spacing)
├── Primitives (Button, Input, Card, etc.)
├── Patterns (Form, Navigation, Modal, etc.)
├── Templates (Page layouts)
└── Pages (Complete views)
```

### Core Component Specifications

#### 1. Design Tokens

```typescript
// src/types/design-tokens.ts
export interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
  };
  typography: {
    fontFamily: FontFamily;
    fontSize: FontSizeScale;
    fontWeight: FontWeightScale;
    lineHeight: LineHeightScale;
  };
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
  breakpoints: BreakpointScale;
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Base color
  600: string;
  700: string;
  800: string;
  900: string;
}
```

#### 2. Button Component

```typescript
// src/components/ui/Button.tsx
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Animation specifications
const buttonAnimations = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  },
  loading: {
    opacity: 0.7,
    cursor: 'not-allowed'
  }
};
```

#### 3. Input Component

```typescript
// src/components/ui/Input.tsx
export interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'filled' | 'flushed' | 'unstyled';
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
```

#### 4. Card Component

```typescript
// src/components/ui/Card.tsx
export interface CardProps {
  variant: 'elevated' | 'outlined' | 'filled' | 'unstyled';
  padding: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean; // Adds hover effects
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Micro-interaction specifications
const cardAnimations = {
  interactive: {
    hover: {
      y: -2,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.2 }
    }
  }
};
```

### Layout Components

#### 1. Navigation Component

```typescript
// src/components/layout/Navigation.tsx
export interface NavigationProps {
  variant: 'horizontal' | 'vertical' | 'mobile';
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
}
```

#### 2. Header Component

```typescript
// src/components/layout/Header.tsx
export interface HeaderProps {
  variant: 'default' | 'transparent' | 'sticky';
  navigation: NavigationProps;
  actions?: HeaderAction[];
  searchEnabled?: boolean;
  mobileMenuEnabled?: boolean;
}

export interface HeaderAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}
```

#### 3. Footer Component

```typescript
// src/components/layout/Footer.tsx
export interface FooterProps {
  variant: 'default' | 'minimal' | 'detailed';
  sections: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  logo?: React.ReactNode;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}
```

### Page Components & Templates

#### 1. Hero Section

```typescript
// src/components/sections/Hero.tsx
export interface HeroProps {
  variant: 'default' | 'centered' | 'split' | 'video';
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  animations?: HeroAnimations;
}

export interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}

export interface HeroAnimations {
  title: MotionProps;
  subtitle: MotionProps;
  description: MotionProps;
  actions: MotionProps;
}
```

#### 2. Feature Section

```typescript
// src/components/sections/Features.tsx
export interface FeaturesProps {
  variant: 'grid' | 'list' | 'carousel' | 'alternating';
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  link?: {
    label: string;
    href: string;
  };
}
```

### Form Components

#### 1. Contact Form

```typescript
// src/components/forms/ContactForm.tsx
export interface ContactFormProps {
  variant: 'default' | 'modal' | 'inline';
  fields: FormField[];
  onSubmit: (data: ContactFormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  organization?: string;
}

export interface FormField {
  name: keyof ContactFormData;
  label: string;
  type: InputProps['type'] | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
}
```

### Animation Specifications

#### 1. Page Transitions

```typescript
// src/utils/animations.ts
export const pageTransitions = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};
```

#### 2. Scroll Animations

```typescript
export const scrollAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};
```

## State Management Architecture

### Global State Structure

```typescript
// src/store/types.ts
export interface AppState {
  ui: UIState;
  user: UserState;
  content: ContentState;
  forms: FormsState;
}

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  loading: boolean;
  notifications: Notification[];
  modals: ModalState[];
}

export interface UserState {
  isAuthenticated: boolean;
  profile?: UserProfile;
  preferences: UserPreferences;
}

export interface ContentState {
  pages: Record<string, PageContent>;
  navigation: NavigationItem[];
  siteSettings: SiteSettings;
}
```

### Store Implementation

```typescript
// src/store/ui-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIStore extends UIState {
  // Actions
  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  openModal: (modal: Omit<ModalState, 'id'>) => void;
  closeModal: (id: string) => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      theme: 'system',
      sidebarOpen: false,
      mobileMenuOpen: false,
      loading: false,
      notifications: [],
      modals: [],

      // Actions
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setLoading: (loading) => set({ loading }),
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { ...notification, id: crypto.randomUUID() }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      openModal: (modal) => set((state) => ({
        modals: [...state.modals, { ...modal, id: crypto.randomUUID() }]
      })),
      closeModal: (id) => set((state) => ({
        modals: state.modals.filter(m => m.id !== id)
      }))
    }),
    { name: 'ui-store' }
  )
);
```

## API Design & Data Flow

### Content Management

```typescript
// src/types/api.ts
export interface ContentAPI {
  // Page content
  getPageContent: (slug: string) => Promise<PageContent>;
  updatePageContent: (slug: string, content: Partial<PageContent>) => Promise<PageContent>;
  
  // Navigation
  getNavigation: () => Promise<NavigationItem[]>;
  updateNavigation: (items: NavigationItem[]) => Promise<NavigationItem[]>;
  
  // Site settings
  getSiteSettings: () => Promise<SiteSettings>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<SiteSettings>;
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
}

export interface ContentBlock {
  id: string;
  type: 'hero' | 'features' | 'text' | 'image' | 'video' | 'form' | 'custom';
  data: Record<string, any>;
  order: number;
}
```

### Form Handling

```typescript
// src/types/forms.ts
export interface FormAPI {
  submitContactForm: (data: ContactFormData) => Promise<FormSubmissionResult>;
  subscribeNewsletter: (email: string) => Promise<SubscriptionResult>;
  submitFeedback: (data: FeedbackData) => Promise<FormSubmissionResult>;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
```

## Responsive Design Specifications

### Breakpoint Strategy

```typescript
// tailwind.config.js breakpoints
const breakpoints = {
  'xs': '475px',   // Mobile landscape
  'sm': '640px',   // Tablet portrait
  'md': '768px',   // Tablet landscape
  'lg': '1024px',  // Desktop small
  'xl': '1280px',  // Desktop medium
  '2xl': '1536px'  // Desktop large
};
```

### Component Responsive Behavior

```typescript
// src/components/ui/Grid.tsx
export interface GridProps {
  columns: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  children: React.ReactNode;
}

type ResponsiveValue<T> = T | {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};
```

## Accessibility Specifications

### WCAG 2.1 AA Compliance Requirements

```typescript
// src/types/accessibility.ts
export interface AccessibilityFeatures {
  // Keyboard navigation
  keyboardNavigation: boolean;
  focusManagement: boolean;
  skipLinks: boolean;
  
  // Screen reader support
  ariaLabels: boolean;
  semanticHTML: boolean;
  altText: boolean;
  
  // Visual accessibility
  colorContrast: 'AA' | 'AAA';
  textScaling: boolean;
  reducedMotion: boolean;
  
  // Interactive elements
  focusIndicators: boolean;
  clickTargetSize: boolean; // Minimum 44px
  touchTargetSpacing: boolean; // Minimum 8px
}
```

### Focus Management

```typescript
// src/hooks/useFocusManagement.ts
export interface FocusManagementHook {
  trapFocus: (containerRef: React.RefObject<HTMLElement>) => void;
  restoreFocus: () => void;
  moveFocusToNext: () => void;
  moveFocusToPrevious: () => void;
  announceLiveRegion: (message: string, priority?: 'polite' | 'assertive') => void;
}
```

## Performance Specifications

### Bundle Optimization Strategy

```typescript
// next.config.js optimization
const bundleOptimization = {
  // Code splitting
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  
  // Compression
  compress: true,
  poweredByHeader: false,
  
  // Static optimization
  output: 'standalone',
  trailingSlash: false
};
```

### Loading Strategies

```typescript
// src/components/ui/LazyImage.tsx
export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
}
```

## Integration Points

### Third-party Services

```typescript
// src/services/integrations.ts
export interface IntegrationServices {
  analytics: {
    provider: 'google-analytics' | 'plausible' | 'mixpanel';
    trackPageView: (url: string) => void;
    trackEvent: (event: string, properties?: Record<string, any>) => void;
  };
  
  monitoring: {
    provider: 'sentry' | 'bugsnag' | 'rollbar';
    captureException: (error: Error) => void;
    captureMessage: (message: string, level?: 'info' | 'warning' | 'error') => void;
  };
  
  forms: {
    provider: 'netlify-forms' | 'formspree' | 'emailjs';
    submitForm: (data: Record<string, any>) => Promise<FormSubmissionResult>;
  };
}
```

## Validation Checklist

### Component Specifications

- [ ] All core UI components specified with TypeScript interfaces
- [ ] Animation specifications defined for micro-interactions
- [ ] Responsive behavior documented for all components
- [ ] Accessibility requirements specified (WCAG 2.1 AA)

### Architecture Design

- [ ] State management architecture defined
- [ ] API interfaces and data flow documented
- [ ] Performance optimization strategies specified
- [ ] Integration points identified and documented

### Design System

- [ ] Design tokens defined (colors, typography, spacing)
- [ ] Component hierarchy established
- [ ] Consistent naming conventions applied
- [ ] Reusability and composability ensured

### Context Preparation

- [ ] Component specifications ready for implementation
- [ ] State management patterns defined
- [ ] Performance requirements translated to technical specs
- [ ] Accessibility requirements detailed for development

---

**Status**: ✅ COMPLETED  
**Next Level**: Level 3 - Foundation & Infrastructure Setup  
**Context Passed**: Component specifications, state architecture, API design, performance requirements, accessibility specs
