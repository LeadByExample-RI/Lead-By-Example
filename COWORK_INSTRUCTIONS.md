# 🐾 CLAUDE COWORK — LEAD BY EXAMPLE PROJECT INSTRUCTIONS
## StrayDog Syndications LLC × Lead By Example

> **Read this file completely before taking any action on this project.**
> This document is your source of truth for all decisions, boundaries, and priorities.
> Last updated: May 2026

---

## 🚨 ACTIVE SPRINT — TWO REMAINING PRIORITIES, IN ORDER

> ✅ **Repository Migration — COMPLETE**
> ✅ **Phases 1, 2, 3, and 5 of migration sprint — COMPLETE**
> 🔄 **Phase 4 (Mia invite to new org repo) — IN PROGRESS**

**Do these in sequence. Do not skip ahead.**

### PRIORITY 1 — Cloudflare Domain: www.leadbyexample-ri.org
The production domain is `www.leadbyexample-ri.org` (Cloudflare-managed).
Current staging URL: `https://trae90rrfzfc.vercel.app/` (live and working)

**DNS Migration Steps:**
```
Step 1: In Vercel Dashboard → Project Settings → Domains
        Add: leadbyexample-ri.org
        Add: www.leadbyexample-ri.org

Step 2: In Cloudflare DNS for leadbyexample-ri.org, add:
        Type: A     | Name: @   | Value: 76.76.21.21         | Proxy: OFF (DNS only)
        Type: CNAME | Name: www | Value: cname.vercel-dns.com | Proxy: OFF (DNS only)

        ⚠️ Cloudflare proxy (orange cloud) MUST be disabled for Vercel SSL to provision.
           Once Vercel SSL is confirmed active, you MAY re-enable Cloudflare proxy.

Step 3: Update environment variable in Vercel Dashboard:
        NEXT_PUBLIC_APP_URL=https://www.leadbyexample-ri.org

Step 4: og:url and twitter:url meta tags — ✅ DONE (fix(meta) commit)
        Updated in: index.tsx, mentors.tsx, resources.tsx, events.tsx.bak

Step 5: Verify SSL cert auto-provisioned (usually < 10 min after DNS propagates).
        Test: https://www.leadbyexample-ri.org should load with padlock.
```

### PRIORITY 2 — Stripe Donation System (ASAP)
The "Help Make It Happen" CTA buttons are live across the site but not yet wired to Stripe. This is the highest-business-impact deliverable. Get test mode working first, then flip to live keys before go-live.

See the full Stripe architecture section below.

---

## 🎯 WHO YOU ARE WORKING FOR

**Studio:** StrayDog Syndications LLC (the developer)
**Client:** Lead By Example — a Providence, RI nonprofit

**Client Contacts:**
- **Robert McKinney Sr.** — Founder & Outreach Director / Lead Mentor
  - 📍 120 Hawkins Street, Providence, RI 02908
  - 📞 (401) 699-6544
  - 📧 robertleadbyexample@gmail.com
- **Ronald Hopkins** — Co-Founder / Community Mentor
  - 📧 ronaldleadbyexample@gmail.com

**Mission:** Break the school-to-prison pipeline through mentorship and community engagement in Providence, RI.

---

## 🌐 LIVE SITE STATE

| Environment | URL | Status |
|-------------|-----|--------|
| Staging (Vercel) | https://trae90rrfzfc.vercel.app/ | ✅ Live |
| Production (target) | https://www.leadbyexample-ri.org | ⏳ DNS pending |
| Old domain reference | https://leadbyexample.org | ❌ Not in use |

**What is already live and working on the staging URL:**
- Hero section with 5th Anniversary 2026 fundraiser data
- Mission statement
- Journey of Transformation (5-stage pipeline intervention flow)
- Mentor profiles: Robert McKinney Sr. + Ronald Hopkins
- Resource Library (trauma-informed, categorized by type and age group)
- Community photo gallery (cookouts, bowling events, government testimony, DC museum trip)
- Impact Archive (past events: Youth Empowerment Summit 2024, Winter Clothing Drive 2023, Institution of Non-Violence)
- Partner Organizations (Open Doors RI, Reentry Campus Program)
- Social links: Facebook, Twitter, Instagram, LinkedIn
- Footer with StrayDog Syndications LLC credit ✅
- Contact emails wired to mailto: links
- **"Help Make It Happen" CTAs — present throughout, NOT YET WIRED TO STRIPE**

