import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { sendEmail } from '@/lib/email-service';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['general', 'volunteer', 'mentor', 'media', 'other']).default('general'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message });
    }

    const { name, email, subject, message, type } = result.data;

    const typeLabels: Record<string, string> = {
      general: 'General Inquiry',
      volunteer: 'Volunteer Interest',
      mentor: 'Mentor Application',
      media: 'Media / Press',
      other: 'Other',
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
    const safeType = escapeHtml(typeLabels[type]);

    const recipientResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'contact@leadbyexample.org',
      subject: `[${typeLabels[type]}] ${subject}`,
      html: `
        <html><body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #01514C;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Type:</td><td style="padding: 8px;">${safeType}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${safeName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${encodeURIComponent(email)}">${safeEmail}</a></td></tr>
              <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${safeSubject}</td></tr>
            </table>
            <div style="background: #f0f9ff; padding: 16px; border-left: 4px solid #01514C; border-radius: 4px;">
              <strong>Message:</strong><br><br>
              ${safeMessage}
            </div>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #ccc;">
            <p style="font-size: 12px; color: #666;">Sent via leadbyexample.org contact form</p>
          </div>
        </body></html>
      `,
      replyTo: email,
    });

    if (!recipientResult.success) {
      return res.status(502).json({ error: recipientResult.error || 'Failed to send message' });
    }

    const replyResult = await sendEmail({
      to: email,
      subject: 'We received your message — Lead By Example',
      html: `
        <html><body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #01514C;">Thank you, ${safeName}!</h2>
            <p>We've received your message and will respond within 1-2 business days.</p>
            <div style="background: #f0f9ff; padding: 16px; border-left: 4px solid #01514C; border-radius: 4px; margin: 16px 0;">
              <strong>Your message:</strong><br><br>
              ${safeMessage}
            </div>
            <p>In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_APP_URL}/events">upcoming events</a> or learn more about our <a href="${process.env.NEXT_PUBLIC_APP_URL}/#mission">mission</a>.</p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #ccc;">
            <p style="font-size: 12px; color: #666;">© 2024 Lead By Example Initiative. All rights reserved.</p>
          </div>
        </body></html>
      `,
    });

    if (!replyResult.success) {
      return res.status(502).json({ error: replyResult.error || 'Failed to send confirmation email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form processing failed:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
