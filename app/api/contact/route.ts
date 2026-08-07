import { Resend } from "resend";
import { NextResponse } from "next/server";
import { checkRateLimit, clientKey, type RateLimitRule } from "@/lib/rate-limit";

/**
 * Contact form endpoint.
 *
 * Shared by the human form in `components/Contact.tsx` and the
 * `submit_contact_form` WebMCP tool — both post the identical payload here, so
 * every check below applies to agent submissions too. There is deliberately no
 * separate agent path and no bypass.
 */

/** Sending email is a side effect; never let this be prerendered or cached. */
export const dynamic = "force-dynamic";

const LIMITS = {
  navn: 100,
  email: 200,
  telefon: 40,
  melding: 5000,
} as const;

/** Guards against oversized bodies before we spend effort parsing them. */
const MAX_BODY_BYTES = 16_000;

const RATE_LIMIT_RULES: RateLimitRule[] = [
  // Burst: a human sends one message, not three in a minute.
  { windowMs: 60_000, max: 2 },
  // Sustained: caps how much a single source can send while unattended.
  { windowMs: 60 * 60_000, max: 5 },
];

/**
 * Pragmatic email shape check: one @, no whitespace, a dotted domain. Not
 * RFC 5322 — the authoritative test is whether Puzl's reply arrives, and
 * over-strict patterns reject valid addresses.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Rejects CR/LF and other control characters in values interpolated into the
 * email subject and Reply-To header - the header-injection vector. Ordinary
 * spaces are allowed, since names contain them.
 */
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

type Field = keyof typeof LIMITS;

function readField(body: Record<string, unknown>, field: Field): string | null {
  const value = body[field];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  return value.trim();
}

export async function POST(request: Request) {
  const { allowed, retryAfter } = checkRateLimit(clientKey(request), RATE_LIMIT_RULES);
  if (!allowed) {
    return NextResponse.json(
      { error: "For mange henvendelser. Prøv igjen om litt." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Meldingen er for stor" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw: unknown = await request.json();
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
    }
    body = raw as Record<string, unknown>;
  } catch {
    // Previously an unhandled throw here surfaced as an opaque 500.
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  const navn = readField(body, "navn");
  const email = readField(body, "email");
  const telefon = readField(body, "telefon");
  const melding = readField(body, "melding");

  if (navn === null || email === null || telefon === null || melding === null) {
    return NextResponse.json({ error: "Ugyldig format på feltene" }, { status: 400 });
  }

  if (!navn || !email || !melding) {
    return NextResponse.json({ error: "Manglende felt" }, { status: 400 });
  }

  for (const [field, value] of Object.entries({ navn, email, telefon, melding })) {
    if (value.length > LIMITS[field as Field]) {
      return NextResponse.json(
        { error: `Feltet «${field}» er for langt` },
        { status: 400 }
      );
    }
  }

  // No minimum message length: the human form has never enforced one, and a
  // terse "Ring meg" is a legitimate enquiry. The agent-facing JSON Schema asks
  // for a fuller message, but that is guidance for the model, not a gate here.
  if (!EMAIL_PATTERN.test(email) || CONTROL_CHARS.test(email)) {
    return NextResponse.json({ error: "Ugyldig e-postadresse" }, { status: 400 });
  }

  if (CONTROL_CHARS.test(navn)) {
    return NextResponse.json({ error: "Ugyldig navn" }, { status: 400 });
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
