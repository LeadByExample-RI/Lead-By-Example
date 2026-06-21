/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests',
    });
  }

  try {
    const { amount, donorName, donorEmail } = req.body;

    // Comprehensive validation
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be a valid number',
      });
    }

    if (amount < 1) {
      return res.status(400).json({
        error: 'Amount too low',
        message: 'Minimum donation is $1.00',
      });
    }

    if (amount > 999999) {
      return res.status(400).json({
        error: 'Amount too high',
        message: 'Maximum donation is $999,999.00',
      });
    }

    if (!donorEmail || typeof donorEmail !== 'string') {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Valid email address is required',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorEmail)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address',
      });
    }

    // Sanitize donor name
    const sanitizedName =
      donorName && typeof donorName === 'string' ? donorName.trim().slice(0, 100) : 'Anonymous';

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency: 'usd',

      // Metadata for record keeping
      metadata: {
        donorName: sanitizedName,
        donorEmail: donorEmail.toLowerCase().trim(),
        campaign: 'All Sides of Town Cookout 2025',
        organization: 'Lead By Example',
        campaignGoal: '10000',
        timestamp: new Date().toISOString(),
      },

      // Description for Stripe Dashboard and receipts
      description: `Donation to Lead By Example - All Sides of Town Cookout 2025`,

      // Automatically send receipt email
      receipt_email: donorEmail.toLowerCase().trim(),

      // Statement descriptor (appears on credit card statement)
      statement_descriptor: 'LEAD BY EXAMPLE',
      statement_descriptor_suffix: 'DON',
    });

    // Log successful payment intent creation
    console.log('✅ Payment intent created:', {
      id: paymentIntent.id,
      amount: amount,
      donor: sanitizedName,
      email: donorEmail,
      timestamp: new Date().toISOString(),
    });

    // Return client secret for frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('❌ Payment intent error:', {
      message: err.message,
      type: (error as Record<string, unknown>).type,
      code: (error as Record<string, unknown>).code,
      timestamp: new Date().toISOString(),
    });

    // Handle specific Stripe errors
    if ((error as Record<string, unknown>).type === 'StripeCardError') {
      return res.status(400).json({
        error: 'Card error',
        message: err.message,
      });
    }

    if ((error as Record<string, unknown>).type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Payment information is invalid',
      });
    }

    if ((error as Record<string, unknown>).type === 'StripeAPIError') {
      return res.status(500).json({
        error: 'Payment service error',
        message: 'Unable to process payment at this time',
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Payment processing failed',
      message: 'An unexpected error occurred. Please try again.',
    });
  }
}
