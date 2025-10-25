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
        // Cape Verdean color palette
        verdean: {
          50: '#e6f4f3',
          100: '#b3dfd9',
          200: '#80cabf',
          300: '#4db5a5',
          400: '#1aa08b',
          500: '#01514C', // Primary Cape Verdean blue-green
          600: '#01413d',
          700: '#01312e',
          800: '#00201f',
          900: '#001010',
        },
        royal: {
          50: '#f3eff7',
          100: '#ddd1e7',
          200: '#c7b3d7',
          300: '#b195c7',
          400: '#9b77b7',
          500: '#4B306A', // Royal purple
          600: '#3c2655',
          700: '#2d1d40',
          800: '#1e132a',
          900: '#0f0a15',
        },
        deep: {
          500: '#421B5A', // Deep purple
          600: '#351648',
          700: '#281136',
          800: '#1a0b24',
          900: '#0d0612',
        },
        gold: {
          50: '#fffef5',
          100: '#fffcd9',
          200: '#fffabd',
          300: '#fff8a1',
          400: '#fff685',
          500: '#FFD700', // Brilliant gold
          600: '#ccac00',
          700: '#998100',
          800: '#665600',
          900: '#332b00',
        },
        accent: {
          gold: '#E5C100', // Rich gold
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
