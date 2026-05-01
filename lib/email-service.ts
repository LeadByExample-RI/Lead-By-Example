/**
 * Email Service
 *
 * Handles sending emails using Resend API.
 * All email sending goes through this service.
 */

import { Resend } from 'resend';
import { db } from './db';
import DonationReceiptEmail from '@/emails/DonationReceiptEmail';
import WelcomeEmail from '@/emails/WelcomeEmail';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send email via Resend
 */
async function sendEmail(options: SendEmailOptions) {
  try {
    // Validate email configuration
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured');
      return { success: false, error: 'Email service not configured' };
    }

    // Send email
    const response = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'noreply@leadbyexample.org',
      to: options.to,
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo || process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    });

    if (response.error) {
      console.error('❌ Email send failed:', response.error);
      return { success: false, error: response.error };
    }

    // Log email send
    await logEmailSend({
      recipient: options.to,
      subject: options.subject,
      status: 'sent',
      emailType: 'transactional',
    });

    console.log('✅ Email sent:', { to: options.to, subject: options.subject });
    return { success: true, messageId: response.data?.id };
  } catch (error: any) {
    console.error('❌ Email send error:', error);

    // Log email failure
    await logEmailSend({
      recipient: options.to,
      subject: options.subject,
      status: 'failed',
      emailType: 'transactional',
      failureReason: error.message,
    });

    return { success: false, error: error.message };
  }
}

/**
 * Send donation receipt email
 */
export async function sendDonationReceipt(data: {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency?: string;
  campaign?: string;
  transactionId: string;
  message?: string;
}) {
  try {
    const html = DonationReceiptEmail({
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      amount: data.amount,
      currency: data.currency || 'USD',
      campaign: data.campaign,
      transactionId: data.transactionId,
      message: data.message,
    }) as any as string;

    return await sendEmail({
      to: data.donorEmail,
      subject: `Donation Receipt - Lead By Example ($${data.amount.toFixed(2)})`,
      html: html,
      replyTo: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    });
  } catch (error: any) {
    console.error('❌ Failed to send donation receipt:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(data: {
  email: string;
  name?: string;
}) {
  try {
    const html = WelcomeEmail({
      email: data.email,
      name: data.name,
    }) as any as string;

    return await sendEmail({
      to: data.email,
      subject: 'Welcome to Lead By Example',
      html: html,
    });
  } catch (error: any) {
    console.error('❌ Failed to send welcome email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send newsletter confirmation email
 */
export async function sendNewsletterConfirmation(email: string) {
  return await sendEmail({
    to: email,
    subject: 'Newsletter Subscription Confirmed',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Welcome to Our Newsletter</h2>
            <p>Thank you for subscribing to Lead By Example's newsletter!</p>
            <p>You'll now receive updates about:</p>
            <ul>
              <li>Upcoming events</li>
              <li>Success stories from our mentorship program</li>
              <li>Ways you can get involved</li>
              <li>Impact reports</li>
            </ul>
            <p>We're excited to share our mission with you.</p>
            <hr style="border: none; border-top: 1px solid #ccc; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              © 2024 Lead By Example Initiative. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send event registration confirmation
 */
export async function sendEventRegistrationConfirmation(data: {
  email: string;
  name?: string;
  eventTitle: string;
  eventDate: Date;
  eventLocation?: string;
}) {
  const eventDate = new Date(data.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return await sendEmail({
    to: data.email,
    subject: `Event Registration Confirmed - ${data.eventTitle}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Event Registration Confirmed</h2>
            <p>Hi ${data.name || 'there'},</p>
            <p>Your registration for the following event has been confirmed:</p>
            
            <div style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0; border-radius: 4px;">
              <strong style="font-size: 18px;">${data.eventTitle}</strong><br>
              📅 ${eventDate}<br>
              ${data.eventLocation ? `📍 ${data.eventLocation}<br>` : ''}
            </div>
            
            <p>We look forward to seeing you there!</p>
            <p>If you have any questions, please contact us at ${process.env.NEXT_PUBLIC_CONTACT_EMAIL}.</p>
            
            <hr style="border: none; border-top: 1px solid #ccc; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              © 2024 Lead By Example Initiative. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Log email send for auditing
 */
async function logEmailSend(data: {
  recipient: string;
  subject: string;
  emailType: string;
  status: string;
  failureReason?: string;
}) {
  try {
    await db.emailLog.create({
      data: {
        recipient: data.recipient,
        subject: data.subject,
        emailType: data.emailType,
        status: data.status,
        failureReason: data.failureReason,
        sentAt: data.status === 'sent' ? new Date() : null,
      },
    });
  } catch (error) {
    console.error('❌ Failed to log email:', error);
    // Don't throw - logging failure shouldn't block email sending
  }
}

/**
 * Bulk send newsletter (admin only)
 */
export async function sendNewsletter(data: {
  subject: string;
  html: string;
  filters?: {
    frequency?: string;
    interests?: string[];
  };
}) {
  try {
    // Get active subscribers
    let subscribers = await db.newsletter.findMany({
      where: {
        subscribed: true,
      },
    });

    // Apply filters if provided
    if (data.filters?.frequency) {
      subscribers = subscribers.filter((sub) => sub.frequency === data.filters?.frequency);
    }

    if (data.filters?.interests && data.filters.interests.length > 0) {
      subscribers = subscribers.filter((sub) =>
        data.filters?.interests?.some((interest) => sub.interests.includes(interest)),
      );
    }

    console.log(`📧 Sending newsletter to ${subscribers.length} subscribers`);

    // Send emails (in batches to avoid rate limiting)
    const batchSize = 50;
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const results = await Promise.all(
        batch.map((subscriber) =>
          sendEmail({
            to: subscriber.email,
            subject: data.subject,
            html: data.html,
          }),
        ),
      );

      results.forEach((result) => {
        if (result.success) successCount++;
        else failureCount++;
      });

      // Wait between batches to avoid rate limiting
      if (i + batchSize < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Newsletter sent: ${successCount} success, ${failureCount} failures`);

    return {
      success: failureCount === 0,
      totalSent: subscribers.length,
      successCount,
      failureCount,
    };
  } catch (error: any) {
    console.error('❌ Newsletter send failed:', error);
    return { success: false, error: error.message };
  }
}

export default {
  sendEmail,
  sendDonationReceipt,
  sendWelcomeEmail,
  sendNewsletterConfirmation,
  sendEventRegistrationConfirmation,
  sendNewsletter,
};