---

## 👥 TEAM STRUCTURE — CRITICAL

There are two active developers. **You must understand their boundaries before touching any file.**

### Hunter (@StrayDogSyn) — Senior Developer
- **Your primary operator.** All instructions come from him.
- Responsible for: architecture, backend, API routes, Stripe integration, infrastructure, deployment pipeline, Git management, repo migration.
- IDE stack: VS Code + Claude Code, Cursor, Windsurf, Qoder, TRAE.

### Mausi (@miasmith81) — Frontend / Cosmetic Developer
- Handles all **frontend and cosmetic changes** — visual styling, animations, UI polish, component aesthetics.
- **⚠️ CRITICAL RULE: Never modify, overwrite, or conflict with Mausi's frontend work.**
- If a task touches visual styling, component layout, animation, or CSS/Tailwind classes — flag to Hunter before proceeding.
- When in doubt whether something is "frontend/cosmetic," treat it as Mausi's territory.
- 🔄 **Phase 4 status:** Mia invite to new org repo (`LeadByExample-RI`) is in progress.

---

## 📦 PROJECT OVERVIEW

**Repository:** `github.com/LeadByExample-RI/Lead-By-Example` ✅ *(migrated to private org repo)*
**Deployment Target:** Vercel → `www.leadbyexample-ri.org` *(reconnected to new org repo)* ✅
**DNS/CDN:** Cloudflare managing `leadbyexample-ri.org`

---

## 🛠️ TECHNICAL STACK

```
Framework:        Next.js 14 (Pages Router, TypeScript)
Language:         TypeScript — strict mode, no `any` types
Styling:          Tailwind CSS 3.x + custom theme extensions
Animations:       Framer Motion 11.x
Forms:            React Hook Form 7.x + Zod 3.x validation
State:            Zustand 4.x
Icons:            Lucide React
Deployment:       Vercel (iad1 region — closest to Providence RI)
Payments:         Stripe (Elements, Payment Intents, Webhooks) ← IN PROGRESS
Maps:             Google Maps API ← Identified requirement, not yet implemented
DNS/CDN:          Cloudflare
Node requirement: >=18.0.0
npm requirement:  >=9.0.0
```

**Key config files (root-level, do not relocate):**
- `next.config.js` — Next.js configuration
- `tailwind.config.js` — Design system tokens
- `tsconfig.json` — TypeScript strict config, paths aliased to `@/*`
- `vercel.json` — Deployment + security headers
- `postcss.config.js` — CSS pipeline
- `.eslintrc.json` — Linting rules
- `.prettierrc` — Code formatting (singleQuote, 100 printWidth, LF)
- `.env.local` — Local secrets — never commit this file

---

## 🎨 DESIGN SYSTEM — NON-NEGOTIABLE

These design decisions are locked. Do not deviate without explicit approval from Hunter.

### Color Palette (Cape Verdean Inspired)
```css
--verdean-blue:  #01514C  /* Deep green-blue — primary accent */
--royal-purple:  #4B306A  /* Rich purple — backgrounds, cards */
--deep-purple:   #421B5A  /* Darker purple — depth layers */
--gold:          #FFD700  /* Brilliant gold — CTAs, highlights */
--gold-rich:     #E5C100  /* Deeper gold — hover states */
--soft-white:    #F6F6F6  /* Balance, readability */
--pure-black:    #000000  /* Dark base */
```

