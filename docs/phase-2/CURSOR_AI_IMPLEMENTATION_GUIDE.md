# 🤖 CURSOR AI - Lead By Example Implementation Guide

**For:** Cursor IDE with AI Assistance
**Project:** Lead By Example Call-to-Action Website
**AI Model:** GPT-4 / Claude-3.5-Sonnet

---

## 🎯 Overview for AI Assistant

You are helping build a premium nonprofit website for "Lead By Example," a Providence, RI organization working to end the school-to-prison pipeline. This is a Next.js 14 + TypeScript + Tailwind CSS project with glassmorphic design and Framer Motion animations.

### Project Context

- **Client**: Robert McKinney Sr., Lead By Example
- **Purpose**: Call-to-action website for fundraising
- **Current Fundraiser**: All Sides of Town Cookout 2025 ($10K goal, $6.25K raised)
- **Design**: Cape Verdean-inspired colors, glassmorphism, 3D effects

---

## 🚀 Quick Start with Cursor

### Step 1: Initialize Project

**Cursor Command (Cmd/Ctrl+K):**

```
Initialize a Next.js 14 project with TypeScript, Tailwind CSS, and the following dependencies:
- framer-motion for animations
- react-hook-form and zod for forms
- lucide-react for icons
- clsx and tailwind-merge for utilities

Use src/ directory and Pages Router (not App Router).
Set up path aliases with @/* pointing to src/*.
```

### Step 2: Configure Cursor for This Project

**In Cursor Settings (Cmd/Ctrl+,):**

1. Enable "Cursor Tab" for AI completions
2. Set model to GPT-4 or Claude-3.5-Sonnet
3. Enable "Predict Next Edit"
4. Set auto-save on

**Create `.cursorrules` file:**

```
# Project-Specific AI Instructions for Lead By Example

## Context
- Building a nonprofit fundraising website
- Tech stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- Design: Glassmorphism with Cape Verdean colors
- Target: Mobile-first, accessible (WCAG 2.1 AA)

## Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use Tailwind utility classes over custom CSS
- Follow React best practices
- Add JSDoc comments for complex functions

## Component Structure
- Each component in separate file
- Use named exports for components
- Include proper TypeScript interfaces
- Implement error boundaries where needed

## Colors
- Primary: #01514C (Cape Verdean blue-green)
- Secondary: #4B306A (Royal purple)
- Accent: #FFD700 (Gold)
- Use semantic names (verdean, royal, gold)

## Animation Guidelines
- Use Framer Motion for complex animations
- Implement scroll-triggered animations
- Add hover states to interactive elements
- Keep animations performant (60fps target)

## Accessibility
- Include ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Add alt text to images
- Use semantic HTML
```

---

## 💬 AI Prompts for Each Component

### Prompt 1: Hero Component

**Cursor Chat (Cmd/Ctrl+L):**

```
Create a Hero component for a nonprofit website with these requirements:

1. Layout:
   - Two-column layout (text left, fundraiser card right)
   - Mobile: single column stacked
   - Full viewport height

2. Left Column Content:
   - Large heading: "Lead By Example"
   - Tagline: "Breaking the school-to-prison pipeline, one life at a time"
   - Two CTA buttons: "Donate Now" (primary) and "Learn More" (outline)
   - Stats grid: "500+ Youth Served", "87% Success Rate", "25+ Partners"
   - Contact info with icons: phone, email, address

3. Right Column - Fundraiser Card:
   - Glassmorphic design (bg-white/10, backdrop-blur)
   - Current fundraiser badge
   - Title: "All Sides of Town Cookout 2025"
   - Progress bar showing $6,250 raised of $10,000 goal
   - Event date: "August 2, 2025"
   - Location: "Lincoln Woods Site A&B"
   - Features list: free food, haircuts, activities, backpack giveaway
   - "Support This Cause" button

4. Styling:
   - Use glassmorphism (backdrop-blur-md, bg-white/10)
   - Animated background with floating gradients
   - Gold (#FFD700) for CTAs
   - Progress bar animates on load
   - All elements fade/slide in with Framer Motion

5. Technical:
   - TypeScript with proper interfaces
   - Accept fundraiser prop
   - Use lucide-react icons
   - Responsive breakpoints: mobile <768px, tablet 768-1024px, desktop >1024px

Use our custom utility functions:
- formatCurrency() from @/utils/helpers
- calculatePercentage() from @/utils/helpers
- cn() from @/utils/cn

Reference our design system:
- Colors: verdean-500, royal-500, gold-500
- Animations: fade-in, slide-in, float
- Utilities: glass-card, btn-primary, btn-outline
```

