// pages/api/contact.ts
//
// Sends the contact form via SMTP using nodemailer. Hostinger gives you
// SMTP credentials for any email on your domain (e.g. info@echolinksolutions.com)
// under hPanel → Emails → Connect Apps & Devices → SMTP settings — use
// those values for the env vars below.
//
// Requires: npm install nodemailer @types/nodemailer --save

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = { success: true } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Basic email format check — not exhaustive, just catches obvious typos.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL) {
    console.error(
      'Contact form SMTP env vars are not set — see .env.example. Message was NOT sent:',
      { name, email, company, message }
    );
    return res.status(500).json({
      error: 'The contact form is not fully configured yet. Please email us directly.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Echolink Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send contact form email:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
