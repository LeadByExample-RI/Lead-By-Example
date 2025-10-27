/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cape-verde': {
          DEFAULT: '#01514C',
          dark: '#003d39',
          light: '#027066',
        },
        'royal-purple': {
          DEFAULT: '#4B306A',
          dark: '#421B5A',
          light: '#5d3c7f',
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#E5C100',
          light: '#ffed4e',
        },
        'off-white': '#F6F6F6',
        'coral-accent': '#FF6F61',
        'copper-accent': '#B87333',
        // Cape Verdean Color Palette - Primary (Deep Green-Blue)
        primary: {
          50: '#e6f5f4',
          100: '#cceae9',
          200: '#99d5d3',
          300: '#66c0bd',
          400: '#33aba7',
          500: '#01514C', // Main Cape Verde color
          600: '#014843',
          700: '#013e3a',
          800: '#013531',
          900: '#002c28',
          950: '#001f1c',
        },
        // Cape Verdean Color Palette - Secondary (Royal Purple)
        secondary: {
          50: '#f3eff7',
          100: '#e7dfef',
          200: '#cfbfdf',
          300: '#b79fcf',
          400: '#9f7fbf',
          500: '#4B306A', // Main Royal Purple color
          600: '#432b5e',
          700: '#3b2652',
          800: '#332046',
          900: '#2b1b3a',
          950: '#1f1329',
        },
        // Accent color (Brilliant Gold)
        accent: {
          50: '#fffef0',
          100: '#fffce0',
          200: '#fff9c2',
          300: '#fff6a3',
          400: '#fff385',
          500: '#FFD700', // Main Gold color
          600: '#e5c100',
          700: '#ccab00',
          800: '#b39500',
          900: '#997f00',
          950: '#665500',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
