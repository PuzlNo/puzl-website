import type { CSSProperties } from "react";

type GrainlineMarkProps = {
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
};

// Tailoring pattern grainline symbol — Puzl's recurring signature mark.
// Omit `size` and control dimensions via `className` (e.g. Tailwind width
// utilities) for responsive, large-scale use as a background motif.
export default function GrainlineMark({ size, strokeWidth = 1.6, animated = false, className = "" }: GrainlineMarkProps) {
  return (
    <svg
      {...(size ? { width: size, height: size } : {})}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="12" y1="2" x2="12" y2="22"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={animated ? "grainline-draw" : undefined}
        style={animated ? ({ "--dash": 20 } as CSSProperties) : undefined}
      />
      <line x1="6" y1="2" x2="18" y2="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="6" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