### Prompt 2: Testimonials Carousel

**Cursor Chat:**

```
Create a Testimonials carousel component with:

1. Data:
   - 4 testimonials from youth in the program
   - Each has: id, name, role, content
   - Sample data:
     * Marcus, 2024 Graduate: "Changed my life trajectory..."
     * Sarah, Program Volunteer: "Witnessing transformation..."
     * David, Community Partner: "Real change happens..."
     * Lisa, Parent: "Gave my son hope..."

2. Layout:
   - 3D card carousel with current card prominent
   - Previous/next cards visible at 50% opacity
   - Navigation arrows on sides
   - Dot indicators below
   - Optional auto-advance every 5 seconds

3. Card Design:
   - Glassmorphic background
   - Quote icon in gradient circle at top
   - Large quote text
   - Author name and role below
   - Subtle shadow for depth
   - Hover: lift effect (-translateY-1)

4. Animations:
   - Cards slide/rotate when changing
   - Smooth transitions (duration: 500ms)
   - Scale effect on current card
   - Fade in on scroll

5. Impact Stats Below:
   - Three stat cards in a row
   - "87% Graduation Rate"
   - "92% Post-Program Success"
   - "95% Community Satisfaction"
   - Glassmorphic design
   - Animated counter (count-up on view)

Technical requirements:
- TypeScript interfaces
- Keyboard navigation (arrow keys)
- Touch/swipe support on mobile
- Accessible (ARIA labels)
- useInView hook for scroll animations
```

### Prompt 3: Archive Section

**Cursor Chat:**

```
Create an Archive section displaying past fundraisers:

1. Data (3 completed fundraisers):
   - Summer Youth Program 2024: $15K raised, 150 youth
   - Back to School Drive 2024: $12K raised, 200 backpacks
   - Holiday Community Dinner 2024: $8K raised, 300 families

2. Layout:
   - Grid: 3 columns desktop, 2 tablet, 1 mobile
   - Each card is equal height
   - Cards have hover effect
   - Section title: "Our Impact"
   - Subtitle: "Past Fundraising Milestones"

3. Card Design:
   - Glassmorphic background
   - Trophy icon (lucide-react) at top with gold gradient
   - Badge: "Goal Exceeded" or "Completed"
   - Fundraiser title
   - Short description
   - Progress bar (filled to 100% or actual)
   - Impact metrics (e.g., "150 youth served")
   - Date completed

4. Combined Impact Panel:
   - Below cards
   - Large glassmorphic box
   - Show totals: "$35K Total Raised", "650 Lives Impacted"
   - Success rate: "100% Goal Achievement"

5. Animations:
   - Stagger effect (cards appear one by one)
   - Trophy icons rotate on hover
   - Progress bars fill from 0 to final value
   - Scale up on hover

Technical:
- TypeScript interfaces for Fundraiser type
- Responsive grid
- Framer Motion stagger animations
- useInView hook for scroll trigger
```

### Prompt 4: Newsletter Form

**Cursor Chat:**

