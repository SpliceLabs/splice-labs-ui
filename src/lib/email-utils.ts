import { emailService, EmailOptions } from './email';

export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  return emailService.sendEmail({
    to,
    subject: 'Welcome to Splice Labs!',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining Splice Labs. We're excited to have you aboard!</p>
      <p>Best regards,<br>The Splice Labs Team</p>
    `,
  });
}

export async function sendNotificationEmail(to: string, title: string, message: string): Promise<boolean> {
  return emailService.sendEmail({
    to,
    subject: title,
    html: `
      <h2>${title}</h2>
      <p>${message}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated message from Splice Labs.</p>
    `,
  });
}

export async function sendCustomEmail(options: EmailOptions): Promise<boolean> {
  return emailService.sendEmail(options);
}