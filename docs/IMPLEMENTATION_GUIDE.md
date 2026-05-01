# Implementation Guide: Phase 1 - Launch Critical Setup

This guide walks through the Phase 1 implementation for Lead By Example. All foundational infrastructure has been created - you now need to complete the final setup steps.

---

## ✅ What's Been Implemented

### Database Layer
- **Prisma Schema** (`prisma/schema.prisma`): Complete data models including users, donations, events, newsletters, and email logs
- **Database Client** (`lib/db.ts`): Singleton Prisma client for serverless environments
- **Query Helpers** (`lib/db-queries.ts`): Pre-built functions for common database operations

### Authentication System
- **NextAuth Configuration** (`lib/auth.ts`): Email/password authentication with Prisma adapter
- **Auth API Route** (`src/pages/api/auth/[...nextauth].ts`): Handles all auth requests
- **Sign-In Page** (`src/pages/auth/signin.tsx`): Professional login UI
- **Sign-Up Page** (`src/pages/auth/signup.tsx`): Registration with validation
- **Type Definitions** (`src/types/next-auth.d.ts`): TypeScript support for NextAuth

### Email Infrastructure
- **Email Service** (`lib/email-service.ts`): Resend integration with multiple email functions
- **Email Templates**:
  - `emails/DonationReceiptEmail.tsx` - Tax receipt template
  - `emails/WelcomeEmail.tsx` - New user welcome
- **Email Logging**: Tracks all sent emails for auditing
- **Bulk Send**: Newsletter distribution support

### Configuration Updates
- **package.json**: New dependencies, new scripts
- **.env.example**: Complete environment variable documentation

---

## 🔧 What You Need to Do

### Step 1: Install Dependencies (5 minutes)
```bash
cd c:\Users\Petro\repos\Lead-By-Example
npm install
# or if using pnpm:
pnpm install
```

### Step 2: Setup Environment Variables (10 minutes)

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in required values in `.env.local`:
   ```bash
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/lead_by_example
   
   # NextAuth
   NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
   NEXTAUTH_URL=http://localhost:3000
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Resend Email
   RESEND_API_KEY=re_...
   ```

3. Get your values from:
   - **PostgreSQL Database**: Vercel Postgres, AWS RDS, or local PostgreSQL
   - **NEXTAUTH_SECRET**: Run `openssl rand -base64 32` in terminal
   - **Stripe Keys**: https://dashboard.stripe.com/test/apikeys
   - **Stripe Webhook Secret**: Set up webhook at https://dashboard.stripe.com/test/webhooks
   - **Resend API Key**: https://resend.com/api-keys

### Step 3: Generate NextAuth Secret
```bash
# On Windows (PowerShell)
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# On Mac/Linux
openssl rand -base64 32
```

### Step 4: Setup Database
```bash
# Push schema to database
npm run db:push

# Or for migration-based approach:
npm run db:migrate
```

### Step 5: Update Webhook (Manual File Edit)

Open `src/pages/api/stripe/webhook.ts` and:

1. **Add imports at the top** (after existing imports):
```typescript
import { donationQueries } from '@/lib/db-queries';
import { sendDonationReceipt } from '@/lib/email-service';
```

2. **Replace the entire `handlePaymentSuccess()` function** with:
```typescript
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const amount = paymentIntent.amount / 100;
  const donorName = paymentIntent.metadata.donorName || 'Anonymous';
  const donorEmail = paymentIntent.metadata.donorEmail;
  const campaign = paymentIntent.metadata.campaign;

  console.log('🎉 Payment succeeded:', {
    id: paymentIntent.id,
    amount: `$${amount.toFixed(2)}`,
    donor: donorName,
    email: donorEmail,
    campaign: campaign,
    timestamp: new Date().toISOString(),
  });

  try {
    // Save donation to database
    const donation = await donationQueries.saveDonation({
      stripePaymentIntentId: paymentIntent.id,
      amount,
      currency: paymentIntent.currency.toUpperCase(),
      donorName,
      donorEmail,
      campaign,
      metadata: paymentIntent.metadata,
    });

    console.log('💾 Donation saved to database:', donation.id);

    // Send thank you email if we have an email
    if (donorEmail) {
      const emailResult = await sendDonationReceipt({
        donorName,
        donorEmail,
        amount,
        currency: paymentIntent.currency.toUpperCase(),
        campaign,
        transactionId: paymentIntent.id,
        message: 'Thank you for your generous donation! Your contribution directly supports our mission.',
      });

      if (emailResult.success) {
        console.log('✉️  Donation receipt email sent');
      } else {
        console.error('❌ Failed to send donation receipt:', emailResult.error);
      }
    }

    console.log('📊 Donation processed successfully');
  } catch (error: any) {
    console.error('❌ Error saving donation:', error);
    throw error;
  }
}
```

