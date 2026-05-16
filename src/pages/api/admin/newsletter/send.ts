import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth, AdminHandler } from '@/lib/admin-auth';
import { sendNewsletter } from '@/lib/email-service';

const handler: AdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { subject, html, filters } = req.body;

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return res.status(400).json({ error: 'Subject is required' });
  }
  if (!html || typeof html !== 'string' || html.trim().length === 0) {
    return res.status(400).json({ error: 'HTML content is required' });
  }

  const result = await sendNewsletter({ subject: subject.trim(), html, filters });

  return res.status(result.success ? 200 : 500).json(result);
};

export default withAdminAuth(handler);
