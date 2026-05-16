# 🤝 Lead By Example — Project Sync Snapshot
**For:** Mausi's Claude (Development Synchronization)  
**From:** Hunter / StrayDogSyn (via Claude)  
**Date:** May 1, 2026  
**Sprint:** Final MVP Sprint — Community Platform Phase

---

## 🎯 Project Identity

| Field | Value |
|---|---|
| **Client** | Lead By Example (Robert McKinney Sr.) |
| **Org Type** | Nonprofit — Providence, Rhode Island |
| **Mission** | Break the school-to-prison pipeline via lived-experience mentorship |
| **Dev Studio** | StrayDog Syndications LLC |
| **Repo** | `github.com/StrayDogSyn/Lead-By-Example` |
| **Deploy Target** | Vercel (SSR required for payment processing) |
| **Senior Dev** | @StrayDogSyn (Hunter) |
| **Junior Dev** | @miasmith81 (Mausi) |

---

## 🎨 Design System — NON-NEGOTIABLE

These values must be consistent across ALL components. No substitutions.

```css
/* Brand Colors */
--verdean:   #01514C;   /* Cape Verdean deep green-blue — cultural anchor */
--purple:    #4B306A;   /* Royal purple — primary bg/card color */
--purple-deep: #421B5A; /* Darker purple — depth/overlay */
--gold:      #FFD700;   /* Brilliant gold — CTAs, highlights */
--gold-rich: #E5C100;   /* Deeper gold — hover states */
--white-soft: #F6F6F6;  /* Off-white — text on dark bg */
--black:     #000000;

/* Glassmorphism Pattern */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
```

**Aesthetic:** Glassmorphic + 3D depth effects + Framer Motion scroll animations  
**Typography:** Custom font via `var(--font-heading)` and `var(--font-inter)`  
**Theme:** Dark base (purple/black), gold accents, verdean highlights

---

## 🏗️ Tech Stack

```
Framework:     Next.js 14 (App Router capable, currently Pages Router)
Language:      TypeScript (strict mode ON)
Styling:       Tailwind CSS 3.4 (custom config — see below)
Animations:    Framer Motion 11.5
Forms:         React Hook Form 7.53 + Zod 3.23 + @hookform/resolvers
State:         Zustand 4.5 (available, use for shared state)
Icons:         Lucide React 0.439
Utils:         clsx + tailwind-merge (use cn() helper pattern)
Payments:      Stripe (integrated — see payment notes)
Node req:      >=18.0.0
```

### Tailwind Custom Config (tailwind.config.js)
- Custom colors: `verdean`, `purple-deep`, `gold` variants
- Custom animations: `fade-in`, `slide-in`, `scale-in`, `bounce-slow`
- Custom spacing: `128`, `144`
- Custom radius: `4xl` (2rem)
- Plugins: `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio`

---

## ✅ BUILT — What Exists Right Now

### Core Components (`src/components/`)

| Component | File | Status | Notes |
|---|---|---|---|
| Hero | `Hero.tsx` | ✅ Complete | Fundraiser card, progress bar, dual CTAs, stats |
| Testimonials | `Testimonials.tsx` | ✅ Complete | 3D carousel, 4 stories, nav dots |
| Archive | `Archive.tsx` | ✅ Complete | 3 past fundraisers, achievement badges |
| Newsletter | `Newsletter.tsx` | ✅ Complete | Email + name + interests, Zod validation |
| Partners | `Partners.tsx` | ✅ Complete | Open Doors RI + Reentry Campus Program |
| Footer | `Footer.tsx` | ✅ Complete | Full contact, social links, developer credit |

### Pages (`src/pages/`)
- `index.tsx` — Main landing page, wires all components
- `_app.tsx` — App wrapper
- `_document.tsx` — HTML document structure

### Utilities
- `src/hooks/useInView.ts` — Scroll detection for animations
- `src/utils/helpers.ts` — Currency formatting, progress calc, cn() helper

### Current Fundraiser Data (in `index.tsx`)
```typescript
event: "All Sides of Town Cookout 2025"
goal: 10000
raised: 6250  // 62.5% — UPDATE AS DONATIONS COME IN
date: "August 2, 2025"
location: "Lincoln Woods Site A&B"
hours: "12:30pm–8:00pm"
```

### Stats shown on Hero
- 500+ Youth Served
- 87% Success Rate  
- 25+ Community Partners

---

## 🔐 Stripe Integration (EXISTS — needs env vars)

Payment processing is implemented. Backend routes handle:
- Secure donation processing
- Webhook signature verification  
- Automatic receipt emails
- Anonymous donation support
- Real-time progress tracking toward $10K goal

**Required `.env.local` vars (Stripe):**
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

> ⚠️ This is why we use **Vercel**, not GitHub Pages. SSR required.

---

## 🚧 LAST SPRINT — What Needs to Be Built

These are the remaining MVP features. Build in this order:

### 1. 🗺️ EvolutionJourney Component (HIGH PRIORITY)
**Location:** `src/components/EvolutionJourney.tsx`  
**Purpose:** Visual map of the 5-stage transformation journey  
**Stages:**
1. At-Risk Youth → 2. Connected → 3. Mentored → 4. Empowered → 5. Community Leader