```
Create a Newsletter signup form component:

1. Form Fields:
   - First Name (required, text input)
   - Email (required, validated email)
   - Interests (multi-select checkboxes):
     * Event Updates
     * Success Stories
     * Volunteer Opportunities
     * Donation Drives

2. Validation:
   - Use React Hook Form
   - Zod schema for validation
   - Required field errors
   - Email format validation
   - At least one interest required

3. Design:
   - Glassmorphic container
   - Section title: "Stay Connected"
   - Subtitle: "Join our community of change-makers"
   - Labels with icons (lucide-react)
   - Error messages in red below fields
   - Success message in green
   - Loading state during submission

4. States:
   - Idle: Show form
   - Loading: Disable form, show spinner
   - Success: Show checkmark and message
   - Error: Show error message, allow retry

5. Styling:
   - Inputs have glass effect
   - Focus: gold ring
   - Checkboxes: custom styled
   - Submit button: gold with hover effect
   - Smooth transitions between states

Technical:
- TypeScript interfaces
- React Hook Form + Zod
- Proper ARIA labels
- Keyboard accessible
- Email validation regex
- Mock submission (console.log for now)
```

### Prompt 5: Partners Section

**Cursor Chat:**

```
Create a Partners section featuring partner organizations:

1. Partners (2):
   - Open Doors RI: Housing & employment for formerly incarcerated
   - Reentry Campus Program: Education & community reintegration

2. Layout:
   - Section title: "Our Partners"
   - Subtitle: "Working Together for Change"
   - Two cards side by side (stack on mobile)
   - "Want to Partner?" CTA card below

3. Partner Card Design:
   - Glassmorphic background
   - Organization icon/logo placeholder
   - Name in large text
   - Description
   - "Visit Website" link with arrow icon
   - Hover: lift and glow effect
   - External link opens in new tab

4. Partnership CTA:
   - Large glassmorphic container
   - "Want to Partner With Us?" heading
   - Brief text about partnership opportunities
   - Email button: "Get in Touch"
   - Phone icon with number

5. Animations:
   - Fade in from bottom
   - Hover: scale and shadow increase
   - Arrow rotates 45° on hover
   - Stagger effect on load

Technical:
- TypeScript Partner interface
- External link handling
- Lucide-react icons
- Responsive grid
- Hover animations with Framer Motion
```

### Prompt 6: Footer

**Cursor Chat:**

```
Create a comprehensive Footer component:

1. Layout (4 columns on desktop, stack on mobile):
   
   Column 1 - About:
   - "Lead By Example" heading
   - Mission statement (2-3 sentences)
   - Logo or icon

   Column 2 - Quick Links:
   - About Us
   - Our Programs
   - Get Involved
   - Contact Us
   - Privacy Policy

   Column 3 - Contact:
   - Address: 120 Hawkins St, Providence, RI 02908
   - Phone: (401) 699-6544
   - Email: contact@leadbyexample.org
   - Each with icon

   Column 4 - Connect:
   - "Follow Us" heading
   - Social media icons (Facebook, Instagram, Twitter)
   - Newsletter signup CTA

2. Bottom Bar:
   - Copyright: "© 2025 Lead By Example. All rights reserved."
   - Developer credit: "Built with ❤️ by StrayDog Syndications LLC"
   - Link to www.straydog-syndications-llc.com
   - Legal links: Privacy | Terms | Cookies

3. Styling:
   - Dark background (royal-900)
   - Border-top with subtle gradient
   - Links with hover effect (gold color)
   - Icons in circles with hover animation
   - Developer credit in smaller, subtle text

4. Accessibility:
   - Semantic HTML5 footer element
   - Proper heading hierarchy
   - All links keyboard accessible
   - ARIA labels for icon links

Technical:
- TypeScript
- Lucide-react for all icons
- Responsive grid (CSS Grid)
- Link component for internal navigation
- External links open in new tab with rel="noopener noreferrer"
```

---

## 🎨 AI-Assisted Design Refinements

### Prompt: Glassmorphism Enhancement

```
Review all components and enhance glassmorphism effects:

1. Consistent glass properties:
   - background: rgba(255, 255, 255, 0.1)
   - backdrop-filter: blur(20px)
   - border: 1px solid rgba(255, 255, 255, 0.2)
   - box-shadow for depth

2. Layering:
   - Cards should have z-index hierarchy
   - Overlapping elements create depth
   - Background gradients animated subtly

3. Hover states:
   - Increase background opacity to 0.15
   - Lift with transform: translateY(-4px)
   - Expand shadow

4. Dark mode consideration:
   - Adjust opacity for readability
   - Ensure text contrast meets WCAG standards

Apply these consistently across all glass-card elements.
```

