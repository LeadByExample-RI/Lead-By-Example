# 🚀 Quick Setup & Testing Guide
## Stripe Integration for Lead By Example

This is your go-to reference for setting up and testing the Stripe integration.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (1 min)

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js micro
npm install -D @types/micro
```

### Step 2: Get Your Stripe Keys (2 min)

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy these keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Step 3: Set Environment Variables (1 min)

Create or update `.env.local`:

```bash
# Stripe Test Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...your_key
STRIPE_SECRET_KEY=sk_test_51ABC...your_key
STRIPE_WEBHOOK_SECRET=whsec_...your_webhook_secret
```

### Step 4: Create API Routes (1 min)

Create these two files:

```
src/pages/api/stripe/
├── create-payment-intent.ts  ← Copy from create-payment-intent.ts
└── webhook.ts                ← Copy from webhook.ts
```

---

## 📁 Complete File Structure

```
Lead-By-Example/
├── .env.local                           ← Your Stripe keys (DO NOT COMMIT!)
├── src/
│   ├── types/
│   │   └── donation.ts                  ← Type definitions
│   ├── components/
│   │   ├── StripeProvider.tsx           ← Wraps app with Stripe
│   │   ├── DonateButton.tsx             ← Donate button component
│   │   └── DonationModal.tsx            ← Main donation modal
│   ├── pages/
│   │   ├── _app.tsx                     ← Updated with StripeProvider
│   │   ├── index.tsx                    ← Add donation modal
│   │   └── api/
│   │       └── stripe/
│   │           ├── create-payment-intent.ts  ← Payment creation
│   │           └── webhook.ts                 ← Stripe webhooks
│   └── styles/
│       └── globals.css                  ← Your existing styles
└── package.json
```

---

## 🧪 Testing with Stripe Test Cards

### Success Scenarios

**Basic Success:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**3D Secure Authentication Required:**
```
Card Number: 4000 0025 0000 3155
Result: Prompts for 3D Secure authentication
```

### Decline Scenarios

**Generic Decline:**
```
Card Number: 4000 0000 0000 0002
Result: Card declined
```

**Insufficient Funds:**
```
Card Number: 4000 0000 0000 9995
Result: Insufficient funds error
```

**Lost Card:**
```
Card Number: 4000 0000 0000 9987
Result: Lost card decline
```

**Stolen Card:**
```
Card Number: 4000 0000 0000 9979
Result: Stolen card decline
```

---

## 🔧 Local Development Testing

### Start Development Server

```bash
npm run dev
```

### Test Checklist

```
[ ] 1. Open http://localhost:3000
[ ] 2. Click "Donate Now" button
[ ] 3. Modal opens with correct styling
[ ] 4. Select amount: $50
[ ] 5. Enter info:
       Name: Test Donor
       Email: test@example.com
[ ] 6. Payment form appears (Stripe Elements)
[ ] 7. Enter test card: 4242 4242 4242 4242
[ ] 8. Enter expiry: 12/25
[ ] 9. Enter CVC: 123
[ ] 10. Enter ZIP: 12345
[ ] 11. Click "Complete Donation"
[ ] 12. Success message appears
[ ] 13. Modal closes after 3 seconds
[ ] 14. Check browser console (no errors)
[ ] 15. Check terminal logs (payment intent created)
```

---

## 🪝 Webhook Testing (Local)

### Option 1: Stripe CLI (Recommended)

**Install Stripe CLI:**

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (with Scoop)
scoop install stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.18.0/stripe_1.18.0_linux_x86_64.tar.gz
tar -xvf stripe_1.18.0_linux_x86_64.tar.gz
```

**Setup and Run:**

```bash
# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret it displays
# Example: whsec_abc123...

# Add to .env.local:
STRIPE_WEBHOOK_SECRET=whsec_abc123...
```

**Test Webhooks:**

```bash
# In another terminal, trigger test events:
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger charge.refunded
```

### Option 2: Manual Webhook Testing

If you can't use Stripe CLI, webhooks will only work in production. For local testing:

1. Test payments will still work
2. Success/failure will show in UI
3. Webhooks will fire once deployed to Vercel

---

## 🚀 Production Deployment

### Step 1: Get Production Stripe Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Toggle to **Live mode** (top right)
3. Copy your live keys:
   - `pk_live_...`
   - `sk_live_...`

⚠️ **Never use test keys in production!**

### Step 2: Set Production Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded` (optional)
5. Click "Add endpoint"
6. Copy webhook signing secret: `whsec_...`

