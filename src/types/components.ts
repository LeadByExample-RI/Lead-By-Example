import { MotionProps } from 'framer-motion';
import { ResponsiveValue } from './design-tokens';

// Base Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button Component Types
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

// Input Component Types
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'flushed' | 'unstyled';
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
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

// Card Component Types
export interface CardProps extends BaseComponentProps {
  variant?: 'elevated' | 'outlined' | 'filled' | 'unstyled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
  external?: boolean;
}

export interface NavigationProps extends BaseComponentProps {
  variant?: 'horizontal' | 'vertical' | 'mobile';
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

// Header Types
export interface HeaderAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface HeaderProps extends BaseComponentProps {
  variant?: 'default' | 'transparent' | 'sticky';
  navigation: NavigationProps;
  actions?: HeaderAction[];
  searchEnabled?: boolean;
  mobileMenuEnabled?: boolean;
}

// Footer Types
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

export interface FooterProps extends BaseComponentProps {
  variant?: 'default' | 'minimal' | 'detailed';
  sections: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  logo?: React.ReactNode;
}

// Hero Section Types
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

export interface HeroProps extends BaseComponentProps {
  variant?: 'default' | 'centered' | 'split' | 'video';
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

// Features Section Types
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

export interface FeaturesProps extends BaseComponentProps {
  variant?: 'grid' | 'list' | 'carousel' | 'alternating';
  title?: string;
  description?: string;
  features: Feature[];
  columns?: ResponsiveValue<1 | 2 | 3 | 4>;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

// Grid Component Types
export interface GridProps extends BaseComponentProps {
  columns: ResponsiveValue<number>;
  gap?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  rows?: ResponsiveValue<number>;
  autoRows?: string;
  autoColumns?: string;
}

// Modal Types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
}

// Notification Types
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
}

// Loading Types
export interface LoadingProps extends BaseComponentProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'neutral';
  text?: string;
}

// Image Types
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
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}
