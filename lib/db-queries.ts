/**
 * Database Query Helpers
 *
 * Common database operations and utilities for the application.
 */

import { Donation, Event, EventRegistration, Newsletter, User } from '@prisma/client';
import { db } from './db';

// ============================================================================
// DONATIONS
// ============================================================================

export const donationQueries = {
  /**
   * Create or update a donation record
   */
  async saveDonation(data: {
    stripePaymentIntentId: string;
    amount: number;
    currency: string;
    donorName?: string;
    donorEmail?: string;
    userId?: string;
    campaign?: string;
    eventId?: string;
    metadata?: Record<string, any>;
  }): Promise<Donation> {
    return db.donation.upsert({
      where: { stripePaymentIntentId: data.stripePaymentIntentId },
      create: {
        stripePaymentIntentId: data.stripePaymentIntentId,
        amount: data.amount,
        currency: data.currency,
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        userId: data.userId,
        campaign: data.campaign,
        eventId: data.eventId,
        metadata: data.metadata,
        status: 'completed',
      },
      update: {
        status: 'completed',
        updatedAt: new Date(),
      },
    });
  },

  /**
   * Get donation by Stripe Payment Intent ID
   */
  async getByStripeId(stripePaymentIntentId: string): Promise<Donation | null> {
    return db.donation.findUnique({
      where: { stripePaymentIntentId },
    });
  },

  /**
   * Get all donations for a user
   */
  async getUserDonations(userId: string): Promise<Donation[]> {
    return db.donation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Get donation statistics
   */
  async getStats(period?: { startDate: Date; endDate: Date }) {
    const where =
      period && period.startDate && period.endDate
        ? {
            createdAt: {
              gte: period.startDate,
              lte: period.endDate,
            },
            status: 'completed',
          }
        : {
            status: 'completed',
          };

    const donations = await db.donation.findMany({ where });

    return {
      totalDonations: donations.length,
      totalAmount: donations.reduce((sum, d) => sum + Number(d.amount), 0),
      averageDonation:
        donations.length > 0 ? donations.reduce((sum, d) => sum + Number(d.amount), 0) / donations.length : 0,
      topCampaign: getTopCampaign(donations),
    };
  },

  /**
   * Mark donation as refunded
   */
  async refundDonation(stripePaymentIntentId: string, refundAmount: number): Promise<Donation> {
    return db.donation.update({
      where: { stripePaymentIntentId },
      data: {
        status: 'refunded',
        amount: refundAmount,
        updatedAt: new Date(),
      },
    });
  },
};

// ============================================================================
// USERS
// ============================================================================

export const userQueries = {
  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
      where: { email },
    });
  },

  /**
   * Create new user
   */
  async create(data: {
    email: string;
    name?: string;
    password?: string;
  }): Promise<User> {
    return db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  },

  /**
   * Get user with related data
   */
  async getWithRelations(userId: string) {
    return db.user.findUnique({
      where: { id: userId },
      include: {
        donations: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        eventRegistrations: {
          orderBy: { registeredAt: 'desc' },
        },
        newsletter: true,
      },
    });
  },
};

// ============================================================================
// EVENTS
// ============================================================================

export const eventQueries = {
  /**
   * Get event by slug
   */
  async getBySlug(slug: string) {
    return db.event.findUnique({
      where: { slug },
      include: {
        registrations: {
          where: { status: { not: 'cancelled' } },
        },
        donations: {
          where: { status: 'completed' },
        },
      },
    });
  },

  /**
   * Get upcoming events
   */
  async getUpcoming(limit?: number) {
    return db.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: 'asc',
      },
      take: limit || 10,
    });
  },

  /**
   * Register user for event
   */
  async registerUserForEvent(userId: string, eventId: string): Promise<EventRegistration> {
    return db.eventRegistration.create({
      data: {
        userId,
        eventId,
      },
    });
  },

  /**
   * Get event registrations
   */
  async getRegistrations(eventId: string) {
    return db.eventRegistration.findMany({
      where: {
        eventId,
        status: { not: 'cancelled' },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },
};

// ============================================================================
// NEWSLETTER
// ============================================================================

export const newsletterQueries = {
  /**
   * Subscribe email to newsletter
   */
  async subscribe(
    email: string,
    options?: {
      userId?: string;
      frequency?: string;
      interests?: string[];
    },
  ): Promise<Newsletter> {
    return db.newsletter.upsert({
      where: { email },
      create: {
        email,
        userId: options?.userId,
        frequency: options?.frequency || 'weekly',
        interests: options?.interests || ['general'],
        subscribed: true,
        verifiedAt: new Date(),
      },
      update: {
        subscribed: true,
        verifiedAt: new Date(),
      },
    });
  },

  /**
   * Unsubscribe email from newsletter
   */
  async unsubscribe(email: string): Promise<Newsletter> {
    return db.newsletter.update({
      where: { email },
      data: {
        subscribed: false,
        unsubscribedAt: new Date(),
      },
    });
  },

  /**
   * Get all active subscribers
   */
  async getActiveSubscribers() {
    return db.newsletter.findMany({
      where: { subscribed: true },
    });
  },

  /**
   * Check if email is subscribed
   */
  async isSubscribed(email: string): Promise<boolean> {
    const subscriber = await db.newsletter.findUnique({
      where: { email },
    });
    return subscriber?.subscribed ?? false;
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the campaign with the most donations
 */
function getTopCampaign(donations: Donation[]): string | null {
  const campaigns: Record<string, number> = {};

  donations.forEach((d) => {
    if (d.campaign) {
      campaigns[d.campaign] = (campaigns[d.campaign] || 0) + 1;
    }
  });

  const topCampaign = Object.entries(campaigns).sort(([, a], [, b]) => b - a)[0];
  return topCampaign ? topCampaign[0] : null;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Get date range for analytics
 */
export function getDateRange(period: 'today' | 'week' | 'month' | 'year'): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
  }

  return { startDate, endDate };
}
