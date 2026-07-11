"use client";

import { useState, type FormEvent } from "react";

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
          <p className="text-[13px] font-medium tracking-wide text-[var(--cyan)]">Kontakt</p>
          <h2 className="mt-3 text-[36px] font-semibold sm:text-[44px]">
            La oss ta en kaffe ☕
          </h2>
          <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--w45)]">
            Ta kontakt så finner vi ut om vi er riktig match for det du prøver å bygge.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:hei@puzl.no"
              className="flex items-center gap-2.5 text-[15px] text-[var(--w70)] hover:text-[var(--w100)] transition-colors"
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
              className="flex items-center gap-2.5 text-[15px] text-[var(--w70)] hover:text-[var(--w100)] transition-colors"
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
        </div>

        <div>
          {status === "success" ? (
            <div className="rounded-2xl border border-[var(--cbrd)] bg-[var(--cdim)] p-8 text-[15px] leading-[1.6] text-[var(--w100)]">
              Takk for din henvendelse! Vi tar kontakt så snart som mulig.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="navn"
                  required
                  placeholder="Navn"
                  className="rounded-xl border border-[var(--w12)] bg-[var(--bg-2)] px-4 py-3 text-[14.5px] outline-none placeholder:text-[var(--w25)] focus:border-[var(--cyan)]"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="E-post"
                  className="rounded-xl border border-[var(--w12)] bg-[var(--bg-2)] px-4 py-3 text-[14.5px] outline-none placeholder:text-[var(--w25)] focus:border-[var(--cyan)]"
                />
              </div>
              <input
                name="telefon"
                placeholder="Telefon (valgfritt)"
                className="rounded-xl border border-[var(--w12)] bg-[var(--bg-2)] px-4 py-3 text-[14.5px] outline-none placeholder:text-[var(--w25)] focus:border-[var(--cyan)]"
              />
              <textarea
                name="melding"
                required
                rows={5}
                placeholder="Melding"
                className="resize-none rounded-xl border border-[var(--w12)] bg-[var(--bg-2)] px-4 py-3 text-[14.5px] outline-none placeholder:text-[var(--w25)] focus:border-[var(--cyan)]"
              />

              <p className="text-[12.5px] leading-[1.5] text-[var(--w25)]">
                Vi bruker kun opplysningene dine til å svare på din henvendelse. Ingen
                nyhetsbrev, ingen deling med tredjepart.
              </p>

              {status === "error" && (
                <p className="text-[13.5px] text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 rounded-full bg-[var(--cyan)] px-6 py-3 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
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
