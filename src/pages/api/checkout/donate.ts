import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

const donateCheckoutSchema = z.object({
  amount: z.number().finite().positive(),
  email: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  name: z.string().trim().optional().default(''),
  anonymous: z.boolean().optional().default(false),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return res.status(500).json({ error: 'Base URL is not configured' });
  }

  const parsed = donateCheckoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid request body',
      details: parsed.error.flatten(),
    });
  }

  const { amount, email, name, anonymous } = parsed.data;
  const amountInCents = Math.round(amount * 100);

  if (amountInCents < 1) {
    return res.status(400).json({
      error: 'Invalid amount',
      message: 'Donation amount must be at least $0.01',
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Lead By Example Donation',
              description: anonymous ? 'Anonymous Donation' : `Donation from ${name || 'Supporter'}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
    });

    if (!session.url) {
      return res.status(500).json({ error: 'Unable to create checkout session' });
    }

    return res.status(200).json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return res.status(500).json({ error: message });
  }
}
