import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

// CRITICAL: Disable Next.js body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Webhook handler for Stripe events
 * This endpoint receives notifications from Stripe about payment events
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get raw body for signature verification
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  // Validate signature header exists
  if (!sig) {
    console.error('❌ Missing Stripe signature header');
    return res.status(400).json({ error: 'Missing signature header' });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature to ensure request is from Stripe
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    console.log('✅ Webhook signature verified:', event.type);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).json({
      error: 'Webhook signature verification failed',
      message: err.message,
    });
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.created':
        console.log('💰 Payment intent created:', event.data.object.id);
        break;

      case 'payment_intent.processing':
        console.log('⏳ Payment processing:', event.data.object.id);
        break;

      case 'charge.succeeded':
        console.log('✅ Charge succeeded:', event.data.object.id);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`ℹ️  Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt of event
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('❌ Error processing webhook:', err.message);
    res.status(500).json({
      error: 'Webhook processing failed',
      message: err.message,
    });
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const amount = paymentIntent.amount / 100; // Convert cents to dollars
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

  // TODO: Update your database with successful donation
  // Example implementations:

  // 1. Update total raised amount
  // await updateCampaignTotal(campaign, amount);

  // 2. Save donation record
  // await saveDonationRecord({
  //   paymentIntentId: paymentIntent.id,
  //   amount,
  //   donorName,
  //   donorEmail,
  //   campaign,
  //   timestamp: new Date(),
  // });

  // 3. Send thank you email (if not using Stripe's receipt_email)
  // await sendThankYouEmail(donorEmail, donorName, amount);

  // 4. Update leaderboard or donor wall
  // await updateDonorWall(donorName, amount);

  // 5. Trigger notification to team
  // await notifyTeam(`New donation: $${amount} from ${donorName}`);

  // For now, just log the success
  console.log('📊 Donation logged successfully');
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const amount = paymentIntent.amount / 100;
  const donorEmail = paymentIntent.metadata.donorEmail;
  const errorMessage = paymentIntent.last_payment_error?.message;

  console.error('❌ Payment failed:', {
    id: paymentIntent.id,
    amount: `$${amount.toFixed(2)}`,
    email: donorEmail,
    reason: errorMessage || 'Unknown error',
    timestamp: new Date().toISOString(),
  });

  // TODO: Optional - send failure notification
  // await sendPaymentFailureEmail(donorEmail, errorMessage);

  // Log for analytics
  console.log('📊 Failed payment logged for analysis');
}

/**
 * Handle refund
 */
async function handleRefund(charge: Stripe.Charge) {
  const amount = charge.amount / 100;
  const refundAmount = charge.amount_refunded / 100;

  console.log('↩️  Refund processed:', {
    chargeId: charge.id,
    originalAmount: `$${amount.toFixed(2)}`,
    refundedAmount: `$${refundAmount.toFixed(2)}`,
    timestamp: new Date().toISOString(),
  });

  // TODO: Update database to reflect refund
  // await processRefund(charge.id, refundAmount);

  console.log('📊 Refund logged successfully');
}

/**
 * Helper function to validate webhook secret is configured
 */
export function validateWebhookConfig(): boolean {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !webhookSecret.startsWith('whsec_')) {
    console.error('❌ Invalid or missing STRIPE_WEBHOOK_SECRET');
    return false;
  }

  console.log('✅ Webhook configuration valid');
  return true;
}
