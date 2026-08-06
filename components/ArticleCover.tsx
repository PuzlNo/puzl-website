type ArticleCoverProps = {
  seed: string;
  className?: string;
};

const WIDTH = 800;
const HEIGHT = 450;

const PALETTE = ["var(--chalk)", "var(--thread)", "var(--ink-25)", "var(--ink-12)"];
const WEIGHTS = [0.4, 0.25, 0.2, 0.15];

// Deterministic per-seed randomness (no Math.random) so server and client
// render identically and each post keeps a stable, distinctive composition.
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function weightedPick(rand: () => number, items: string[], weights: number[]) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function GrainMark({
  x,
  y,
  size,
  rotation,
  color,
}: {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${size / 24})`}
      stroke={color}
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="6" y1="2" x2="18" y2="2" />
      <line x1="6" y1="22" x2="18" y2="22" />
    </g>
  );
}

export default function ArticleCover({ seed, className = "" }: ArticleCoverProps) {
  const rand = mulberry32(hashSeed(seed));

  const markCount = 6 + Math.floor(rand() * 4);
  const marks = Array.from({ length: markCount }).map((_, i) => ({
    key: i,
    x: 60 + rand() * (WIDTH - 120),
    y: 60 + rand() * (HEIGHT - 120),
    size: 20 + rand() * 46,
    rotation: Math.floor(rand() * 4) * 90 + (rand() * 16 - 8),
    color: weightedPick(rand, PALETTE, WEIGHTS),
  }));

  const focal = {
    x: WIDTH * (0.2 + rand() * 0.6),
    y: HEIGHT * (0.25 + rand() * 0.5),
    size: 90 + rand() * 60,
    rotation: Math.floor(rand() * 4) * 90,
  };

  const gridId = `cover-grid-${seed.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={`block rounded-box ${className}`}
      role="img"
      aria-hidden="true"
    >
      <rect width={WIDTH} height={HEIGHT} fill="var(--paper-2)" />
      <defs>
        <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill={`url(#${gridId})`} opacity="0.4" />
      <rect
        x="16"
        y="16"
        width={WIDTH - 32}
        height={HEIGHT - 32}
        rx="20"
        fill="none"
        stroke="var(--line)"
        strokeDasharray="5 7"
      />
      {marks.map((m) => (
        <GrainMark key={m.key} x={m.x} y={m.y} size={m.size} rotation={m.rotation} color={m.color} />
      ))}
      <GrainMark x={focal.x} y={focal.y} size={focal.size} rotation={focal.rotation} color="var(--chalk)" />
    </svg>
  );
}
