import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendContactSlackNotification } from "@/lib/slack";

// Validate required env vars at startup
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const CONTACT_CC_EMAIL = process.env.CONTACT_CC_EMAIL;
const CONTACT_BCC_EMAIL = process.env.CONTACT_BCC_EMAIL;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

type AudienceType = "founder" | "investor" | "partner" | "operator";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
  linkedin: string;
  audienceType: AudienceType;
  actionType?: string | null;
}

const AUDIENCE_LABELS: Record<AudienceType, string> = {
  founder: "Founder",
  investor: "Investor",
  partner: "Partner",
  operator: "Operator",
};

const ACTION_LABELS: Record<string, string> = {
  "request-materials": "Requesting investor materials",
  "schedule-call": "Requesting a diligence call",
  "apply-founder": "Applying as founder",
  "join-bench": "Joining operator bench",
  "partner-inquiry": "Partnership inquiry",
  "submit-problem": "Submitting a problem to co-solve",
};

// Validation limits
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_COMPANY = 160;
const MAX_LINKEDIN = 500;
const MAX_MESSAGE = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  // Check env configuration
  if (!resend || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form error: Missing required env vars (RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL)");
    return NextResponse.json(
      { success: false, error: "Email service not configured" },
      { status: 500 }
    );
  }

  try {
    const body: ContactPayload = await req.json();

    // Trim all fields
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    const company = (body.company || "").trim();
    const linkedin = (body.linkedin || "").trim();
    const audienceType = body.audienceType;
    const actionType = body.actionType;

    // Validation
    const errors: string[] = [];

    if (!name) errors.push("Name is required");
    else if (name.length > MAX_NAME) errors.push(`Name must be under ${MAX_NAME} characters`);

    if (!email) errors.push("Email is required");
    else if (email.length > MAX_EMAIL) errors.push(`Email must be under ${MAX_EMAIL} characters`);
    else if (!EMAIL_RE.test(email)) errors.push("Invalid email format");

    if (!message) errors.push("Message is required");
    else if (message.length > MAX_MESSAGE) errors.push(`Message must be under ${MAX_MESSAGE} characters`);

    if (!linkedin) errors.push("LinkedIn profile is required");
    else if (linkedin.length > MAX_LINKEDIN) errors.push(`LinkedIn URL must be under ${MAX_LINKEDIN} characters`);

    if (!audienceType || !AUDIENCE_LABELS[audienceType]) {
      errors.push("Invalid audience type");
    }

    if (company && company.length > MAX_COMPANY) {
      errors.push(`Company must be under ${MAX_COMPANY} characters`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(". ") },
        { status: 400 }
      );
    }

    const audienceLabel = AUDIENCE_LABELS[audienceType];
    const actionLabel = actionType ? ACTION_LABELS[actionType] : null;
    const submittedAt = new Date().toISOString();

    const subject = actionLabel
      ? `[${audienceLabel}] ${actionLabel} — ${escapeHtml(name)}`
      : `[${audienceLabel}] New inquiry from ${escapeHtml(name)}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 8px;">New Contact Intake</h2>
  <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9; width: 140px;">Type</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5;">${audienceLabel}</td>
    </tr>
    ${actionLabel ? `
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Action</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5;">${actionLabel}</td>
    </tr>` : ""}
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Name</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5;">${escapeHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Email</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5;"><a href="mailto:${escapeHtml(email)}" style="color: #0066cc;">${escapeHtml(email)}</a></td>
    </tr>
    ${company ? `
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Company</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5;">${escapeHtml(company)}</td>
    </tr>` : ""}
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">LinkedIn</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5;"><a href="${escapeHtml(linkedin)}" style="color: #0066cc;">${escapeHtml(linkedin)}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9; vertical-align: top;">Message</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; white-space: pre-wrap;">${escapeHtml(message)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">Submitted</td>
      <td style="padding: 10px 12px; border: 1px solid #e5e5e5; color: #666;">${submittedAt}</td>
    </tr>
  </table>
</body>
</html>`;

    const textContent = `
New Contact Intake
==================

Type: ${audienceLabel}
${actionLabel ? `Action: ${actionLabel}\n` : ""}
Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ""}LinkedIn: ${linkedin}

Message:
${message}

Submitted: ${submittedAt}
`.trim();

    // Send email and Slack notification in parallel
    // Email is required, Slack is optional (form succeeds even if Slack fails)
    const [emailResult, slackResult] = await Promise.allSettled([
      resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        cc: CONTACT_CC_EMAIL || undefined,
        bcc: CONTACT_BCC_EMAIL || undefined,
        replyTo: email,
        subject,
        html: htmlContent,
        text: textContent,
      }),
      sendContactSlackNotification({
        name,
        email,
        message,
        company: company || undefined,
        linkedin,
        audienceType,
        actionType,
        submittedAt,
      }),
    ]);

    // Check email result (required)
    if (emailResult.status === "rejected" ||
        (emailResult.status === "fulfilled" && emailResult.value.error)) {
      const error = emailResult.status === "rejected"
        ? emailResult.reason
        : emailResult.value.error;
      console.error("Resend API error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    // Log Slack result (optional - don't fail the request)
    if (slackResult.status === "rejected") {
      console.warn("Slack notification failed (non-blocking):", slackResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
