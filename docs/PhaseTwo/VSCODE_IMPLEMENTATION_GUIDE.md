# 🎯 VS CODE - Lead By Example Implementation Guide

**For:** Visual Studio Code Users
**Project:** Lead By Example Call-to-Action Website
**Status:** Ready for Phase 1 Implementation

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] VS Code installed (latest version)
- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git installed
- [ ] Terminal access

**Verify installations:**

```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
git --version   # Any recent version
```

---

## 🎨 Recommended VS Code Extensions

Install these extensions for optimal development experience:

### Essential

1. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
2. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
3. **ESLint** (dbaeumer.vscode-eslint)
4. **Prettier - Code formatter** (esbenp.prettier-vscode)
5. **TypeScript Hero** (rbbit.typescript-hero)

### Highly Recommended

6. **Auto Rename Tag** (formulahendry.auto-rename-tag)
7. **Path Intellisense** (christian-kohler.path-intellisense)
8. **GitLens** (eamodio.gitlens)
9. **Error Lens** (usernamehw.errorlens)
10. **Import Cost** (wix.vscode-import-cost)

**Quick Install Command:**

```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension rbbit.typescript-hero
```

---

## 🚀 PHASE 1: Project Initialization

### Step 1.1: Create Project Directory

```bash
# Create project directory
cd ~/Projects  # or your preferred location
mkdir lead-by-example
cd lead-by-example

# Open in VS Code
code .
```

### Step 1.2: Initialize Next.js Project

**In VS Code Terminal (Ctrl+`):**

```bash
# Initialize Next.js with TypeScript
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# When prompted:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? Yes
# ✔ Would you like to use App Router? No (use Pages Router)
# ✔ Would you like to customize the default import alias? Yes → @/*
```

### Step 1.3: Install Additional Dependencies

```bash
# Animation library
npm install framer-motion

# Form handling
npm install react-hook-form @hookform/resolvers zod

# Icons
npm install lucide-react

# Utility libraries
npm install clsx tailwind-merge

# State management (optional, for future)
npm install zustand
```

### Step 1.4: Configure VS Code Settings

**Create `.vscode/settings.json`:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": true
  }
}
```

### Step 1.5: Update Configuration Files

**Update `tailwind.config.js`:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        verdean: {
          DEFAULT: '#01514C',
          50: '#E6F2F1',
          100: '#CCE5E3',
          200: '#99CBC7',
          300: '#66B1AB',
          400: '#33978F',
          500: '#01514C',
          600: '#01413D',
          700: '#01312E',
          800: '#00201E',
          900: '#00100F',
        },
        royal: {
          DEFAULT: '#4B306A',
          50: '#F3EFF7',
          100: '#E7DFEF',
          200: '#CFBFDF',
          300: '#B79FCF',
          400: '#9F7FBF',
          500: '#4B306A',
          600: '#3C2655',
          700: '#2D1D40',
          800: '#1E132B',
          900: '#0F0A15',
        },
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFFEF5',
          100: '#FFFCEB',
          200: '#FFF9D6',
          300: '#FFF5C2',
          400: '#FFF2AD',
          500: '#FFD700',
          600: '#E5C100',
          700: '#B39600',
          800: '#806B00',
          900: '#4D4000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

---

## 🎨 PHASE 2: Project Structure Setup

### Step 2.1: Create Directory Structure

```bash
# Create all necessary directories
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/types
mkdir -p public/images
```

### Step 2.2: Create Utility Files

**`src/utils/cn.ts`** (className utility):

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**`src/utils/helpers.ts`:**

```typescript
/**
 * Format currency with appropriate symbol
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate percentage with two decimal places
 */
export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100 * 100) / 100;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

### Step 2.3: Create Type Definitions

**`src/types/index.ts`:**

```typescript
export interface Fundraiser {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  date: string;
  location: string;
  features: string[];
  status: 'active' | 'completed';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
}

export interface NewsletterFormData {
  firstName: string;
  email: string;
  interests: string[];
}
```

### Step 2.4: Create Custom Hooks

**`src/hooks/useInView.ts`:**

```typescript
import { useEffect, useState, useRef, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}
```

---

## 🎯 PHASE 3: Core Components Development

### Step 3.1: Create Global Styles

**`src/styles/globals.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-inter: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    --font-heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-gradient-to-br from-royal-900 via-verdean-900 to-royal-800 text-white;
    font-family: var(--font-inter);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
  }
}