### Aesthetic: Glassmorphism
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
```

### Animation: Framer Motion
All section/component transitions use Framer Motion. Never raw CSS for component-level animations.

### Footer Credit (Required — already implemented)
```
Built with ❤️ by StrayDog Syndications LLC for our community
```

---

## 💳 STRIPE INTEGRATION — FULL ARCHITECTURE

**Priority 2. Most business-critical deliverable.**

### Why This Requires Vercel (Not Static Hosting)
Stripe Payment Intents and Webhooks require server-side Node.js API routes. Secret keys must never be bundled into client-side JavaScript. Vercel's serverless functions handle this correctly.

### Required Environment Variables
```bash
# .env.local (development) AND Vercel Dashboard (production)
STRIPE_SECRET_KEY=sk_test_...                    # Server-only — NEVER add NEXT_PUBLIC_ prefix
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...   # Client-safe
STRIPE_WEBHOOK_SECRET=whsec_...                  # Webhook signature verification
```

**Security rule:** If you ever see `NEXT_PUBLIC_STRIPE_SECRET_KEY`, that is a critical security error. Stop and fix it immediately.

### Install Stripe Packages
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

### File Structure
```
src/pages/api/stripe/
├── create-payment-intent.ts   ← Hunter creates this
└── webhook.ts                  ← Hunter creates this

src/components/
├── DonationModal.tsx           ← Hunter logic, Mausi styles
└── DonationForm.tsx            ← Hunter Stripe logic, Mausi styles
```

### create-payment-intent.ts
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, donorEmail, donorName } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Invalid amount — minimum $1.00' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,          // In cents (e.g., 5000 = $50.00)
      currency: 'usd',
      receipt_email: donorEmail,
      metadata: {
        organization: 'Lead By Example',
        event: 'All Sides of Town Cookout 2026',
        donorName: donorName || 'Anonymous',
      },
      description: 'Donation — Lead By Example, All Sides of Town Cookout 2026',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
}
```

### webhook.ts
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// REQUIRED: Disable body parsing so Stripe can verify signature against raw body
export const config = { api: { bodyParser: false } };

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.warn('Donation received:', `$${pi.amount / 100} USD from ${pi.metadata.donorName}`);
      // TODO: Update donation progress tracker, send thank-you confirmation
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.error('Donation failed:', pi.id);
      break;
    }
  }

  res.status(200).json({ received: true });
}
```

### Webhook Registration in Stripe Dashboard
After deploying:
```
Test:       https://trae90rrfzfc.vercel.app/api/stripe/webhook
Production: https://www.leadbyexample-ri.org/api/stripe/webhook

Events to subscribe:
  - payment_intent.succeeded
  - payment_intent.payment_failed
  - charge.refunded
