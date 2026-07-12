"use client";

import { useState, type FormEvent } from "react";
import SectionEyebrow from "./SectionEyebrow";

const fieldClass =
  "border-b border-[var(--ink-25)] bg-transparent px-1 py-2.5 text-[15px] outline-none placeholder:text-[var(--ink-25)] focus:border-[var(--thread)] transition-colors";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      navn: data.get("navn"),
      email: data.get("email"),
      telefon: data.get("telefon"),
      melding: data.get("melding"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error ?? "Noe gikk galt");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    }
  }

  return (
    <section id="kontakt" className="px-6 py-28">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          <SectionEyebrow label="Kontakt" />
          <h2 className="mt-4 text-[36px] font-semibold sm:text-[44px]">
            La oss ta en kaffe ☕
          </h2>
          <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--ink-45)]">
            Ta kontakt så finner vi ut om vi er riktig match for det du prøver å bygge.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:hei@puzl.no"
              className="stitch-link flex w-fit items-center gap-2.5 text-[15px] text-[var(--ink-70)] hover:text-ink transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              hei@puzl.no
            </a>
            <a
              href="https://linkedin.com/company/puzl"
              target="_blank"
              rel="noopener noreferrer"
              className="stitch-link flex w-fit items-center gap-2.5 text-[15px] text-[var(--ink-70)] hover:text-ink transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-45)]">
            Vi svarer normalt innen 1–2 virkedager
          </p>
        </div>

        <div className="border border-[var(--line)] p-8 sm:p-10">
          {status === "success" ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">Mottatt</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink">
                Takk for din henvendelse! Vi tar kontakt så snart som mulig.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-45)]">Navn</span>
                  <input name="navn" required placeholder="Ola Nordmann" className={fieldClass} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-45)]">E-post</span>
                  <input name="email" type="email" required placeholder="ola@bedrift.no" className={fieldClass} />
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-45)]">Telefon (valgfritt)</span>
                <input name="telefon" placeholder="+47 000 00 000" className={fieldClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-45)]">Melding</span>
                <textarea
                  name="melding"
                  required
                  rows={5}
                  placeholder="Fortell oss hva du prøver å bygge"
                  className={`resize-none ${fieldClass}`}
                />
              </label>

              <p className="text-[12.5px] leading-[1.5] text-[var(--ink-25)]">
                Vi bruker kun opplysningene dine til å svare på din henvendelse. Ingen
                nyhetsbrev, ingen deling med tredjepart.
              </p>

              {status === "error" && (
                <p className="text-[13.5px] text-[var(--error)]">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 self-start rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-[var(--thread)] disabled:opacity-50"
              >
                {status === "loading" ? "Sender..." : "Send melding"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
