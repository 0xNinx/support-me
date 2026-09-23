export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const RESEND_API_URL = "https://api.resend.com/emails";

/**
 * Sends a transactional email through Resend's HTTP API when
 * `RESEND_API_KEY` is configured. Without it (local dev, CI), the message is
 * logged instead so the calling flow still runs end to end.
 *
 * Kept to a plain `fetch` so there's no SDK dependency to swap out if the
 * provider changes — only this function knows about Resend.
 */
export async function sendEmail(message: EmailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`Email (not sent, RESEND_API_KEY unset) to ${message.to}: ${message.subject}`);
    return;
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "SupportMe <notifications@supportme.app>",
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Email provider responded ${response.status}: ${body}`);
  }
}
