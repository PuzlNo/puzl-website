"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactElement } from "react";
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
  { id: "1", title: "Nytt produkt", subtitle: "Produktet opprettes", icon: IconBox },
  { id: "2", title: "Produktdata sendes", subtitle: "Navn, bilde og info sendes", icon: IconSend },
  { id: "3", title: "Database mottar produktdata", subtitle: "Henter data for produktet", icon: IconDatabase },
];

// 3.1-3.4 — parallel fan-out/fan-in cluster.
const BRANCH_NODES: NodeData[] = [
  { id: "3.1", title: "Brandprofil", subtitle: "Henter merkevareprofilen", icon: IconTag },
  { id: "3.2", title: "Produkt​database", subtitle: "Henter produktkontekst", icon: IconLayers },
  { id: "3.3", title: "Regelsett", subtitle: "Henter skriveregler", icon: IconChecklist },
  { id: "3.4", title: "SEO/AIO", subtitle: "Henter SEO/AIO-data", icon: IconSearch },
];

// 4-9 — the zigzag tail following the fan-in convergence. Order here is
// flow order (also used verbatim for the mobile vertical chain); desktop
// positions come from ZIGZAG_POS below, keyed by id.
const TAIL_NODES: NodeData[] = [
  { id: "4", title: "Datasortering", subtitle: "Systematiserer og kombinerer data", icon: IconFilter },
  { id: "5", title: "Data AI-agent", subtitle: "Analyserer og optimaliserer data", icon: IconBolt },
  { id: "6", title: "Optimalisert data", subtitle: "Sendes til Innholdsproduksjon AI-agent", icon: IconCheckCircle },
  { id: "7", title: "Innholdsproduksjon AI-agent", subtitle: "Skriver produktteksten", icon: IconAgent },
  { id: "8", title: "Produkttekst", subtitle: "Teksten produseres", icon: IconDocument },
  { id: "9", title: "Publiseres", subtitle: "Publiseres til produktet", icon: IconGlobe },
];

// Fixed node dimensions (at 1:1 scale) so every connector below is
// hand-computed rather than measured at runtime — deterministic layout.
// The whole diagram is then scaled fluidly as one unit to fit the
// viewport (see the scale effect in WorkflowExample), so these are the
// "natural" sizes, not a fixed on-screen size. Sized generously enough
// that the longest title/subtitle pair in TAIL_NODES wraps without any
// truncation at scale 1.
const NODE_W = 204;
const NODE_H = 118;
const GAP_V = 10; // vertical gap inside the branch cluster (3.1-3.4)
const CHAIN_W = 32; // width of a simple horizontal arrow connector
const FAN_W = 52; // width of the fan-out / fan-in svg zones
const STACK_GAP = 32; // gap between node 1 and node 2 in the left stack
const ZZ_ROW_GAP = 32; // vertical gap between zigzag rows
const ZZ_COL_GAP = 32; // horizontal gap between zigzag columns

const CLUSTER_H = BRANCH_NODES.length * NODE_H + (BRANCH_NODES.length - 1) * GAP_V;
const BRANCH_CENTERS = BRANCH_NODES.map((_, i) => i * (NODE_H + GAP_V) + NODE_H / 2);

// The shared horizontal centerline every piece of the diagram aligns to:
// node 3, both fan svgs, node 2 (bottom of the left stack), and
// Datasortering (the fan-in landing node) all place their connection
// point at this same Y.
const MID_Y = CLUSTER_H / 2;
const LEFT_SPACER = MID_Y - NODE_H / 2 - STACK_GAP - NODE_H; // margin-top before node 1

// Zigzag tail geometry — an S-shaped path, not a rectangular grid:
//   row -1: Data AI-agent | Optimalisert data | Innholdsproduksjon AI-agent
//   row  0: Datasortering |        --         | Produkttekst
//   row  1:       --      |        --         | Publiseres
// Column/row step size along each axis:
const ZZ_COL = NODE_W + ZZ_COL_GAP;
const ZZ_ROW = NODE_H + ZZ_ROW_GAP;
// Local (left, top) within the zigzag's own box, row -1's top = 0.
const ZIGZAG_POS: Record<string, { left: number; top: number }> = {
  "5": { left: 0, top: 0 }, // Data AI-agent — row -1, col 0
  "6": { left: ZZ_COL, top: 0 }, // Optimalisert data — row -1, col 1
  "7": { left: 2 * ZZ_COL, top: 0 }, // Innholdsproduksjon AI-agent — row -1, col 2
  "4": { left: 0, top: ZZ_ROW }, // Datasortering — row 0, col 0 (anchor)
  "8": { left: 2 * ZZ_COL, top: ZZ_ROW }, // Produkttekst — row 0, col 2
  "9": { left: 2 * ZZ_COL, top: 2 * ZZ_ROW }, // Publiseres — row 1, col 2
};
const ZIGZAG_W = 3 * NODE_W + 2 * ZZ_COL_GAP;
const ZIGZAG_H = 3 * NODE_H + 2 * ZZ_ROW_GAP;
// margin-top so Datasortering's center lands on MID_Y, same convention
// as every other entry point in the diagram.
const ZIGZAG_SPACER = MID_Y - ZZ_ROW - NODE_H / 2;

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
          <p className="text-[13px] font-semibold leading-[1.3]">{node.title}</p>
        </div>
        <p className="mt-1.5 text-[11.5px] leading-[1.45] text-[var(--ink-45)]">{node.subtitle}</p>
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