```

### Test → Live Flip Checklist
```
[ ] Implemented with sk_test_ / pk_test_ keys
[ ] End-to-end test donation completed ($1.00)
[ ] Webhook fires correctly in test mode (check Stripe Dashboard → Webhooks)
[ ] Receipt email arrives (if configured)
[ ] Switch to sk_live_ / pk_live_ in Vercel Dashboard
[ ] Register separate live webhook endpoint in Stripe Dashboard
[ ] Test $1.00 real donation on production domain
[ ] Robert confirmed he can view donations in Stripe Dashboard
```

### Preset Donation Amounts (match the $10,000 cookout goal context)
```typescript
const PRESET_AMOUNTS = [25, 50, 100, 250, 500]; // USD
```

---

## 📊 CURRENT FUNDRAISER DATA (FROM LIVE SITE)

**Event:** All Sides of Town Cookout — 5th Anniversary 2026

```typescript
const currentFundraiser = {
  title: 'All Sides of Town Cookout — 5th Anniversary 2026',
  date: 'July 18, 2026',
  time: '12:30pm - 8:00pm',
  location: 'Lincoln Woods Site A&B, Providence RI',
  features: [
    'Free food for all attendees',
    'Free haircuts',
    'Free backpack giveaway for students',
    'Games & activities for all ages',
  ],
  contact: {
    phone: '(401) 699-6544',
    emails: ['robertleadbyexample@gmail.com', 'ronaldleadbyexample@gmail.com'],
  },
};
```

**Impact stats displayed:**
- 125+ Youth Served
- 87% Success Rate
- 25+ Community Partners
- 12+ Active Mentors

---

## 📁 PROJECT FILE STRUCTURE

```
Lead-By-Example/
├── .env.example              # Template — copy to .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json             # paths: @/* → src/*
├── vercel.json               # Security headers + routing
├── package.json
├── docs/                     # SETUP.md, CONTRIBUTING.md, VERCEL_DEPLOYMENT.md
├── scripts/                  # setup.ps1, setup.sh
├── client_assets/            # Robert McKinney's provided assets
├── public/
│   ├── images/community/     # Cookout photos, events, museum trip, etc.
│   ├── video/HeroVideo.mp4   # Hero background video
│   ├── og-image.jpg
│   ├── twitter-image.jpg
│   └── browserconfig.xml
└── src/
    ├── components/           # Mausi's primary domain
    │   ├── Hero.tsx          ✅ Live
    │   ├── Testimonials.tsx  ✅ Live
    │   ├── Archive.tsx       ✅ Live
    │   ├── Newsletter.tsx    ✅ Live
    │   ├── Partners.tsx      ✅ Live
    │   ├── Footer.tsx        ✅ Live
    │   ├── DonationModal.tsx ⏳ To be created
    │   └── DonationForm.tsx  ⏳ To be created
    ├── pages/
    │   ├── index.tsx         ✅ Live
    │   ├── _app.tsx          ✅ Live
    │   ├── _document.tsx     ✅ Live
    │   └── api/
    │       └── stripe/       ⏳ To be created (Hunter only)
    │           ├── create-payment-intent.ts
    │           └── webhook.ts
    ├── styles/globals.css    ✅ Live
    ├── hooks/useInView.ts    ✅ Live
    └── utils/helpers.ts      ✅ Live
```

---

## 🔧 GIT WORKFLOW

### Before Starting Any Task
```bash
git status
git branch --show-current
git pull origin main
```

### Branch Naming
```bash
git checkout -b feat/stripe-donation-modal
git checkout -b feat/cloudflare-domain-config
git checkout -b chore/private-repo-migration
```

### Commit Format (Conventional Commits)
```
feat(stripe): add create-payment-intent API route
feat(stripe): implement DonationModal with Stripe Elements
feat(deploy): configure Cloudflare DNS for leadbyexample-ri.org
chore(repo): migrate to private repository
fix(meta): update og:url and twitter:url to production domain
```

### ⚠️ Merge Conflict Protocol
1. `git merge --abort`
2. `rm -rf .next`
3. Report to Hunter before retrying
4. Never resolve conflicts by force-pushing

### Never Do These
- ❌ Force push to `main`
- ❌ Commit `.env.local` or any real credentials
- ❌ Commit `node_modules/`
- ❌ Add `NEXT_PUBLIC_` prefix to `STRIPE_SECRET_KEY`
- ❌ Merge to `main` without Hunter's approval

---

## 🚀 VERCEL DEPLOYMENT

### All Required Environment Variables
```bash
NEXT_PUBLIC_APP_URL=https://www.leadbyexample-ri.org
NEXT_PUBLIC_APP_NAME=Lead By Example
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=...
```

### Pre-Deploy Checklist
```bash
npm run type-check    # Zero TypeScript errors
npm run lint          # Zero ESLint errors
npm run build         # Must succeed locally
```

### Project Settings
- Region: `iad1` — do not change
- Node: 18.x
- Build: `npm run build`
- Output: `.next`

---

## ⚠️ KNOWN FAILURE PATTERNS

### Git Conflicts Blocking Dev Server
Pattern: Merge conflict markers left in source files break Next.js compilation.
Fix: `git merge --abort` + `rm -rf .next` + `npm run dev`

### Cloudflare Proxy Blocking Vercel SSL
Pattern: Orange cloud (proxy enabled) in Cloudflare DNS prevents Vercel from provisioning SSL cert.
Fix: Set records to "DNS only" (grey cloud) during initial setup. Re-enable proxy only after SSL is confirmed.

### Meta Tags on Wrong Domain
Pattern: `og:url` and `twitter:url` previously referenced `leadbyexample.org`.
Fix: ✅ Resolved — all pages updated to `https://www.leadbyexample-ri.org` via `fix(meta)` commit.

