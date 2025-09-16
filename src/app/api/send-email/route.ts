import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// HTML escape function for security
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message' },
        { status: 400 }
      );
    }

    // Email to your team
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
      <hr>
      <p><small>This message was sent from the Splice Labs contact form.</small></p>
    `;

    const emailText = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      
      Message:
      ${message}
      
      This message was sent from the Splice Labs contact form.
    `;

    const success = await emailService.sendEmail({
      to: ['hello@splicelabs.xyz'],
      subject: `New Contact Form Submission from ${escapeHtml(name)}`,
      text: emailText,
      html: emailHtml,
    });

    if (success) {
      return NextResponse.json({ message: 'Message sent successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
