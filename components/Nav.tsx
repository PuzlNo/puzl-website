"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/artikler", label: "Artikler" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-4 top-3 z-50 flex justify-center sm:inset-x-6 sm:top-4">
      <div className="relative w-full max-w-[1180px]">
        <div className="rounded-full border border-[var(--line)] bg-paper/85 shadow-sm backdrop-blur-md">
          <div className="flex h-14 items-center justify-between px-5 sm:px-6">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Image src="/logo.svg" alt="Puzl" width={92} height={24} priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-8 font-mono text-[12.5px] uppercase tracking-wide text-[var(--ink-70)]">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="stitch-link hover:text-ink transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="rounded-full bg-ink px-4 py-2 text-[13px] normal-case tracking-normal font-body font-medium text-paper hover:bg-[var(--thread)] transition-colors"
              >
                Kontakt
              </Link>
            </nav>

            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/kontakt"
                className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper hover:bg-[var(--thread)] transition-colors"
              >
                Kontakt
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Lukk meny" : "Åpne meny"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-ink transition-colors hover:bg-[var(--paper-2)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  {open ? (
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  ) : (
                    <>
                      <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="2" y1="11.5" x2="14" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {open && (
          <nav className="rounded-box absolute inset-x-0 top-full mt-2 flex flex-col gap-1 border border-[var(--line)] bg-paper/95 p-2 font-mono text-[13px] uppercase tracking-wide text-[var(--ink-70)] shadow-sm backdrop-blur-md lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-box px-3 py-2.5 hover:bg-[var(--paper-2)] hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
