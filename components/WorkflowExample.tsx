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

function IconBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M13 2 3 14h8l-1 8 11-14h-8z" />
    </svg>
  );
}

function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
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

// 1, 2, 3 — left-hand entry chain (1 and 2 stack vertically on desktop).
const MAIN_NODES: NodeData[] = [
  { id: "1", title: "Nytt produkt", subtitle: "Produkt opprettes", icon: IconBox },
  { id: "2", title: "Produktdata sendes", subtitle: "Produktnavn, produktbilde og produktinformasjon", icon: IconSend },
  { id: "3", title: "Database mottar produktdata", subtitle: "Henter relevant data fra database for produktet", icon: IconDatabase },
];

// 3.1-3.4 — parallel fan-out/fan-in cluster.
const BRANCH_NODES: NodeData[] = [
  { id: "3.1", title: "Brandprofil", subtitle: "Henter merkevareprofilen", icon: IconTag },
  { id: "3.2", title: "Produktdatabase", subtitle: "Henter relevant produkt-kontekst", icon: IconLayers },
  { id: "3.3", title: "Regelsett", subtitle: "Henter skrivemetodikk og regler", icon: IconChecklist },
  { id: "3.4", title: "SEO/AIO", subtitle: "Henter relevant SEO og AIO database", icon: IconSearch },
];

// 4-9 — right-hand 2x3 grid, read left-to-right then top-to-bottom.
const GRID_NODES: NodeData[] = [
  { id: "4", title: "Datasortering", subtitle: "Systematiserer og kombinerer database, produktinformasjon og relevans", icon: IconFilter },
  { id: "5", title: "Data AI-agent", subtitle: "Data AI-agent analyserer dataen og optimaliserer for produkttekstgenerering", icon: IconBolt },
  { id: "6", title: "Optimalisert data", subtitle: "Data AI-agent sender optimalisert data til Innholdsproduksjon AI-agent", icon: IconCheckCircle },
  { id: "7", title: "Innholdsproduksjon AI-agent", subtitle: "Innholdsagent skriver produktteksten til produktet", icon: IconAgent },
  { id: "8", title: "Produkttekst", subtitle: "Agent produserer tekst", icon: IconDocument },
  { id: "9", title: "Publiseres", subtitle: "Produkttekst og produkt publiseres", icon: IconGlobe },
];

const MOBILE_TAIL_NODES = GRID_NODES; // same 6, rendered as a plain vertical chain on mobile

// Fixed node dimensions so every connector below is hand-computed rather
// than measured at runtime — deterministic layout, no ResizeObserver.
const NODE_W = 168;
const NODE_H = 108;
const GAP_V = 12; // vertical gap inside the branch cluster (3.1-3.4)
const CHAIN_W = 30; // width of a simple horizontal arrow connector
const FAN_W = 46; // width of the fan-out / fan-in svg zones
const STACK_GAP = 30; // gap between node 1 and node 2 in the left stack
const ROW_GAP = 36; // gap between grid row 1 and row 2
const COL_GAP = 30; // gap between grid columns

const CLUSTER_H = BRANCH_NODES.length * NODE_H + (BRANCH_NODES.length - 1) * GAP_V; // 468
const BRANCH_CENTERS = BRANCH_NODES.map((_, i) => i * (NODE_H + GAP_V) + NODE_H / 2);

// The shared horizontal centerline every piece of the diagram aligns to:
// node 3, both fan svgs, node 2 (bottom of the left stack), and row 1 of
// the right grid all place their connection point at this same Y.
const MID_Y = CLUSTER_H / 2;
const LEFT_SPACER = MID_Y - NODE_H / 2 - STACK_GAP - NODE_H; // margin-top before node 1
const GRID_SPACER = MID_Y - NODE_H / 2; // margin-top before grid row 1
const GRID_W = 3 * NODE_W + 2 * COL_GAP;

function Node({ node }: { node: NodeData }) {
  const Icon = node.icon;
  return (
    <div
      style={{ width: NODE_W, height: NODE_H }}
      className="shrink-0 rounded-box border border-[var(--line)] bg-paper p-3"
    >
      <div className="flex h-full flex-col justify-center">
        <div className="flex items-center gap-2">
          <Icon className="shrink-0 text-[var(--chalk)]" />
          <p className="line-clamp-2 text-[13px] font-semibold leading-[1.3]">{node.title}</p>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-[1.45] text-[var(--ink-45)]">
          {node.subtitle}
        </p>
      </div>
    </div>
  );
}

