"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import GrainlineMark from "./GrainlineMark";
import SectionEyebrow from "./SectionEyebrow";

type NodeData = {
  id: string;
  title: string;
  subtitle: string;
  icon: (props: { className?: string }) => ReactElement;
};

function IconBox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M3 8v8l9 4 9-4V8" />
      <path d="M12 12v8" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function IconDatabase({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

function IconTag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 13.4L13.4 20a2 2 0 01-2.8 0L3 12.4V4h8.4l8.6 8.6a2 2 0 010 2.8z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function IconLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function IconChecklist({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v2h6V3" />
      <path d="M8 12h8M8 16h5" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function IconFilter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 4h16l-6.5 8v6.5l-3 1.5V12z" />
    </svg>
  );
}

function IconAgent({ className }: { className?: string }) {
  return <GrainlineMark size={17} className={className} />;
}

function IconDocument({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M15 2v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z" />
    </svg>
  );
}

const MAIN_NODES: NodeData[] = [
  { id: "1", title: "Nytt produkt", subtitle: "Produkt opprettes", icon: IconBox },
  { id: "2", title: "Produktdata sendes", subtitle: "Produktnavn og produktinformasjon", icon: IconSend },
  { id: "3", title: "Database mottar produktdata", subtitle: "Henter relevant data fra database", icon: IconDatabase },
];

const BRANCH_NODES: NodeData[] = [
  { id: "3.1", title: "Brandprofil", subtitle: "Henter merkevareprofilen", icon: IconTag },
  { id: "3.2", title: "Produktdatabase", subtitle: "Henter relevant kontekst", icon: IconLayers },
  { id: "3.3", title: "Regelsett", subtitle: "Henter skrivemetodikk og regler", icon: IconChecklist },
  { id: "3.4", title: "SEO/AIO", subtitle: "Henter SEO og AIO database", icon: IconSearch },
];

const TAIL_NODES: NodeData[] = [
  { id: "4", title: "Datasortering", subtitle: "Systematiserer data og relevans", icon: IconFilter },
  { id: "5", title: "Innholdsagent", subtitle: "Sender data til agent", icon: IconAgent },
  { id: "6", title: "Produkttekst", subtitle: "Agent produserer tekst", icon: IconDocument },
  { id: "7", title: "Publiseres", subtitle: "Produkttekst og produkt publiseres", icon: IconGlobe },
];

// Fixed node dimensions so the fan-out/fan-in geometry below can be
// hand-computed rather than measured at runtime.
const NODE_W = 168;
const NODE_H = 108;
const GAP_V = 12;
const CHAIN_W = 30;
const FAN_W = 46;
const CLUSTER_H = BRANCH_NODES.length * NODE_H + (BRANCH_NODES.length - 1) * GAP_V; // 468

const BRANCH_CENTERS = BRANCH_NODES.map((_, i) => i * (NODE_H + GAP_V) + NODE_H / 2);
const MID_Y = CLUSTER_H / 2;

function Node({ node }: { node: NodeData }) {
  const Icon = node.icon;
  return (
    <div
      style={{ width: NODE_W, height: NODE_H }}
      className="rounded-box border border-[var(--line)] bg-paper p-3 shrink-0"
    >
      <div className="flex items-center gap-2">
        <Icon className="shrink-0 text-[var(--chalk)]" />
        <p className="line-clamp-2 text-[13px] font-semibold leading-[1.3]">{node.title}</p>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-[1.45] text-[var(--ink-45)]">
        {node.subtitle}
      </p>
    </div>
  );
}

function NodeSlot({ node }: { node: NodeData }) {
  // Every single (non-branch) node sits in a CLUSTER_H-tall slot, centered,
  // so its box lands on the same shared centerline as the branch cluster
  // and every connector — this is what keeps the whole diagram aligned.
  return (
    <div style={{ height: CLUSTER_H }} className="flex shrink-0 items-center">
      <Node node={node} />
    </div>
  );
}

function MobileNode({ node }: { node: NodeData }) {
  const Icon = node.icon;
  return (
    <div className="rounded-box border border-[var(--line)] bg-paper p-3.5">
      <div className="flex items-center gap-2">
        <Icon className="shrink-0 text-[var(--chalk)]" />
        <p className="text-[13.5px] font-semibold leading-[1.3]">{node.title}</p>
      </div>
      <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--ink-45)]">{node.subtitle}</p>
    </div>
  );
}

