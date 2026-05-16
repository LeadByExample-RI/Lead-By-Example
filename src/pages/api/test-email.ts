import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// DEV ONLY — remove before production
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Not found' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEXT_PUBLIC_EMAIL_FROM || 'onboarding@resend.dev';
  const to = process.env.DEVELOPER_EMAIL || 'fallback@example.com';

  console.log('📧 test-email: apiKey present?', !!apiKey, '| from:', from, '| to:', to);

  if (!apiKey) {
    return res.status(200).json({ success: false, error: 'RESEND_API_KEY is not set' });
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: '[TEST] Lead By Example Email Check',
    html: '<p>This is a test email from the Lead By Example dev environment.</p>',
  });

  console.log('📧 test-email result:', { data, error });

  return res.status(200).json({ success: !error, data, error });
}
