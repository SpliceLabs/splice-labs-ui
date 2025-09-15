import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
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
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
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
      to: 'hello@splicelabs.com', // Replace with your actual email
      subject: `New Contact Form Submission from ${name}`,
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
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}