**Design requirements:**
- Timeline/path visualization using brand colors
- Symbolic elements: breaking chains, open doors, rising sun, guiding hands, growing plants, restorative justice circles
- Scroll-triggered Framer Motion animations
- Mobile responsive (vertical on mobile, horizontal on desktop)

---

### 2. 🧑‍🤝‍🧑 MentorMatching Component (HIGH PRIORITY)
**Location:** `src/components/MentorMatching.tsx`  
**Purpose:** Profiles of mentors with lived experience  

**Mentor profile shape (TypeScript):**
```typescript
interface MentorProfile {
  id: string;
  name: string;
  role: string;
  experience: string;       // "15 years community work"
  specialties: string[];    // ["Reentry", "Youth Advocacy"]
  lived_experience: string; // Brief bio — trauma-informed language
  availability: 'open' | 'limited' | 'full';
  imageInitials: string;    // Fallback for no photo
}
```

**Design:** Glassmorphic cards, gold badge for availability, verdean accent for specialties

---

### 3. 📚 ResourceLibrary Component (MEDIUM PRIORITY)
**Location:** `src/components/ResourceLibrary.tsx`  
**Purpose:** Trauma-informed educational materials  

**Resource categories:**
- Mentorship Guides
- Youth Support Resources
- Reentry Resources
- Community Programs

**Design:** Filterable card grid, category color-coding with brand palette, download/link CTAs

---

### 4. 📅 CommunityCalendar Component (MEDIUM PRIORITY)
**Location:** `src/components/CommunityCalendar.tsx`  
**Purpose:** Events, meetings, activities  

**Event shape:**
```typescript
interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'fundraiser' | 'mentorship' | 'community' | 'workshop';
  description: string;
  registrationUrl?: string;
}
```

---

## 📁 File Structure Reference

```
src/
├── components/
│   ├── Hero.tsx           ✅
│   ├── Testimonials.tsx   ✅
│   ├── Archive.tsx        ✅
│   ├── Newsletter.tsx     ✅
│   ├── Partners.tsx       ✅
│   ├── Footer.tsx         ✅
│   ├── EvolutionJourney.tsx  🚧 BUILD NEXT
│   ├── MentorMatching.tsx    🚧 BUILD NEXT
│   ├── ResourceLibrary.tsx   🚧 BUILD
│   └── CommunityCalendar.tsx 🚧 BUILD
├── pages/
│   ├── index.tsx          ✅ (wire new components here)
│   ├── _app.tsx           ✅
│   └── _document.tsx      ✅
├── styles/
│   └── globals.css        ✅
├── hooks/
│   └── useInView.ts       ✅
├── utils/
│   └── helpers.ts         ✅
└── types/
    └── (add TypeScript interfaces here)
```

---

## ⚠️ Critical Design Principles (MUST FOLLOW)

1. **Trauma-informed design** — All copy and UI patterns must avoid triggering language. Use empowerment framing.
2. **Accessibility** — WCAG 2.1 AA required. All interactive elements ≥44px touch target. Proper ARIA labels.
3. **Mobile-first** — Most community members access via phone.
4. **Cultural authenticity** — The verdean/purple/gold palette represents Cape Verdean roots. Don't dilute it.
5. **No `any` TypeScript** — Strict mode is on. Define proper interfaces.
6. **Use `cn()` helper** — Always merge Tailwind classes with `clsx` + `tailwind-merge`.

---

## 🔧 Git Workflow

```bash
# Feature branches
git checkout -b feature/evolution-journey
git checkout -b feature/mentor-matching

# Commit format
feat(evolution): add 5-stage journey visualization
fix(mentor): resolve card layout on mobile
```

Active branches to be aware of:
- `main` — production
- `navbar` — navbar feature (parallel development, don't conflict)

---

## 🎯 Performance Targets

All components must contribute to hitting:
- Lighthouse Performance: **90+**
- Lighthouse Accessibility: **95+**
- Lighthouse SEO: **100**
- First Contentful Paint: **< 1.5s**

Use `useInView` hook for scroll animations — don't animate things off-screen.  
Lazy load heavy components with Next.js `dynamic()`.

---

## 📞 Client Contact

**Robert McKinney Sr.** — Founder/Outreach Director  
📍 120 Hawkins Street, Providence, RI 02908  
📞 (401) 699-6544  
📧 contact@leadbyexample.org

**Partner orgs:**
- Open Doors RI → `www.opendoorsri.org`
- Reentry Campus Program → `www.reentrycampusprogram.org`

---

## 🚀 To Get Running Locally

```bash
git clone https://github.com/StrayDogSyn/Lead-By-Example.git
cd Lead-By-Example
npm install
cp .env.example .env.local
# Add Stripe keys to .env.local
npm run dev
# → http://localhost:3000
```

---

*Snapshot generated: May 1, 2026 — StrayDog Syndications LLC*  
*"Breaking barriers through code. Building futures through technology."*