### Step 3: Add to Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables for **Production**:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_KEY
STRIPE_SECRET_KEY = sk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET = whsec_YOUR_WEBHOOK_SECRET
```

### Step 4: Deploy

```bash
git add .
git commit -m "feat: add Stripe payment integration"
git push origin main
```

Vercel will auto-deploy!

### Step 5: Test Production

```
[ ] Visit your live site
[ ] Click "Donate Now"
[ ] Make a $1 test donation with real card
[ ] Verify in Stripe Dashboard (live mode)
[ ] Check webhook logs in Stripe
[ ] Verify receipt email received
[ ] Test on mobile device
```

---

## 🐛 Common Issues & Fixes

### Issue: "Stripe is not defined"

**Problem:** Environment variables not loaded

**Fix:**
```bash
# Check .env.local exists
ls -la .env.local

# Check variable is set
cat .env.local | grep STRIPE

# Restart dev server
npm run dev
```

### Issue: Modal doesn't open

**Problem:** State management issue

**Fix:** Check your component:
```typescript
const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

// Make sure you're setting it to true
<DonateButton onOpenDonation={() => setIsDonationModalOpen(true)} />
```

### Issue: Payment form doesn't load

**Problem:** StripeProvider not wrapping app

**Fix:** Check `_app.tsx`:
```typescript
import StripeProvider from '@/components/StripeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StripeProvider>
      <Component {...pageProps} />
    </StripeProvider>
  );
}
```

### Issue: "Invalid publishable key"

**Problem:** Wrong key format or mixed test/live keys

**Fix:**
```bash
# Test keys should start with:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Live keys should start with:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# NEVER mix test and live keys!
```

### Issue: TypeScript errors

**Fix:**
```bash
# Install type definitions
npm install -D @types/micro @types/stripe

# Run type check
npm run type-check

# Check tsconfig.json paths
```

### Issue: Webhook signature verification fails

**Problem:** Wrong webhook secret or missing `micro` package

**Fix:**
```bash
# Install micro
npm install micro
npm install -D @types/micro

# For local testing, use Stripe CLI secret
# For production, use webhook secret from Stripe Dashboard

# Verify webhook secret in .env.local
echo $STRIPE_WEBHOOK_SECRET
```

### Issue: Styles not matching design

**Problem:** Tailwind not processing new files

**Fix:** Check `tailwind.config.js`:
```javascript
content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

Restart dev server after adding new files.

---

## 📊 Monitoring Your Donations

### Stripe Dashboard

View real-time data:
- **Payments**: https://dashboard.stripe.com/payments
- **Customers**: https://dashboard.stripe.com/customers
- **Webhooks**: https://dashboard.stripe.com/webhooks

### What to Monitor

```
Key Metrics:
- Total donations received
- Average donation amount
- Success rate (successful / total attempts)
- Failed payment reasons
- Refund requests
- Peak donation times
```

### Check Logs

**Browser Console:**
```javascript
// Open browser DevTools (F12)
// Check Console tab for errors
// Look for successful payment logs
```

**Server Logs (Vercel):**
```bash
# View logs in Vercel dashboard
# Or use Vercel CLI:
vercel logs
```

**Stripe Dashboard Logs:**
- Go to **Developers** → **Logs**
- Filter by API version, status, or search

---

## 🔐 Security Checklist

Before going live:

```
Security:
[ ] .env.local in .gitignore
[ ] Never committed API keys to Git
[ ] Using HTTPS in production (Vercel default)
[ ] Webhook signatures verified
[ ] Amount validation on server-side
[ ] Email validation on server-side
[ ] Rate limiting implemented (optional but recommended)
[ ] Error messages don't expose sensitive data
[ ] Using live keys in production, test keys in development
```

---

## 📈 Performance Optimization

### Lazy Load Modal

Only load Stripe when needed:

```typescript
import dynamic from 'next/dynamic';

const DonationModal = dynamic(
  () => import('@/components/DonationModal'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);
```

### Optimize Bundle Size

Check your bundle:

```bash
npm run build
```

Look for large dependencies and consider:
- Code splitting
- Dynamic imports
- Tree shaking

---

## 🎯 Testing Scenarios

### Scenario 1: Successful Small Donation

```
Amount: $25
Card: 4242 4242 4242 4242
Expected: ✅ Success message, receipt email, Stripe Dashboard shows payment
```

### Scenario 2: Successful Large Donation