### Step 6: Test Everything (15 minutes)

```bash
# Start development server
npm run dev
```

Then visit:
- http://localhost:3000 - Homepage
- http://localhost:3000/auth/signin - Sign-in page
- http://localhost:3000/auth/signup - Sign-up page

**Test sign-up flow:**
1. Go to sign-up page
2. Fill in form with test data
3. Check console for any errors
4. Verify user appears in database (`npm run db:studio`)

**Test donation webhook (local):**
```bash
# In another terminal window, start Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook

# You'll get a webhook secret - add it to .env.local as STRIPE_WEBHOOK_SECRET

# In Stripe dashboard or use Stripe CLI to trigger test events:
stripe trigger payment_intent.succeeded
```

---

## 🚀 Next Steps (Phase 2)

Once Phase 1 is working:

1. **Error Tracking** - Set up Sentry
2. **Security** - Add rate limiting and CORS
3. **Accessibility** - WCAG 2.1 AA audit
4. **Performance** - Core Web Vitals optimization

---

## 📝 Database Schema Overview

### Key Tables Created
- **User** - User accounts with authentication
- **Donation** - Donation records with Stripe linkage
- **Event** - Community events
- **EventRegistration** - Attendee list
- **Newsletter** - Email subscribers
- **EmailLog** - Email send audit trail

### Important Queries
See `lib/db-queries.ts` for pre-built helpers:
- `donationQueries.saveDonation()` - Save new donation
- `donationQueries.getStats()` - Fundraising analytics
- `userQueries.getByEmail()` - Find user
- `eventQueries.getUpcoming()` - List upcoming events
- `newsletterQueries.subscribe()` - Add newsletter subscriber

---

## 🔐 Security Checklist

- [ ] All `.env` variables configured in production
- [ ] NEXTAUTH_SECRET is strong (use openssl rand -base64 32)
- [ ] DATABASE_URL points to production database
- [ ] STRIPE_WEBHOOK_SECRET is set
- [ ] STRIPE_SECRET_KEY is NOT in `next.config.js` or public files
- [ ] Resend API key is secure (server-side only)
- [ ] CORS headers configured (Phase 2)
- [ ] Rate limiting enabled (Phase 2)

---

## 🐛 Troubleshooting

### "DATABASE_URL not set"
- Check `.env.local` has DATABASE_URL
- Restart `npm run dev` after setting env vars

### "STRIPE_WEBHOOK_SECRET not valid"
- Must start with `whsec_`
- Run `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Use the secret from output

### "Resend API key not configured"
- Get key from https://resend.com/api-keys
- Add to `.env.local` as RESEND_API_KEY

### "NextAuth credential provider not working"
- Check bcryptjs installed: `npm list bcryptjs`
- Verify password hashing working in `lib/auth.ts`
- Check database has User table created

### Email not sending
- Verify RESEND_API_KEY is valid
- Check email address is correct in donation metadata
- Review `lib/email-service.ts` logs in console

---

## 📊 Current Architecture

```
┌─────────────────┐
│   Next.js App   │
├─────────────────┤
│  Auth Pages     │ → NextAuth
│  Stripe Forms   │ → Stripe
│  Events         │
└────────┬────────┘
         │
    ┌────v────┐
    │ API     │
    │ Routes  │
    ├────────┤
    │ /auth   │ → Database (Prisma)
    │ /stripe │ → Email Service (Resend)
    │ /email  │
    └────────┘
         │
    ┌────v─────────┐
    │  PostgreSQL   │
    │  + Prisma     │
    └───────────────┘
```

---

## 🎯 Success Indicators

- ✅ Database tables created successfully
- ✅ Can sign up new user
- ✅ Can sign in with credentials
- ✅ Donation webhook persists data to database
- ✅ Receipt email sends to donor
- ✅ No errors in Sentry or console
- ✅ All environment variables configured

---

## 📞 Support

If you encounter issues:

1. Check console logs: `npm run dev` output
2. Review database: `npm run db:studio`
3. Check Stripe webhook logs: https://dashboard.stripe.com/test/webhooks
4. Verify environment variables: `.env.local` contains all required vars

---

**You're now ready for Phase 1 completion!** Once these steps are done, move on to Phase 2 (Error Tracking, Security, Accessibility).