@layer components {
  .glass-card {
    @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl;
  }

  .glass-card-hover {
    @apply glass-card transition-all duration-300 hover:bg-white/15 hover:shadow-2xl hover:-translate-y-1;
  }

  .btn-primary {
    @apply bg-gold-500 text-royal-900 font-bold px-6 py-3 rounded-full transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:scale-105 active:scale-95;
  }

  .btn-outline {
    @apply border-2 border-white text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-royal-900 hover:shadow-lg hover:scale-105 active:scale-95;
  }

  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24;
  }
}

@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }
}
```

### Step 3.2: Build Hero Component

**Create `src/components/Hero.tsx`:**

```typescript
'use client';

import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp, Phone, Mail, MapPin } from 'lucide-react';
import { formatCurrency, calculatePercentage } from '@/utils/helpers';
import { Fundraiser } from '@/types';

interface HeroProps {
  fundraiser: Fundraiser;
}

export default function Hero({ fundraiser }: HeroProps) {
  const percentage = calculatePercentage(fundraiser.raised, fundraiser.goal);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-verdean-600/20 via-royal-600/20 to-gold-600/20 animate-pulse" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-verdean-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-royal-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Lead By
              <span className="block text-gold-400">Example</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200">
              Breaking the school-to-prison pipeline, one life at a time.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-primary">
                Donate Now
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <StatCard icon={<Users />} value="500+" label="Youth Served" />
              <StatCard icon={<Heart />} value="87%" label="Success Rate" />
              <StatCard icon={<TrendingUp />} value="25+" label="Partners" />
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-8 text-sm">
              <ContactItem icon={<Phone size={16} />} text="(401) 699-6544" />
              <ContactItem icon={<Mail size={16} />} text="contact@leadbyexample.org" />
              <ContactItem icon={<MapPin size={16} />} text="120 Hawkins St, Providence, RI" />
            </div>
          </motion.div>

          {/* Right Column: Fundraiser Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-gold-500 text-royal-900 text-sm font-bold rounded-full mb-4">
                  Current Fundraiser
                </span>
                <h2 className="text-3xl font-bold mb-2">{fundraiser.title}</h2>
                <p className="text-gray-300">{fundraiser.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{formatCurrency(fundraiser.raised)} raised</span>
                  <span className="text-gray-300">of {formatCurrency(fundraiser.goal)}</span>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-verdean-500 to-gold-500"
                  />
                </div>
                <p className="text-right text-sm text-gold-400 font-bold">{percentage}%</p>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-semibold">{fundraiser.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-semibold">{fundraiser.location}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-400">What We Provide:</p>
                <ul className="space-y-1">
                  {fundraiser.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full btn-primary">
                Support This Cause
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper Components
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card p-4 text-center">
      <div className="flex justify-center mb-2 text-gold-400">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-300">
      {icon}
      <span>{text}</span>
    </div>
  );
}
```

### Step 3.3: Update Main Page

**`src/pages/index.tsx`:**

```typescript
import Head from 'next/head';
import Hero from '@/components/Hero';
import { Fundraiser } from '@/types';

// Temporary data - will be moved to CMS later
const currentFundraiser: Fundraiser = {
  id: '1',
  title: 'All Sides of Town Cookout 2025',
  description: 'Join us for our annual community cookout bringing together all sides of Providence.',
  goal: 10000,
  raised: 6250,
  date: 'August 2, 2025',
  location: 'Lincoln Woods Site A&B',
  features: [
    'Free food and refreshments',
    'Free haircuts for youth',
    'Family activities and games',
    'Backpack giveaway for students',
    'Community resources fair',
  ],
  status: 'active',
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Lead By Example | Breaking the School-to-Prison Pipeline</title>
        <meta
          name="description"
          content="Lead By Example works to end the school-to-prison pipeline through community engagement, mentorship, and support programs in Providence, RI."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero fundraiser={currentFundraiser} />
        {/* Additional components will be added here */}
      </main>
    </>
  );
}
```

---

## 🧪 PHASE 4: Testing Your Work

### Step 4.1: Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Step 4.2: VS Code Testing Tasks

**Create `.vscode/tasks.json`:**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "npm",
      "script": "dev",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Build Production",
      "type": "npm",
      "script": "build",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Lint Code",
      "type": "npm",
      "script": "lint",
      "problemMatcher": ["$eslint-stylish"]
    },
    {
      "label": "Type Check",
      "type": "npm",
      "script": "type-check",
      "problemMatcher": ["$tsc"]
    }
  ]
}
```

