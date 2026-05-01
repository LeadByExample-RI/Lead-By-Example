# Phase 1 Architecture: Launch Critical Implementation

**Document**: Detailed technical architecture for Phase 1 implementation  
**Date**: April 28, 2026  
**Version**: 1.0

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        Next.js 16 Frontend                      │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pages:                    API Routes:                          │
│  ├─ /auth/signin      →    /api/auth/[...nextauth]            │
│  ├─ /auth/signup      →    /api/stripe/create-payment-intent  │
│  ├─ /                 →    /api/stripe/webhook                │
│  ├─ /events           →    /api/newsletter/subscribe          │
│  └─ /donate                                                     │
│                                                                  │
│  Libraries:                                                      │
│  ├─ React Hook Form - Form handling                            │
│  ├─ Zod - Validation                                           │
│  ├─ Framer Motion - Animations                                 │
│  └─ Tailwind CSS - Styling                                     │
│                                                                  │
└────────────┬───────────────────────────────────────────────────┘
             │
       ┌─────v──────┐
       │  NextAuth  │ ◄────── Session/JWT Management
       └────┬───────┘
            │
    ┌───────v──────────┐
    │  Backend Layer   │
    ├──────────────────┤
    │                  │
    │  lib/auth.ts     │ - Authentication config
    │  lib/db.ts       │ - Prisma client (singleton)
    │  lib/db-queries  │ - Query helpers
    │  lib/email-svc   │ - Email service (Resend)
    │                  │
    └────┬─────────────┘
         │
    ┌────v──────────────────────────────┐
    │   Data Persistence Layer          │
    ├───────────────────────────────────┤
    │                                    │
    │   ┌─────────────────────────────┐ │
    │   │  Prisma ORM                 │ │
    │   │  - Type-safe queries        │ │
    │   │  - Auto migrations          │ │
    │   │  - Connection pooling       │ │
    │   └────────┬────────────────────┘ │
    │            │                       │
    │   ┌────────v────────────────────┐ │
    │   │ PostgreSQL Database         │ │
    │   │ (Vercel Postgres / AWS RDS) │ │
    │   └─────────────────────────────┘ │
    │                                    │
    └────────────────────────────────────┘
         │
    ┌────v──────────────────────────────┐
    │   External Services               │
    ├───────────────────────────────────┤
    │                                    │
    │  Stripe                            │
    │  ├─ Payment Intent Creation       │
    │  ├─ Webhook (payment_intent *)    │
    │  └─ Charge events                 │
    │                                    │
    │  Resend (Email)                    │
    │  ├─ Send donation receipts        │
    │  ├─ Welcome emails                │
    │  └─ Newsletter confirmations      │
    │                                    │
    │  Sentry (Error Tracking)           │
    │  └─ Production monitoring         │
    │                                    │
    └────────────────────────────────────┘
```

---

## 📊 Database Schema

### Core Entities

#### User (Authentication & Profiles)
```
User
├─ id (PK)
├─ email (UNIQUE)
├─ emailVerified
├─ password (hashed via bcryptjs)
├─ name
├─ image
├─ role (donor|volunteer|mentor|admin)
├─ createdAt
├─ updatedAt
└─ Relations
   ├─ accounts (OAuth)
   ├─ sessions
   ├─ donations
   ├─ eventRegistrations
   └─ newsletter
```

#### Donation (Core Business Data)
```
Donation
├─ id (PK)
├─ userId (FK, nullable for anonymous)
├─ stripePaymentIntentId (UNIQUE)
├─ amount (Decimal)
├─ currency
├─ status (completed|pending|failed|refunded)
├─ donorName
├─ donorEmail
├─ campaign
├─ eventId (FK, nullable)
├─ metadata (JSON - Stripe metadata)
├─ notes
├─ createdAt
├─ updatedAt
└─ Indexes
   ├─ stripePaymentIntentId
   ├─ userId
   ├─ donorEmail
   ├─ campaign
   └─ createdAt
```

#### Event (Community Engagement)
```
Event
├─ id (PK)
├─ title
├─ slug (UNIQUE)
├─ description
├─ startDate
├─ endDate
├─ location
├─ eventType (community|fundraiser|mentorship)
├─ maxAttendees
├─ registeredCount
├─ goal (fundraiser goal)
├─ raisedAmount
├─ image
├─ tags (array)
├─ createdAt
├─ updatedAt
└─ Relations
   ├─ registrations (EventRegistration[])
   └─ donations (Donation[])
```

#### EventRegistration (Attendees)
```
EventRegistration
├─ id (PK)
├─ userId (FK)
├─ eventId (FK)
├─ status (registered|attended|cancelled)
├─ guestCount
├─ specialRequests
├─ registeredAt
├─ attendedAt
└─ Unique: [userId, eventId]
```

#### Newsletter (Email Subscribers)
```
Newsletter
├─ id (PK)
├─ email (UNIQUE)
├─ userId (FK, nullable, UNIQUE)
├─ subscribed (boolean)
├─ frequency (daily|weekly|monthly)
├─ interests (array)
├─ subscribedAt
├─ verifiedAt
├─ unsubscribedAt
└─ Indexes
   ├─ email
   └─ subscribed
