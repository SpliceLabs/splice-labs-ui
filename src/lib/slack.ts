import { WebClient } from "@slack/web-api";

// Environment configuration
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CONTACT_CHANNEL_ID = process.env.SLACK_CONTACT_CHANNEL_ID;

// Initialize Slack client only if token is available
const slack = SLACK_BOT_TOKEN ? new WebClient(SLACK_BOT_TOKEN) : null;

export interface ContactSlackPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
  linkedin?: string;
  audienceType: string;
  actionType?: string | null;
  submittedAt: string;
}

const AUDIENCE_EMOJI: Record<string, string> = {
  founder: ":rocket:",
  investor: ":chart_with_upwards_trend:",
  partner: ":handshake:",
  operator: ":hammer_and_wrench:",
};

/**
 * Check if Slack notifications are configured
 */
export function isSlackConfigured(): boolean {
  return !!(slack && SLACK_CONTACT_CHANNEL_ID);
}

/**
 * Send a contact form submission notification to Slack
 * Returns true on success, false on failure (does not throw)
 */
export async function sendContactSlackNotification(
  payload: ContactSlackPayload
): Promise<boolean> {
  if (!slack || !SLACK_CONTACT_CHANNEL_ID) {
    console.warn("Slack notification skipped: SLACK_BOT_TOKEN or SLACK_CONTACT_CHANNEL_ID not configured");
    return false;
  }

  const { name, email, message, company, linkedin, audienceType, actionType, submittedAt } = payload;

  const emoji = AUDIENCE_EMOJI[audienceType] || ":email:";
  const audienceLabel = audienceType.charAt(0).toUpperCase() + audienceType.slice(1);

  // Build fields for the Slack message
  const fields: { type: "mrkdwn"; text: string }[] = [
    { type: "mrkdwn", text: `*Name:*\n${escapeSlackText(name)}` },
    { type: "mrkdwn", text: `*Email:*\n<mailto:${escapeSlackText(email)}|${escapeSlackText(email)}>` },
  ];

  if (company) {
    fields.push({ type: "mrkdwn", text: `*Company:*\n${escapeSlackText(company)}` });
  }

  if (linkedin) {
    fields.push({ type: "mrkdwn", text: `*LinkedIn:*\n<${escapeSlackText(linkedin)}|Profile>` });
  }

  fields.push({ type: "mrkdwn", text: `*Type:*\n${audienceLabel}` });

  if (actionType) {
    const actionLabels: Record<string, string> = {
      "request-materials": "Request Materials",
      "schedule-call": "Schedule Call",
      "apply-founder": "Apply as Founder",
      "join-bench": "Join Operator Bench",
      "partner-inquiry": "Partnership Inquiry",
      "submit-problem": "Submit Problem",
    };
    fields.push({ type: "mrkdwn", text: `*Action:*\n${actionLabels[actionType] || actionType}` });
  }

  // Build Block Kit message
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${emoji} New Contact: ${name}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: fields.slice(0, 10), // Slack limits to 10 fields per section
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Message:*\n${escapeSlackText(message)}`,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Submitted: ${new Date(submittedAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "America/Los_Angeles"
          })} PT`,
        },
      ],
    },
    {
      type: "divider",
    },
  ];

  try {
    await slack.chat.postMessage({
      channel: SLACK_CONTACT_CHANNEL_ID,
      text: `New contact form submission from ${name} (${email})`, // Fallback for notifications
      blocks,
      unfurl_links: false,
      unfurl_media: false,
    });

    console.log("Slack notification sent successfully", { name, email, audienceType });
    return true;
  } catch (error) {
    console.error("Failed to send Slack notification:", error);
    return false;
  }
}

/**
 * Escape special characters for Slack mrkdwn format
 */
function escapeSlackText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