### Prompt: Animation Polish

```
Review and improve all animations:

1. Entry animations:
   - Components fade in from bottom on scroll
   - Stagger child elements by 100ms
   - Use ease-out timing function

2. Hover animations:
   - Scale: 1.02 (subtle)
   - Duration: 200-300ms
   - Add shadow expansion

3. Loading states:
   - Skeleton screens for async content
   - Shimmer effect on placeholders
   - Smooth transition to content

4. Performance:
   - Use transform and opacity only
   - Avoid animating layout properties
   - Add will-change for complex animations
   - Reduce motion for accessibility

Test on low-end devices and ensure 60fps.
```

### Prompt: Mobile Optimization

```
Optimize the entire site for mobile:

1. Touch targets:
   - Minimum 44x44px for all buttons
   - Increase spacing between interactive elements

2. Typography:
   - Responsive font scaling
   - Improve readability on small screens
   - Adjust line-height for mobile

3. Navigation:
   - Mobile-friendly menu (hamburger)
   - Easy thumb reach zones
   - Swipe gestures where appropriate

4. Forms:
   - Large input fields
   - Proper keyboard types (email, tel)
   - Error messages don't shift layout

5. Performance:
   - Optimize images for mobile
   - Reduce initial bundle size
   - Lazy load below-fold content

Test on actual devices: iPhone SE, iPhone 14, Android (various).
```

---

## 🔍 AI-Powered Code Review

### Prompt: Type Safety Review

```
Review all TypeScript code and:

1. Ensure all functions have explicit return types
2. No usage of 'any' type
3. All props interfaces properly defined
4. Enum types for status values
5. Proper null/undefined handling
6. Generic types where appropriate

Generate a report of type issues found and fix suggestions.
```

### Prompt: Accessibility Audit

```
Audit the site for accessibility (WCAG 2.1 AA):

1. Color contrast:
   - All text meets 4.5:1 ratio
   - Interactive elements meet 3:1 ratio
   - Check against glassmorphic backgrounds

2. Keyboard navigation:
   - All interactive elements focusable
   - Focus indicators visible
   - Logical tab order
   - No keyboard traps

3. Screen readers:
   - Semantic HTML
   - ARIA labels on icons
   - Alt text on images
   - Form labels associated

4. Motion:
   - Respect prefers-reduced-motion
   - Provide alternatives to animations

Generate accessibility report with issues and fixes.
```

### Prompt: Performance Optimization

```
Analyze and optimize performance:

1. Bundle size:
   - Identify large dependencies
   - Suggest code splitting opportunities
   - Remove unused imports

2. Images:
   - Suggest Next.js Image component usage
   - Add lazy loading
   - Optimize formats (WebP, AVIF)

3. Render performance:
   - Identify unnecessary re-renders
   - Suggest memoization (React.memo, useMemo, useCallback)
   - Optimize animation performance

4. Lighthouse audit:
   - Run audit
   - Provide improvement suggestions
   - Target 90+ in all categories

Generate performance report with actionable items.
```

---

## 🧪 Testing with AI

### Prompt: Generate Tests

```
Generate comprehensive tests for all components:

1. Unit tests (Jest + React Testing Library):
   - Component rendering
   - Prop variations
   - User interactions
   - Edge cases

2. Integration tests:
   - Form submission
   - Navigation flow
   - State management

3. Accessibility tests:
   - ARIA attributes
   - Keyboard navigation
   - Screen reader compatibility

Create test files following this structure:
- ComponentName.test.tsx
- Test coverage > 80%
- Meaningful test descriptions
```

### Prompt: Bug Hunt

