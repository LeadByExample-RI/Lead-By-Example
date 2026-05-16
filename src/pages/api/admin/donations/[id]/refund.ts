import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-10-29.clover', typescript: true });

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  const { amount } = req.body;

  const donation = await db.donation.findUnique({ where: { id: id as string } });
  if (!donation) return res.status(404).json({ error: 'Donation not found' });
  if (donation.status === 'refunded') return res.status(400).json({ error: 'Already refunded' });

  const refundAmount = amount ? Math.round(Number(amount) * 100) : undefined;

  const refund = await stripe.refunds.create({
    payment_intent: donation.stripePaymentIntentId,
    ...(refundAmount ? { amount: refundAmount } : {}),
  });

  await db.donation.update({
    where: { id: id as string },
    data: {
      status: 'refunded',
      refundedAmount: refund.amount / 100,
      updatedAt: new Date(),
    },
  });

  return res.status(200).json({ success: true, refundId: refund.id });
};

export default withAdminAuth(handler);
