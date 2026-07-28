"use client";

import { useEffect, useRef, useState } from "react";
import GrainlineMark from "./GrainlineMark";
import SectionEyebrow from "./SectionEyebrow";

const steps = [
  {
    title: "Innhenter data",
    text: "Henter produktinfo, kategoristruktur og eksisterende tone og merkevareretningslinjer.",
  },
  {
    title: "Genererer tekst",
    text: "Skriver produkttekster og kategoritekst tilpasset merkevarens stemme og SEO-krav.",
  },
  {
    title: "Kvalitetssikrer",
    text: "Sjekker fakta, tone-konsistens og SEO-validering før publisering.",
  },
  {
    title: "Publiserer",
    text: "Sender ferdig tekst direkte til CMS-et eller PIM-systemet dere allerede bruker.",
  },
];

export default function WorkflowExample() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-[1180px]" ref={sectionRef}>
        <SectionEyebrow label="Et eksempel: Innholdsagent" />
        <h2 className="mt-4 text-[32px] font-bold sm:text-[38px]">
          Fra data til publisert tekst.
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
          Slik ser Innholdsagent ut i praksis — ett konkret eksempel på hva skreddersydd
          betyr, ikke en generisk mal.
        </p>

        <div className="mt-14 flex flex-col lg:flex-row lg:items-stretch">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col lg:flex-1 lg:flex-row lg:items-stretch">
              {i > 0 && (
                <>
                  <div
                    className={`reveal-seam-y mx-auto h-8 w-0 border-l border-dashed border-[var(--line)] lg:hidden ${visible ? "is-visible" : ""}`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                    aria-hidden="true"
                  />
                  <div
                    className={`reveal-seam-x hidden h-px w-10 self-center border-t border-dashed border-[var(--line)] lg:block ${visible ? "is-visible" : ""}`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                    aria-hidden="true"
                  />
                </>
              )}
              <div
                className={`reveal-step rounded-box border border-[var(--line)] bg-paper p-7 lg:flex-1 ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <p className="font-mono text-[13px] text-[var(--chalk)]">0{i + 1}</p>
                <div className="mt-2 flex items-center gap-2">
                  <GrainlineMark size={16} className="shrink-0 text-[var(--chalk)]" />
                  <h3 className="text-[16px] font-semibold">{step.title}</h3>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[var(--ink-45)]">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