```
Amount: $1,000
Card: 4242 4242 4242 4242
Expected: ✅ Success message, receipt email, amount correctly recorded
```

### Scenario 3: Custom Amount

```
Amount: $73.50
Card: 4242 4242 4242 4242
Expected: ✅ Exact amount charged (not rounded)
```

### Scenario 4: 3D Secure

```
Card: 4000 0025 0000 3155
Expected: ✅ 3D Secure popup, successful after authentication
```

### Scenario 5: Declined Card

```
Card: 4000 0000 0000 0002
Expected: ❌ Error message: "Card declined"
```

### Scenario 6: Anonymous Donation

```
Check: ☑️ Make this donation anonymous
Expected: ✅ Name shows as "Anonymous" in Stripe metadata
```

### Scenario 7: Newsletter Signup

```
Check: ☑️ Send me updates
Expected: ✅ Email marked for newsletter in metadata
```

### Scenario 8: Mobile Device

```
Device: iPhone/Android
Expected: ✅ Modal responsive, easy to tap, keyboard doesn't cover inputs
```

---

## 📞 Getting Help

### Stripe Resources

- **Documentation**: https://stripe.com/docs
- **API Reference**: https://stripe.com/docs/api
- **Support**: https://support.stripe.com

### Next.js Resources

- **Documentation**: https://nextjs.org/docs
- **API Routes**: https://nextjs.org/docs/api-routes/introduction

### Project Support

**Developer:**
- StrayDog Syndications LLC
- Check project documentation
- Review GitHub issues

---

## ✅ Launch Checklist

Before launching to real users:

```
Pre-Launch:
[ ] Tested with all test cards
[ ] Tested 3D Secure flow
[ ] Tested mobile responsive design
[ ] Verified email receipts work
[ ] Checked webhook logs
[ ] Reviewed Stripe Dashboard
[ ] Set up live mode keys
[ ] Configured production webhooks
[ ] Tested with real $1 donation
[ ] Verified success email
[ ] Checked webhook fired
[ ] Reviewed error handling
[ ] Tested on multiple browsers
[ ] Tested on mobile devices
[ ] Created backup of test data
[ ] Documented for team
```

---

## 🎉 Success Metrics

Track after launch:

```
Week 1:
- Total donations
- Average donation amount
- Conversion rate (completed / started)
- Mobile vs desktop split
- Error rate

Month 1:
- Repeat donors
- Popular donation amounts
- Peak donation times
- Geographic distribution (from Stripe)
- Payment method breakdown
```

---

## 🔄 Maintenance

### Regular Tasks

**Weekly:**
- Check Stripe Dashboard for issues
- Review failed payment reasons
- Monitor webhook delivery

**Monthly:**
- Review donation trends
- Update fundraiser amounts
- Check for Stripe updates
- Review error logs

**Quarterly:**
- Update dependencies
- Review security practices
- Optimize conversion rate
- Gather user feedback

---

## 🚨 Emergency Procedures

### If Payments Stop Working

1. **Check Stripe Dashboard**
   - Status: https://status.stripe.com
   - Check for incidents

2. **Check Vercel Logs**
   ```bash
   vercel logs --follow
   ```

3. **Verify Environment Variables**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Ensure all keys are set

4. **Test with Curl**
   ```bash
   curl -X POST https://yourdomain.com/api/stripe/create-payment-intent \
     -H "Content-Type: application/json" \
     -d '{"amount":10,"donorEmail":"test@test.com","donorName":"Test"}'
   ```

5. **Rollback if Needed**
   ```bash
   vercel rollback
   ```

### Support Contacts

- **Stripe Support**: support@stripe.com
- **Vercel Support**: support@vercel.com
- **StrayDog Syndications**: (your support contact)

---

## 💡 Pro Tips

1. **Start Small**: Test with $1 donations first
2. **Monitor Closely**: Watch first week of live donations carefully
3. **Gather Feedback**: Ask donors about their experience
4. **Optimize Amounts**: Adjust preset amounts based on popular choices
5. **Track Conversions**: See where users drop off
6. **Mobile First**: Most traffic will be mobile
7. **Fast Support**: Respond quickly to payment issues
8. **Thank Donors**: Send personalized thank you messages
9. **Share Impact**: Show donors how their money helps
10. **Keep Updated**: Stay current with Stripe changes

---

**Ready to accept donations? Let's make an impact! 🚀**

Questions? Check the main integration guide or contact support.