### GitHub Pages Attempted as Deployment Target
Why it fails: Static-only — cannot run Stripe server-side API routes.
Correct target: Always Vercel.

---

## 🧭 QUICK DECISION TREE

```
Visual styling / animations / CSS?
  → Mausi's domain. Flag to Hunter. Do NOT modify.

Touching .env files?
  → Never commit real secrets. Template only in .env.example.

Stripe implementation?
  → Server-side only. /pages/api/stripe/ — Hunter owns this.
  → STRIPE_SECRET_KEY must NEVER have NEXT_PUBLIC_ prefix.

Force push to main?
  → Stop. Get Hunter's explicit approval.

Cloudflare DNS change?
  → Disable proxy (grey cloud) before Vercel SSL provisions.
```

---

## 📞 ESCALATION — STOP AND ASK HUNTER WHEN

- Git conflict can't be resolved without touching Mausi's component files
- TypeScript error requires `any` to resolve
- Stripe webhook signature verification failing in production
- Cloudflare DNS hasn't propagated after 2 hours
- Vercel SSL certificate failed to provision
- Private repo URL or credentials needed and not provided
- Any decision that would change the production domain configuration

---

## 🏁 SPRINT COMPLETION CHECKLIST

```
REPO MIGRATION
[x] Private org repo created: github.com/LeadByExample-RI/Lead-By-Example
[x] All branches pushed to new remote with full history
[x] Vercel reconnected to new org repo
[x] All env vars re-configured in new Vercel project
[~] Phase 4: Mia (@miasmith81) invite to LeadByExample-RI org — IN PROGRESS

CLOUDFLARE DOMAIN
[ ] Vercel domain entries added for leadbyexample-ri.org and www subdomain
[ ] Cloudflare A record added (grey cloud / DNS only)
[ ] Cloudflare CNAME added (grey cloud / DNS only)
[ ] Vercel SSL certificate provisioned (green padlock confirmed)
[ ] NEXT_PUBLIC_APP_URL updated in Vercel Dashboard
[x] og:url and twitter:url meta tags updated to new domain (fix(meta) commit)
[ ] Cloudflare proxy re-enabled (optional)
[ ] Old trae90rrfzfc.vercel.app URL redirects or deprecated

STRIPE DONATION SYSTEM
[ ] stripe + @stripe/stripe-js + @stripe/react-stripe-js installed
[ ] .env.local configured with test keys
[ ] /api/stripe/create-payment-intent.ts implemented and tested
[ ] /api/stripe/webhook.ts implemented with raw body parser
[ ] DonationModal.tsx wired to all "Help Make It Happen" buttons
[ ] DonationForm.tsx with Stripe Elements implemented
[ ] Webhook registered in Stripe Dashboard (test mode)
[ ] End-to-end $1.00 test donation successful
[ ] Live keys configured in Vercel Dashboard
[ ] Live webhook endpoint registered in Stripe Dashboard
[ ] Real $1.00 production donation tested
[ ] Robert McKinney confirmed access to Stripe Dashboard
```

---

## 📎 REFERENCE LINKS

| Resource | URL |
|----------|-----|
| Live Staging | https://trae90rrfzfc.vercel.app/ |
| Production Target | https://www.leadbyexample-ri.org |
| Repository | https://github.com/LeadByExample-RI/Lead-By-Example |
| Vercel Dashboard | https://vercel.com/dashboard |
| Stripe Dashboard | https://dashboard.stripe.com |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Stripe Next.js Guide | https://stripe.com/docs/stripe-js/react |
| Next.js 14 Docs | https://nextjs.org/docs |
| Framer Motion | https://www.framer.com/motion/ |

---

*Instructions maintained by StrayDog Syndications LLC*
*Senior Developer: @StrayDogSyn | Frontend: @miasmith81*
*Last updated: May 2026*
