import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

// Rate limiting helper (optional but recommended)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests',
    });
  }

  // Get client IP for rate limiting
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    'unknown';

  // Check rate limit
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please wait a moment before trying again',
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
      statement_descriptor_suffix: 'DONATION',
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
  } catch (error: any) {
    console.error('❌ Payment intent error:', {
      message: error.message,
      type: error.type,
      code: error.code,
      timestamp: new Date().toISOString(),
    });

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({
        error: 'Card error',
        message: error.message,
      });
    }

    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Payment information is invalid',
      });
    }

    if (error.type === 'StripeAPIError') {
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
