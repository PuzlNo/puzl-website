import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { navn, email, telefon, melding } = await request.json();

  if (!navn || !email || !melding) {
    return NextResponse.json({ error: "Manglende felt" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "E-post er ikke konfigurert" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_EMAIL ?? "hei@puzl.no";

  const { error } = await resend.emails.send({
    from: "Puzl <hei@puzl.no>",
    to,
    replyTo: email,
    subject: `Ny henvendelse fra puzl.no — ${navn}`,
    text: `Navn: ${navn}\nE-post: ${email}\nTelefon: ${telefon || "—"}\n\n${melding}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Kunne ikke sende meldingen" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