function MobileNode({ node, centered }: { node: NodeData; centered?: boolean }) {
  const Icon = node.icon;
  return (
    <div
      className={`min-w-0 rounded-box border border-[var(--line)] bg-paper p-3.5 ${
        centered ? "mx-auto flex w-[70%] flex-col items-center justify-center text-center" : ""
      }`}
    >
      <div className={`flex min-w-0 items-center gap-2 ${centered ? "justify-center" : ""}`}>
        <Icon className="shrink-0 text-[var(--chalk)]" />
        <p className="min-w-0 break-words text-[13.5px] font-semibold leading-[1.3]">{node.title}</p>
      </div>
      <p className="mt-1.5 break-words text-[12px] leading-[1.5] text-[var(--ink-45)]">{node.subtitle}</p>
    </div>
  );
}

function MobileFanSvg({ direction, flowing }: { direction: "in" | "out"; flowing: boolean }) {
  // Mobile equivalent of FanSvg: the same bezier fan-out/fan-in visual
  // language, rotated to a vertical orientation so the arrow chain reads
  // as splitting into (and later converging out of) the parallel cluster
  // instead of the cluster looking like a disconnected island.
  const W = 140;
  const H = 26;
  const cls = `flow-line ${flowing ? "is-flowing" : ""}`;
  const targets = [W * 0.22, W * 0.78];
  const paths = targets.map((x) => {
    const fromX = direction === "in" ? W / 2 : x;
    const toX = direction === "in" ? x : W / 2;
    const fromY = direction === "in" ? 0 : H;
    const toY = direction === "in" ? H : 0;
    const midY = H / 2;
    return `M${fromX},${fromY} C${fromX},${midY} ${toX},${midY} ${toX},${toY}`;
  });

  return (
    <div className="flex justify-center py-1">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" overflow="visible">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--chalk)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={cls}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
        <circle cx={W / 2} cy={direction === "in" ? 0 : H} r="3" fill="var(--chalk)" />
        {targets.map((x, i) => (
          <circle key={i} cx={x} cy={direction === "in" ? H : 0} r="3" fill="var(--chalk)" />
        ))}
      </svg>
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

function StraightArrow({
  orientation,
  flowing,
}: {
  orientation: "right" | "up" | "down";
  flowing: boolean;
}) {
  const cls = `flow-line ${flowing ? "is-flowing" : ""}`;

  if (orientation === "right") {
    const w = ZZ_COL_GAP;
    return (
      <svg width={w} height="20" viewBox={`0 0 ${w} 20`} aria-hidden="true" overflow="visible">
        <path d={`M2,10 L${w - 6},10`} fill="none" stroke="var(--chalk)" strokeWidth="1.5" strokeLinecap="round" className={cls} />
        <path d={`M${w - 11},5 L${w - 4},10 L${w - 11},15`} fill="none" stroke="var(--chalk)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const h = ZZ_ROW_GAP;
  const up = orientation === "up";
  return (
    <svg width="20" height={h} viewBox={`0 0 20 ${h}`} aria-hidden="true" overflow="visible">
      <path
        d={up ? `M10,${h - 2} L10,8` : `M10,2 L10,${h - 8}`}
        fill="none"
        stroke="var(--chalk)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={cls}
      />
      <path
        d={up ? `M5,13 L10,6 L15,13` : `M5,${h - 13} L10,${h - 6} L15,${h - 13}`}
        fill="none"
        stroke="var(--chalk)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The final six nodes as an S-shaped zigzag rather than a rectangular
// grid: Datasortering (anchor) -> up -> right -> right -> down -> down.
// Every node and connector is absolutely positioned from ZIGZAG_POS —
// deterministic, still no runtime measurement.
function ZigzagPath({ flowing }: { flowing: boolean }) {
  const byId = Object.fromEntries(TAIL_NODES.map((n) => [n.id, n]));
  const half = NODE_H / 2;
  const colCenter = NODE_W / 2;

  return (
    <div
      style={{ marginTop: ZIGZAG_SPACER, width: ZIGZAG_W, height: ZIGZAG_H }}
      className="relative shrink-0"
    >
      {Object.entries(ZIGZAG_POS).map(([id, pos]) => (
        <div key={id} style={{ position: "absolute", left: pos.left, top: pos.top }}>
          <Node node={byId[id]} />
        </div>
      ))}

      {/* 4 -> 5: up, column 0 */}
      <div style={{ position: "absolute", left: ZIGZAG_POS["4"].left + colCenter - 10, top: ZIGZAG_POS["5"].top + NODE_H }}>
        <StraightArrow orientation="up" flowing={flowing} />
      </div>
      {/* 5 -> 6: right, row -1 */}
      <div style={{ position: "absolute", left: ZIGZAG_POS["5"].left + NODE_W, top: ZIGZAG_POS["5"].top + half - 10 }}>
        <StraightArrow orientation="right" flowing={flowing} />
      </div>
      {/* 6 -> 7: right, row -1 */}
      <div style={{ position: "absolute", left: ZIGZAG_POS["6"].left + NODE_W, top: ZIGZAG_POS["6"].top + half - 10 }}>
        <StraightArrow orientation="right" flowing={flowing} />
      </div>
      {/* 7 -> 8: down, column 2 */}
      <div style={{ position: "absolute", left: ZIGZAG_POS["7"].left + colCenter - 10, top: ZIGZAG_POS["7"].top + NODE_H }}>
        <StraightArrow orientation="down" flowing={flowing} />
      </div>
      {/* 8 -> 9: down, column 2 */}
      <div style={{ position: "absolute", left: ZIGZAG_POS["8"].left + colCenter - 10, top: ZIGZAG_POS["8"].top + NODE_H }}>
        <StraightArrow orientation="down" flowing={flowing} />
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

// Below this scale the diagram would be too small to read comfortably;
// horizontal scroll takes over as the fallback instead of shrinking further.
const MIN_SCALE = 0.62;

export default function WorkflowExample() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramWrapRef = useRef<HTMLDivElement>(null);
  const diagramInnerRef = useRef<HTMLDivElement>(null);
  const [flowing, setFlowing] = useState(false);
  const [diagramSize, setDiagramSize] = useState({ scale: 1, width: 0, height: 0, scrolls: false, ready: false });

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

  // Fluid scaling: the diagram's internal geometry (NODE_W, ZIGZAG_W, etc.)
  // stays fixed and deterministic, but the whole diagram is scaled as one
  // unit to fit the available width, so it shrinks gradually with the
  // viewport instead of jumping straight to horizontal scroll. Transforms
  // don't affect layout size, so offsetWidth/Height on the unscaled inner
  // content always reports its true natural size regardless of current scale.
  //
  // `ready` gates visibility (see the opacity classes below) rather than
  // relying on useLayoutEffect alone to prevent a flash of the unscaled
  // diagram: useLayoutEffect only stops flicker *between* client renders,
  // but on a hard reload the browser paints the server-rendered HTML
  // (scale defaults to 1) before React hydrates and this effect can run.
  // Keeping the diagram invisible until the first real scale is computed
  // means that initial unscaled paint is simply never shown.
  useLayoutEffect(() => {
    const wrap = diagramWrapRef.current;
    const inner = diagramInnerRef.current;
    if (!wrap || !inner) return;

    const recompute = () => {
      const naturalW = inner.offsetWidth;
      const naturalH = inner.offsetHeight;
      const availableW = wrap.clientWidth;
      if (!naturalW || !availableW) return;
      const rawScale = availableW / naturalW;
      const scale = Math.min(1, Math.max(MIN_SCALE, rawScale));
      setDiagramSize({
        scale,
        width: naturalW * scale,
        height: naturalH * scale,
        scrolls: rawScale < MIN_SCALE,
        ready: true,
      });
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-x-hidden px-6 py-28">
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

        {/* Desktop: branching pipeline diagram — full-bleed breakout, scaled
            fluidly as one unit to fit the available width (see the scale
            effect above); horizontal scroll only kicks in past MIN_SCALE.
            Stays invisible until the first scale is computed (see `ready`
            above) so a hard reload never flashes the unscaled diagram. */}
        <div
          className={`relative left-1/2 mt-16 hidden w-screen -translate-x-1/2 px-6 transition-opacity duration-300 lg:block lg:px-12 xl:px-20 ${
            diagramSize.ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={diagramWrapRef}
            className={`mx-auto max-w-[1680px] ${diagramSize.scrolls ? "overflow-x-auto" : ""}`}
          >
            <div
              className="mx-auto"
              style={diagramSize.width ? { width: diagramSize.width, height: diagramSize.height } : undefined}
            >
              <div
                ref={diagramInnerRef}
                style={{ transform: `scale(${diagramSize.scale})`, transformOrigin: "top left" }}
                className="flex w-max items-start"
              >
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
                <ZigzagPath flowing={flowing} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: vertical chain, branch nodes grouped in a bracketed cluster.
            Standalone nodes render narrower and centered (see MobileNode's
            `centered` prop); the cluster connects into/out of the arrow
            chain via MobileFanSvg instead of floating as an isolated block. */}
        <div className="mx-auto mt-12 flex max-w-[1180px] flex-col lg:hidden">
          {MAIN_NODES.map((node, i) => (
            <div key={node.id}>
              {i > 0 && <VerticalConnector flowing={flowing} />}
              <MobileNode node={node} centered />
            </div>
          ))}
          <MobileFanSvg direction="in" flowing={flowing} />

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

          <MobileFanSvg direction="out" flowing={flowing} />
          {TAIL_NODES.map((node, i) => (
            <div key={node.id}>
              {i > 0 && <VerticalConnector flowing={flowing} />}
              <MobileNode node={node} centered />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