```
Review the entire codebase and identify:

1. Potential bugs:
   - Race conditions
   - Memory leaks
   - Incorrect state updates
   - Type coercion issues

2. Edge cases:
   - Empty states
   - Error handling
   - Network failures
   - Invalid user input

3. Browser compatibility:
   - Modern browser features
   - Fallbacks needed
   - Polyfills required

Generate a bug report with severity levels and fix suggestions.
```

---

## 📊 Progress Dashboard Prompts

### Prompt: Generate Progress Report

```
Create a comprehensive progress report:

1. Component completion status:
   - List all required components
   - Mark complete/in-progress/not-started
   - Include completion percentage

2. Technical debt:
   - TODOs in code
   - Hard-coded values to move to config
   - Optimization opportunities

3. Timeline analysis:
   - Estimated hours remaining
   - Blocked tasks
   - Dependencies

4. Quality metrics:
   - TypeScript coverage
   - Test coverage
   - Accessibility score
   - Performance score

Format as a markdown table with visual indicators (✅, ⏳, ❌).
```

---

## 🎯 Deployment Preparation

### Prompt: Pre-Deployment Checklist

```
Prepare for deployment to Vercel:

1. Environment variables:
   - Create .env.example
   - List all required variables
   - Add descriptions

2. Build optimization:
   - Check build errors
   - Optimize bundle size
   - Configure next.config.js

3. SEO:
   - Meta tags on all pages
   - Open Graph tags
   - Sitemap generation
   - robots.txt

4. Security:
   - No exposed secrets
   - Proper CORS configuration
   - Security headers

Generate deployment checklist and Vercel configuration.
```

---

## 💡 Pro Tips for Cursor AI

### 1. Context Management

- Use `@workspace` to reference entire project
- Use `@folder` for specific directories
- Use `@file` to reference specific files

### 2. Iterative Refinement

- Start with basic prompt
- Review AI output
- Use "Modify" to refine
- Accept changes incrementally

### 3. Code Generation Best Practices

- Be specific about requirements
- Include design specifications
- Reference existing patterns
- Request TypeScript interfaces

### 4. Debugging with AI

- Share error messages in chat
- Ask for step-by-step debugging
- Request explanation of issues
- Get alternative solutions

---

## 🚨 Common AI Pitfalls to Avoid

1. **Over-reliance**: Always review generated code
2. **Context loss**: Remind AI of project context regularly
3. **Outdated patterns**: Verify AI uses current Next.js 14 patterns
4. **Missing accessibility**: Explicitly request WCAG compliance
5. **No type safety**: Always request TypeScript with strict mode

---

## 📚 Additional AI Prompts

### Code Documentation

```
Add comprehensive JSDoc comments to all functions:
- Parameter descriptions
- Return type explanations
- Usage examples
- Side effects warnings
```

### Refactoring

```
Refactor this component for better:
- Reusability
- Performance
- Readability
- Type safety

Explain each change and why it's better.
```

### Learning Resource

```
Explain [concept] in the context of this project:
- Basic explanation
- How it's used in our code
- Best practices
- Common pitfalls
- Further reading suggestions
```

---

## ✅ Implementation Checklist

Track your progress:

### Setup ☐

- [ ] Initialize Next.js project
- [ ] Install dependencies
- [ ] Configure Cursor AI
- [ ] Set up .cursorrules
- [ ] Create project structure

### Components ☐

- [ ] Hero component
- [ ] Testimonials carousel
- [ ] Archive section
- [ ] Newsletter form
- [ ] Partners section
- [ ] Footer component

### Polish ☐

- [ ] Glassmorphism refinement
- [ ] Animation improvements
- [ ] Mobile optimization
- [ ] Accessibility audit
- [ ] Performance optimization

### Testing ☐

- [ ] Unit tests
- [ ] Integration tests
- [ ] Accessibility tests
- [ ] Browser testing
- [ ] Mobile device testing

### Deployment ☐

- [ ] Environment setup
- [ ] Build optimization
- [ ] SEO configuration
- [ ] Vercel deployment
- [ ] Domain configuration

---

**Made with AI assistance for Lead By Example** 🤖❤️
*Cursor AI + Human Expertise = Amazing Results*