function NodeSlot({ node }: { node: NodeData }) {
  // Centers a single node's box on the shared MID_Y centerline by placing
  // it inside a CLUSTER_H-tall slot — matches the branch cluster's own
  // (already-centered) height.
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

function ChainConnector({
  flowing,
  height = CLUSTER_H,
  width = CHAIN_W,
}: {
  flowing: boolean;
  height?: number;
  width?: number;
}) {
  return (
    <div style={{ width, height }} className="flex shrink-0 items-center justify-center">
      <svg width={width} height="20" viewBox={`0 0 ${width} 20`} aria-hidden="true" overflow="visible">
        <path
          d={`M2,10 L${width - 6},10`}
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`flow-line ${flowing ? "is-flowing" : ""}`}
        />
        <path
          d={`M${width - 11},5 L${width - 4},10 L${width - 11},15`}
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
  // "in": 4 branch centers converge into one point (grid row 1, mid-height).
  const paths = BRANCH_CENTERS.map((y) => {
    const from = direction === "out" ? MID_Y : y;
    const to = direction === "out" ? y : MID_Y;
    const midX = FAN_W / 2;
    return `M0,${from} C${midX},${from} ${midX},${to} ${FAN_W},${to}`;
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

function StackConnector({ flowing }: { flowing: boolean }) {
  // Vertical arrow between node 1 and node 2 in the left-hand stack.
  return (
    <div style={{ height: STACK_GAP }} className="flex justify-center">
      <svg width="20" height={STACK_GAP} viewBox={`0 0 20 ${STACK_GAP}`} aria-hidden="true" overflow="visible">
        <path
          d={`M10,2 L10,${STACK_GAP - 8}`}
          fill="none"
          stroke="var(--chalk)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`flow-line ${flowing ? "is-flowing" : ""}`}
        />
        <path
          d={`M5,${STACK_GAP - 13} L10,${STACK_GAP - 6} L15,${STACK_GAP - 13}`}
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

function LeftStack({ flowing }: { flowing: boolean }) {
  return (
    <div style={{ marginTop: LEFT_SPACER }} className="flex shrink-0 flex-col">
      <Node node={MAIN_NODES[0]} />
      <StackConnector flowing={flowing} />
      <Node node={MAIN_NODES[1]} />
    </div>
  );
}

function WrapConnector({ flowing }: { flowing: boolean }) {
  // The "carriage return" from the end of grid row 1 (node 6, rightmost)
  // down to the start of row 2 (node 7, leftmost) — reading order stays
  // left-to-right on both rows, so this sweeps the full grid width.
  const startX = 2 * (NODE_W + COL_GAP) + NODE_W / 2;
  const endX = NODE_W / 2;
  const midY = ROW_GAP / 2;
  return (
    <svg width={GRID_W} height={ROW_GAP} viewBox={`0 0 ${GRID_W} ${ROW_GAP}`} aria-hidden="true" className="block">
      <path
        d={`M${startX},0 C${startX},${midY} ${endX},${midY} ${endX},${ROW_GAP}`}
        fill="none"
        stroke="var(--chalk)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`flow-line ${flowing ? "is-flowing" : ""}`}
      />
      <circle cx={startX} cy="2" r="2.5" fill="var(--chalk)" />
      <path
        d={`M${endX - 5},${ROW_GAP - 9} L${endX},${ROW_GAP - 2} L${endX + 5},${ROW_GAP - 9}`}
        fill="none"
        stroke="var(--chalk)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightGrid({ flowing }: { flowing: boolean }) {
  const row1 = GRID_NODES.slice(0, 3);
  const row2 = GRID_NODES.slice(3, 6);
  return (
    <div style={{ marginTop: GRID_SPACER }} className="flex shrink-0 flex-col">
      <div className="flex items-center">
        <Node node={row1[0]} />
        <ChainConnector flowing={flowing} height={NODE_H} width={COL_GAP} />
        <Node node={row1[1]} />
        <ChainConnector flowing={flowing} height={NODE_H} width={COL_GAP} />
        <Node node={row1[2]} />
      </div>
      <WrapConnector flowing={flowing} />
      <div className="flex items-center">
        <Node node={row2[0]} />
        <ChainConnector flowing={flowing} height={NODE_H} width={COL_GAP} />
        <Node node={row2[1]} />
        <ChainConnector flowing={flowing} height={NODE_H} width={COL_GAP} />
        <Node node={row2[2]} />
      </div>
    </div>
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
          <div className="mx-auto flex w-max items-start px-6">
            <LeftStack flowing={flowing} />
            <ChainConnector flowing={flowing} />
            <NodeSlot node={MAIN_NODES[2]} />
            <FanSvg direction="out" flowing={flowing} />
            <div className="flex flex-col gap-3">
              {BRANCH_NODES.map((node) => (
                <Node key={node.id} node={node} />
              ))}
            </div>
            <FanSvg direction="in" flowing={flowing} />
            <RightGrid flowing={flowing} />
          </div>
        </div>

        {/* Mobile: vertical chain, branch nodes grouped in a bracketed cluster */}
        <div className="mx-auto mt-12 flex max-w-[1180px] flex-col lg:hidden">
          {MAIN_NODES.map((node, i) => (
            <div key={node.id}>
              {i > 0 && <VerticalConnector flowing={flowing} />}
              <MobileNode node={node} />
            </div>
          ))}
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

          {MOBILE_TAIL_NODES.map((node) => (
            <div key={node.id}>
              <VerticalConnector flowing={flowing} />
              <MobileNode node={node} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
