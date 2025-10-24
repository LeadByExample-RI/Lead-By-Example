/**
 * Animation variants for Framer Motion
 */

type Variants = Record<string, unknown>;

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.3 }
  },
};

/**
 * Slide up animation
 */
export const slideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    y: -20, 
    opacity: 0, 
    transition: { duration: 0.3 }
  },
};

/**
 * Slide down animation
 */
export const slideDown: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    y: 20, 
    opacity: 0, 
    transition: { duration: 0.3 }
  },
};

/**
 * Slide from left
 */
export const slideLeft: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    x: -20, 
    opacity: 0, 
    transition: { duration: 0.3 }
  },
};

/**
 * Slide from right
 */
export const slideRight: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    x: 20, 
    opacity: 0, 
    transition: { duration: 0.3 }
  },
};

/**
 * Scale in animation
 */
export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0, 
    transition: { duration: 0.2 }
  },
};

/**
 * Pop in animation with bounce
 */
export const popIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 20 
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0, 
    transition: { duration: 0.2 }
  },
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item animation
 */
export const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/**
 * Page transition variants
 */
export const pageVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Modal backdrop animation
 */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  },
};

/**
 * Modal content animation
 */
export const modalVariants: Variants = {
  hidden: { 
    scale: 0.95, 
    opacity: 0,
    y: 20,
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
    },
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  },
};

/**
 * Drawer animation (from right)
 */
export const drawerVariants: Variants = {
  hidden: { 
    x: '100%',
    opacity: 0,
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
  exit: { 
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Accordion content animation
 */
export const accordionVariants: Variants = {
  collapsed: { 
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  expanded: { 
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Hover animations for buttons
 */
export const buttonHover = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

export const buttonTap = {
  scale: 0.95,
};

/**
 * Rotation animation
 */
export const rotate: Variants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};