function ChainConnector({ flowing }: { flowing: boolean }) {
  return (
    <div style={{ width: CHAIN_W, height: CLUSTER_H }} className="flex shrink-0 items-center justify-center">
      <svg width={CHAIN_W} height="20" viewBox={`0 0 ${CHAIN_W} 20`} aria-hidden="true" overflow="visible">
        <path
          d={`M2,10 L${CHAIN_W - 6},10`}
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`flow-line ${flowing ? "is-flowing" : ""}`}
        />
        <path
          d={`M${CHAIN_W - 11},5 L${CHAIN_W - 4},10 L${CHAIN_W - 11},15`}
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FanSvg({ direction, flowing }: { direction: "out" | "in"; flowing: boolean }) {
  // "out": one point (node 3, mid-height) fans out to 4 branch centers.
  // "in": 4 branch centers converge into one point (node 4, mid-height).
  const paths = BRANCH_CENTERS.map((y) => {
    const from = direction === "out" ? MID_Y : y;
    const to = direction === "out" ? y : MID_Y;
    const x1 = direction === "out" ? 0 : 0;
    const x2 = direction === "out" ? FAN_W : FAN_W;
    const midX = FAN_W / 2;
    return `M${x1},${from} C${midX},${from} ${midX},${to} ${x2},${to}`;
  });

  return (
    <svg
      width={FAN_W}
      height={CLUSTER_H}
      viewBox={`0 0 ${FAN_W} ${CLUSTER_H}`}
      className="shrink-0"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`flow-line ${flowing ? "is-flowing" : ""}`}
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      {/* junction dots */}
      <circle cx={direction === "out" ? 0 : FAN_W} cy={MID_Y} r="3" fill="var(--chalk)" />
      {BRANCH_CENTERS.map((y, i) => (
        <circle key={i} cx={direction === "out" ? FAN_W : 0} cy={y} r="3" fill="var(--chalk)" />
      ))}
    </svg>
  );
}

function VerticalConnector({ flowing }: { flowing: boolean }) {
  return (
    <div className="flex justify-center py-1">
      <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true" overflow="visible">
        <path
          d="M10,2 L10,18"
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`flow-line ${flowing ? "is-flowing" : ""}`}
        />
        <path
          d="M5,13 L10,20 L15,13"
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function WorkflowExample() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [flowing, setFlowing] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlowing(true);
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
      <div ref={sectionRef}>
        <div className="mx-auto max-w-[1180px]">
          <SectionEyebrow label="Et eksempel: Innholdsagent" />
          <h2 className="mt-4 text-[32px] font-bold sm:text-[38px]">
            Fra data til publisert tekst.
          </h2>
          <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[var(--ink-45)]">
            Slik ser Innholdsagent ut i praksis — ett konkret eksempel på hva skreddersydd
            betyr, ikke en generisk mal.
          </p>
        </div>

        {/* Desktop: branching pipeline diagram */}
        <div className="mt-16 hidden overflow-x-auto lg:block">
          <div className="mx-auto flex w-max px-6">
            <NodeSlot node={MAIN_NODES[0]} />
            <ChainConnector flowing={flowing} />
            <NodeSlot node={MAIN_NODES[1]} />
            <ChainConnector flowing={flowing} />
            <NodeSlot node={MAIN_NODES[2]} />
            <FanSvg direction="out" flowing={flowing} />
            <div className="flex flex-col gap-3">
              {BRANCH_NODES.map((node) => (
                <Node key={node.id} node={node} />
              ))}
            </div>
            <FanSvg direction="in" flowing={flowing} />
            <NodeSlot node={TAIL_NODES[0]} />
            <ChainConnector flowing={flowing} />
            <NodeSlot node={TAIL_NODES[1]} />
            <ChainConnector flowing={flowing} />
            <NodeSlot node={TAIL_NODES[2]} />
            <ChainConnector flowing={flowing} />
            <NodeSlot node={TAIL_NODES[3]} />
          </div>
        </div>

        {/* Mobile: vertical chain, branch nodes grouped in a bracketed cluster */}
        <div className="mx-auto mt-12 flex max-w-[1180px] flex-col lg:hidden">
          <MobileNode node={MAIN_NODES[0]} />
          <VerticalConnector flowing={flowing} />
          <MobileNode node={MAIN_NODES[1]} />
          <VerticalConnector flowing={flowing} />
          <MobileNode node={MAIN_NODES[2]} />
          <VerticalConnector flowing={flowing} />

          <div className="rounded-box border border-dashed border-[var(--line)] p-3">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">
              Kjøres parallelt
            </p>
            <div className="grid grid-cols-2 gap-2">
              {BRANCH_NODES.map((node) => (
                <MobileNode key={node.id} node={node} />
              ))}
            </div>
          </div>

          <VerticalConnector flowing={flowing} />
          <MobileNode node={TAIL_NODES[0]} />
          <VerticalConnector flowing={flowing} />
          <MobileNode node={TAIL_NODES[1]} />
          <VerticalConnector flowing={flowing} />
          <MobileNode node={TAIL_NODES[2]} />
          <VerticalConnector flowing={flowing} />
          <MobileNode node={TAIL_NODES[3]} />
        </div>
      </div>
    </section>
  );
}
