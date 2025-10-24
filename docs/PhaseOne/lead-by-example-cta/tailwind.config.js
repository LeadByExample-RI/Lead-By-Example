/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cape Verdean inspired colors
        verdean: {
          50: '#e6f7f6',
          100: '#b3e7e4',
          200: '#80d7d2',
          300: '#4dc7c0',
          400: '#1ab7ae',
          500: '#01514C', // Primary Cape Verdean blue-green
          600: '#014843',
          700: '#013e3a',
          800: '#013531',
          900: '#012b28',
        },
        // Modern purple palette
        royal: {
          50: '#f5f3f7',
          100: '#e6e0ec',
          200: '#cdc2d9',
          300: '#b3a3c6',
          400: '#9a85b3',
          500: '#4B306A', // Royal purple
          600: '#421B5A', // Deep purple
          700: '#36174a',
          800: '#2b123a',
          900: '#1f0d2a',
        },
        // Gold accents
        gold: {
          50: '#fffef5',
          100: '#fffae6',
          200: '#fff5cc',
          300: '#fff0b3',
          400: '#ffeb99',
          500: '#FFD700', // Brilliant gold
          600: '#E5C100', // Rich gold
          700: '#ccac00',
          800: '#b39600',
          900: '#998100',
        },
        // Neutrals
        neutral: {
          50: '#F6F6F6',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)',
          },
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