---

## 📝 PHASE 5: Remaining Components (TODO)

### Components to Build Next

1. **Testimonials.tsx** - Carousel with 4 success stories
2. **Archive.tsx** - Past fundraiser cards
3. **Newsletter.tsx** - Email signup form
4. **Partners.tsx** - Organization partners
5. **Footer.tsx** - Site footer with credits

### Implementation Order

```
Week 1:
✅ Day 1-2: Setup + Hero (COMPLETE)
⏳ Day 3-4: Testimonials + Archive
⏳ Day 5: Newsletter + Partners

Week 2:
⏳ Day 1: Footer + Polish
⏳ Day 2-3: Animations + Refinement
⏳ Day 4: Testing
⏳ Day 5: Deployment
```

---

## 🎨 VS Code Keyboard Shortcuts

### Essential for React Development

- **Ctrl+Shift+P**: Command Palette
- **Ctrl+P**: Quick file open
- **Ctrl+`**: Toggle terminal
- **Alt+Up/Down**: Move line up/down
- **Ctrl+D**: Select next occurrence
- **Ctrl+Shift+K**: Delete line
- **F2**: Rename symbol
- **Ctrl+/**: Toggle comment
- **Ctrl+Shift+L**: Select all occurrences
- **Alt+Click**: Add cursor

### Component-Specific

- Type `rafce` + Tab: React Arrow Function Component Export
- Type `imr` + Tab: Import React
- Type `imp` + Tab: Import module

---

## 🐛 Common Issues & Solutions

### Issue 1: Tailwind Classes Not Working

**Solution:**

1. Check `tailwind.config.js` content paths
2. Restart dev server: Ctrl+C, then `npm run dev`
3. Clear cache: Delete `.next` folder

### Issue 2: TypeScript Errors

**Solution:**

1. Run: `npm run type-check`
2. Check `tsconfig.json` paths
3. Restart TypeScript server: Ctrl+Shift+P → "TypeScript: Restart TS Server"

### Issue 3: Module Not Found

**Solution:**

1. Check import paths use `@/` alias
2. Verify file exists at correct location
3. Run: `npm install` to ensure all dependencies

### Issue 4: Framer Motion Not Animating

**Solution:**

1. Ensure component has `'use client'` directive
2. Check initial/animate props are correct
3. Verify motion component is imported

---

## 📊 Progress Tracking

### Completed ✅

- [x] Project initialization
- [x] Dependencies installed
- [x] VS Code configured
- [x] Tailwind theme customized
- [x] Utility functions created
- [x] Type definitions added
- [x] Custom hooks implemented
- [x] Hero component built
- [x] Main page updated

### In Progress ⏳

- [ ] Testimonials component
- [ ] Archive component
- [ ] Newsletter component
- [ ] Partners component
- [ ] Footer component

### Not Started ⏸️

- [ ] Advanced animations
- [ ] Form validation
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Deployment setup

---

## 🚀 Next Steps

1. **Test Current Work**: Verify Hero component displays correctly
2. **Build Testimonials**: Create carousel component
3. **Implement Archive**: Display past fundraisers
4. **Add Newsletter Form**: With validation
5. **Build Partners Section**: Organization links
6. **Create Footer**: Contact info and credits

---

## 📞 Support

**Questions?** Contact:

- Senior Dev: @StrayDogSyn
- Junior Dev: @miasmith81
- Company: StrayDog Syndications LLC

---

**Made with ❤️ for Lead By Example**
*Empowering communities through technology*
