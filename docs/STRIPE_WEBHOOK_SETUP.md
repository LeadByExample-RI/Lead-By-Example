# Stripe Webhook Setup Guide

## ✅ Production Webhook Status: CONFIGURED

### Current Production Webhook Details

- **Name**: whimsical-spark
- **Status**: ✅ Active
- **Endpoint URL**: `https://lead-by-example-mvp.vercel.app/api/stripe/webhook`
- **API Version**: 2025-10-29.clover
- **Webhook Secret**: `whsec_3SuJNKA7BsUlbXZGk5dIeHvOeslYRXJb`
- **Dashboard Link**: https://dashboard.stripe.com/acct_1SSRSgJbDiLxseXw/workbench/webhooks/we_1STvwVJbDiLxseXw9CiGZPIr

**Events Configured:**

- `payment_intent.succeeded` - Payment completed successfully
- `payment_intent.payment_failed` - Payment failed
- `charge.succeeded` - Charge succeeded

---

## For Production (Vercel Deployment)

### Step 1: Create Webhook Endpoint in Stripe Dashboard ✅ COMPLETED

~~1. **Login to Stripe Dashboard**~~
~~- Go to: https://dashboard.stripe.com/webhooks~~
~~- Make sure you're in **Test mode** for testing~~

~~2. **Add Endpoint**~~
~~- Click "Add endpoint" button~~
~~- **Endpoint URL**: `https://lead-by-example-mvp.vercel.app/api/stripe/webhook`~~
~~- **Description**: "Lead By Example Production Webhook"~~

~~3. **Select Events to Listen**~~
~~Select these events (minimum required):~~
~~- `payment_intent.succeeded` - Payment completed successfully~~
~~- `payment_intent.payment_failed` - Payment failed~~
~~- `payment_intent.created` - Payment intent created~~
~~- `charge.succeeded` - Charge succeeded~~
~~- `charge.failed` - Charge failed~~

~~4. **Get Signing Secret**~~
~~- After creating the endpoint, click on it~~
~~- Reveal the "Signing secret" (starts with `whsec_`)~~
~~- Copy this secret~~

**✅ Webhook endpoint already created and configured!**

### Step 2: Update Vercel Environment Variable ✅ COMPLETED

~~Run this command in your terminal (replace `YOUR_WEBHOOK_SECRET` with the actual secret):~~

```powershell
# Already completed!
# vercel env rm STRIPE_WEBHOOK_SECRET production
# echo "whsec_3SuJNKA7BsUlbXZGk5dIeHvOeslYRXJb" | vercel env add STRIPE_WEBHOOK_SECRET production
```

**✅ Webhook secret successfully added to Vercel environment variables!**

Or use the Vercel Dashboard:

1. Go to: https://vercel.com/eric-hunter-petross-projects/lead-by-example-mvp/settings/environment-variables
2. Find `STRIPE_WEBHOOK_SECRET`
3. Edit the Production value
4. Paste your new webhook secret

### Step 3: Redeploy ✅ COMPLETED

~~After updating the environment variable:~~

```powershell
# Already deployed!
# vercel --prod
```

**✅ Production deployment completed successfully!**

- **Deployment URL**: <https://lead-by-example-l5y1le6zd-eric-hunter-petross-projects.vercel.app>
- **Inspect**: <https://vercel.com/eric-hunter-petross-projects/lead-by-example-mvp/2YvZ5bom5EXrNe1ZjtksTpQMU9n3>

---

## For Local Development (Already Configured)

Your local development is already set up with Stripe CLI:

```powershell
# Make sure Stripe CLI path is in your session
$env:Path += ";$env:LOCALAPPDATA\stripe"

# Start webhook listener (keep this running)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Your local webhook secret**: Already in `.env.local`

- `whsec_ac68a1b729c43862e8f0be946ed52dd270058f71019d9a48ad97c86be20a00fa`

---

## Testing Webhooks

### Test Local Webhooks:

```powershell
# In a separate terminal, trigger a test event
stripe trigger payment_intent.succeeded
```

### Test Production Webhooks:

1. Go to your Stripe webhook endpoint in the dashboard
2. Click "Send test webhook"
3. Select an event type
4. Check the webhook attempts/logs

---

## Webhook Event Handler

Your webhook handler is located at:
`src/pages/api/stripe/webhook.ts`

It currently handles:

- `payment_intent.succeeded` - Log successful payments
- `payment_intent.payment_failed` - Log failed payments

---

## Troubleshooting

### Webhook Not Receiving Events?

1. Check webhook secret matches in Vercel environment variables
2. Verify endpoint URL is correct in Stripe Dashboard
3. Check webhook logs in Stripe Dashboard for errors
4. Ensure API route exists: `/api/stripe/webhook`

### Local Testing Issues?

1. Make sure `stripe listen` is running
2. Check that webhook secret in `.env.local` matches CLI output
3. Restart dev server after updating `.env.local`

### Signature Verification Failing?

```typescript
// Make sure you're using the correct secret for each environment
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
```
