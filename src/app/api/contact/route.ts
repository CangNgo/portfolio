import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  subject: z.string().trim().max(300).optional(),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