```

#### Supporting Tables
- **Account** - OAuth provider linkage
- **Session** - NextAuth session management
- **VerificationToken** - Email verification
- **EmailLog** - Email audit trail
- **PageView** - Analytics
- **ErrorLog** - Error tracking

---

## 🔐 Authentication Flow

### Sign-Up Flow
```
1. User visits /auth/signup
2. Fills form (name, email, password)
3. Form validated with Zod
4. Password hashed with bcryptjs (12 rounds)
5. User created in database via Prisma
6. NextAuth creates session
7. User redirected to home/onboarding
```

### Sign-In Flow
```
1. User visits /auth/signin
2. Enters email & password
3. Credentials passed to NextAuth provider
4. Provider queries database for user
5. Password compared with bcryptjs.compare()
6. If match: JWT token issued, session created
7. If fail: Error message shown, no session
```

### Session Management
```
NextAuth JWT Strategy
├─ No database hit on each request
├─ JWT contains user ID
├─ Session middleware verifies token
├─ Refresh tokens handled automatically
└─ 30-day expiration (configurable)
```

---

## 💰 Donation & Payment Flow

### Payment Intent Creation (`create-payment-intent`)
```
1. User fills donation form
2. Frontend calls /api/stripe/create-payment-intent
3. Server creates Stripe PaymentIntent
4. Metadata attached (donor name, email, campaign)
5. clientSecret returned to frontend
6. Stripe JS library loads payment element
7. User enters card details (handled by Stripe)
```

### Webhook Processing (`webhook`)
```
POST /api/stripe/webhook
1. Verify webhook signature with Stripe secret
2. Extract event type
3. If payment_intent.succeeded:
   a. Save donation to database via donationQueries.saveDonation()
   b. Send receipt email via sendDonationReceipt()
   c. Log success
4. Return 200 to Stripe (acknowledge receipt)
```

### Database Persistence (NEW)
```
donationQueries.saveDonation({
  stripePaymentIntentId: 'pi_xxx',
  amount: 50.00,
  currency: 'USD',
  donorName: 'John Doe',
  donorEmail: 'john@example.com',
  campaign: 'Summer Mentorship',
  metadata: {...}
})
↓
Prisma.donation.upsert() → INSERT or UPDATE
↓
Donation record created in database
```

### Email Sending (NEW)
```
sendDonationReceipt({
  donorEmail: 'john@example.com',
  donorName: 'John Doe',
  amount: 50.00,
  transactionId: 'pi_xxx'
})
↓
Render DonationReceiptEmail component
↓
Send via Resend API
↓
Log to EmailLog table for audit trail
```

---

## 📧 Email Service Architecture

### Email Service (`lib/email-service.ts`)

**Key Functions:**
```typescript
sendDonationReceipt()     - Tax receipt after donation
sendWelcomeEmail()         - New user welcome
sendNewsletterConfirmation() - Newsletter signup
sendEventRegistrationConfirmation() - Event attendance
sendNewsletter()           - Bulk email send
```

**Email Logging:**
- Every sent email logged to `EmailLog` table
- Tracks: recipient, subject, type, status
- Enables audit trail for compliance
- Identifies failed sends for retry

### Email Templates

**DonationReceiptEmail.tsx**
- Professional receipt design
- Amount, transaction ID, date
- Impact message
- Footer with links

**WelcomeEmail.tsx**
- Feature overview
- Call-to-action
- Social proof
- Next steps

---

## 🔧 API Routes (Phase 1)

### Authentication Routes
```
/api/auth/signin        - POST credential sign-in
/api/auth/signup        - POST new user registration
/api/auth/signout       - POST session termination
/api/auth/[...nextauth] - Handles all auth requests
```

### Payment Routes
```
/api/stripe/create-payment-intent - POST create intent
/api/stripe/webhook               - POST stripe events
```

### Email Routes (Planned)
```
/api/newsletter/subscribe   - POST subscribe to newsletter
/api/email/send-receipt     - POST manual receipt send
```

---

## 🔄 Data Flow: Complete Donation Journey

```
Step 1: User Donation
┌─────────────┐
│ Donation    │
│   Form      │ ← User fills amount, email, name
└──────┬──────┘
       │
       v
Step 2: Create Payment Intent
┌──────────────────────────────┐
│ Frontend calls               │
│ /api/stripe/create-payment   │
│ -intent with donation data   │
└──────┬───────────────────────┘
       │
       v
Step 3: Stripe Handles Payment
┌──────────────────────────────┐
│ User enters card details     │
│ Stripe processes payment     │
│ Returns payment_intent ID    │
└──────┬───────────────────────┘
       │
       v
Step 4: Stripe Sends Webhook
┌──────────────────────────────┐
│ POST /api/stripe/webhook     │
│ with payment_intent.succeeded│
└──────┬───────────────────────┘
       │
       v
