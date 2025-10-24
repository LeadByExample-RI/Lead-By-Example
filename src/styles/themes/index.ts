/**
 * Theme configuration for Lead By Example
 * Cape Verdean Blue-Green, Royal Purple, and Brilliant Gold color scheme
 */

export const theme = {
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#01514C', // Cape Verdean Blue-Green
      600: '#014741',
      700: '#013d37',
      800: '#01332d',
      900: '#012923',
      950: '#001f1a',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#4B306A', // Royal Purple
      600: '#421B5A',
      700: '#3a1651',
      800: '#321248',
      900: '#2a0e3f',
      950: '#220a36',
    },
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#FFD700', // Brilliant Gold
      600: '#E5C100',
      700: '#d4af00',
      800: '#b8960d',
      900: '#975a16',
      950: '#633a02',
    },
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'Fira Code', monospace",
  },
  spacing: {
    containerPadding: '1rem',
    sectionGap: '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  glassmorphism: {
    light: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
      blur: '20px',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.2)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      blur: '20px',
    },
  },
} as const;

export type Theme = typeof theme;
