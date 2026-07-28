"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

// Horizontal seam (desktop): a gentle running-stitch that alternates
// peak/trough through the 4 step x-positions (quarter-centers of a
// 1200-wide viewBox: 150, 450, 750, 1050).
const H_PATH = "M150,20 C250,20 350,75 450,75 C550,75 650,20 750,20 C850,20 950,75 1050,75";
const H_NODES = [
  { x: 150, y: 20 },
  { x: 450, y: 75 },
  { x: 750, y: 20 },
  { x: 1050, y: 75 },
];

// Vertical seam (mobile): the same stitch turned 90 degrees, zigzagging
// left/right through 4 quarter-centers of a 400-tall viewBox.
const V_PATH = "M12,50 C12,100 28,100 28,150 C28,200 12,200 12,250 C12,300 28,300 28,350";
const V_NODES = [
  { x: 12, y: 50 },
  { x: 28, y: 150 },
  { x: 12, y: 250 },
  { x: 28, y: 350 },
];

export default function WorkflowExample() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hPathRef = useRef<SVGPathElement>(null);
  const vPathRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);
  const [hLen, setHLen] = useState(0);
  const [vLen, setVLen] = useState(0);

  useEffect(() => {
    function measure() {
      if (hPathRef.current) setHLen(hPathRef.current.getTotalLength());
      if (vPathRef.current) setVLen(vPathRef.current.getTotalLength());
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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

  const seamStyle = (len: number) =>
    ({ "--seam-len": len || 1000 }) as CSSProperties;
  const delay = (i: number) => `${i * 220}ms`;

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

        {/* Desktop: horizontal stitched seam running through 4 quarter-centers */}
        <div className="relative mt-16 hidden h-20 lg:block">
          <svg
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              ref={hPathRef}
              d={H_PATH}
              fill="none"
              stroke="var(--chalk)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`reveal-seam ${visible ? "is-visible" : ""}`}
              style={seamStyle(hLen)}
            />
            {H_NODES.map((node, i) => (
              <circle
                key={i}
                cx={node.x}
                cy={node.y}
                r="5"
                fill="var(--chalk)"
                className={`reveal-node ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: delay(i) }}
              />
            ))}
          </svg>
        </div>

        {/* Mobile: same stitch, turned vertical */}
        <div className="mt-12 flex gap-5 lg:hidden">
          <svg
            viewBox="0 0 40 400"
            preserveAspectRatio="none"
            className="w-10 shrink-0 self-stretch overflow-visible"
            aria-hidden="true"
          >
            <path
              ref={vPathRef}
              d={V_PATH}
              fill="none"
              stroke="var(--chalk)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`reveal-seam ${visible ? "is-visible" : ""}`}
              style={seamStyle(vLen)}
            />
            {V_NODES.map((node, i) => (
              <circle
                key={i}
                cx={node.x}
                cy={node.y}
                r="5"
                fill="var(--chalk)"
                className={`reveal-node ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: delay(i) }}
              />
            ))}
          </svg>

          <div className="flex flex-1 flex-col">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`reveal-step flex min-h-[104px] flex-col justify-center ${visible ? "is-visible" : ""}`}
                style={{ transitionDelay: delay(i) }}
              >
                <p className="font-mono text-[13px] text-[var(--chalk)]">0{i + 1}</p>
                <h3 className="mt-1 text-[16px] font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--ink-45)]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop step copy — plain text, no borders, alternating rhythm echoes the wave above */}
        <div className="mt-8 hidden grid-cols-4 gap-8 lg:grid">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`reveal-step ${i % 2 === 0 ? "" : "mt-8"} ${visible ? "is-visible" : ""}`}
              style={{ transitionDelay: delay(i) }}
            >
              <p className="font-mono text-[13px] text-[var(--chalk)]">0{i + 1}</p>
              <h3 className="mt-1.5 text-[16px] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--ink-45)]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