Step 5: Verify & Save (NEW)
┌──────────────────────────────┐
│ 1. Verify signature          │
│ 2. Extract donation data     │
│ 3. Save to Donation table    │
│ 4. Send receipt email        │
│ 5. Log success               │
└──────┬───────────────────────┘
       │
       v
Step 6: Persist Data (NEW)
┌──────────────────────────────┐
│ Database:                    │
│ ├─ Donation record created   │
│ └─ User linked (if known)    │
└──────┬───────────────────────┘
       │
       v
Step 7: Email Sent (NEW)
┌──────────────────────────────┐
│ Resend sends receipt via     │
│ DonationReceiptEmail template│
│ Logged to EmailLog table     │
└──────────────────────────────┘
```

---

## 🔒 Security Measures (Phase 1)

### Authentication
- ✅ Passwords hashed with bcryptjs (12 rounds)
- ✅ NextAuth JWT signed with NEXTAUTH_SECRET
- ✅ Session tokens secure and HTTPOnly
- ✅ Type-safe with TypeScript

### API Security
- ✅ Stripe webhook signature verification
- ✅ Environment variables for all secrets
- ✅ No secrets in code or git
- ✅ HTTPS enforced in production

### Database
- ✅ SQL injection prevented (Prisma parameterization)
- ✅ Transactions for multi-step operations
- ✅ Foreign key constraints
- ✅ Indexes on frequently queried columns

### Next Steps (Phase 2)
- ⏳ Rate limiting on API routes
- ⏳ CORS configuration
- ⏳ CSP headers
- ⏳ Error tracking with Sentry

---

## 📈 Query Patterns (lib/db-queries.ts)

### Donations
```typescript
// Save new donation
await donationQueries.saveDonation({...})

// Get donation stats
await donationQueries.getStats({
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-31')
})

// Mark as refunded
await donationQueries.refundDonation(paymentIntentId, amount)
```

### Users
```typescript
// Find by email
await userQueries.getByEmail('donor@example.com')

// Get with relations
await userQueries.getWithRelations(userId)
// Returns: user + donations + event registrations + newsletter prefs
```

### Events
```typescript
// Get upcoming events
await eventQueries.getUpcoming(limit: 10)

// Get event registrations
await eventQueries.getRegistrations(eventId)

// Register user
await eventQueries.registerUserForEvent(userId, eventId)
```

### Newsletter
```typescript
// Subscribe to newsletter
await newsletterQueries.subscribe(email, {
  frequency: 'weekly',
  interests: ['events', 'updates']
})

// Get active subscribers
await newsletterQueries.getActiveSubscribers()
```

---

## 🧪 Testing Checklist (Phase 1)

- [ ] `npm install` succeeds
- [ ] Database pushes schema: `npm run db:push`
- [ ] Can sign up: `POST /api/auth/signin` (with isSignUp=true)
- [ ] Can sign in: `POST /api/auth/signin`
- [ ] Can create payment intent
- [ ] Stripe webhook receives event
- [ ] Donation saved to database
- [ ] Receipt email sent (check logs)
- [ ] No TypeScript errors: `npm run type-check`
- [ ] All env vars configured

---

## 📚 Key Technologies

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 16 | SSR, API routes, optimizations |
| Frontend | React 19 | Modern UI with hooks |
| Type Safety | TypeScript | Prevent bugs at compile time |
| Database | PostgreSQL | Reliable, scalable, ACID |
| ORM | Prisma | Type-safe, auto-migrations |
| Auth | NextAuth.js | Industry standard, flexible |
| Auth Hash | bcryptjs | Secure password hashing |
| Email | Resend | Modern API, good for startups |
| Email Templates | React Email | Type-safe email markup |
| Validation | Zod | Runtime type checking |
| Forms | React Hook Form | Lightweight, performant |

---

## 🚀 Performance Considerations

- **Prisma Connection Pooling**: Singleton client prevents exhaustion
- **JWT Sessions**: No database hit on every request
- **Lazy Loading**: Email templates only rendered when sending
- **Database Indexes**: Donation queries indexed on common filters
- **Bulk Operations**: Newsletter send batched (50 at a time)

---

## 📝 Environment Variables Reference

### Required (Phase 1)
```
DATABASE_URL                        PostgreSQL connection string
NEXTAUTH_SECRET                     JWT signing key (32+ bytes)
NEXTAUTH_URL                        App URL for auth callbacks
STRIPE_WEBHOOK_SECRET               Webhook verification key
RESEND_API_KEY                      Email service API key
```

### Optional (Phase 2+)
```
SENTRY_DSN                          Error tracking
GOOGLE_ANALYTICS_ID                 Analytics
NEXT_PUBLIC_ENABLE_DARK_MODE        Feature flag
```

---

## 🔄 Continuous Integration (Phase 2)

```
On Git Push
1. npm install
2. npm run type-check
3. npm run lint
4. npm run test
5. If all pass → Deploy to staging
6. If manual approval → Deploy to production
```

---

This architecture supports the 2-developer team working 10-20 hours/week and aligns with non-profit best practices for donor management and transparency.
