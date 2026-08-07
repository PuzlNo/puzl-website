import SectionEyebrow from "./SectionEyebrow";
import type { FaqItem } from "@/lib/posts";

/**
 * Renders nothing when `faq` is missing or empty, so articles without FAQ
 * content (the default) get no empty section or layout gap.
 *
 * Accordion behavior comes from native <details>/<summary> — no client JS,
 * no state, works with JS disabled and is keyboard/screen-reader accessible
 * for free.
 */
export default function FAQSection({ faq }: { faq?: FaqItem[] }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-14 rounded-box border border-[var(--line)] p-8 sm:p-10">
      <SectionEyebrow label="Ofte stilte spørsmål" />
      <div className="mt-6 divide-y divide-[var(--line)]">
        {faq.map((item) => (
          <details key={item.question} className="group py-5 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold leading-[1.4] text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="mt-1 shrink-0 text-[var(--chalk)] transition-transform duration-200 group-open:rotate-45"
              >
                <path d="M12 4v16M4 12h16" />
              </svg>
            </summary>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--ink-45)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
