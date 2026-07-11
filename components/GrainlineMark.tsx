import type { CSSProperties } from "react";

type GrainlineMarkProps = {
  size?: number;
  animated?: boolean;
  className?: string;
};

// Tailoring pattern grainline symbol — Puzl's recurring signature mark.
export default function GrainlineMark({ size = 20, animated = false, className = "" }: GrainlineMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="12" y1="2" x2="12" y2="22"
        stroke="currentColor"
        strokeWidth="1.6"
        className={animated ? "grainline-draw" : undefined}
        style={animated ? ({ "--dash": 20 } as CSSProperties) : undefined}
      />
      <line x1="6" y1="2" x2="18" y2="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="6" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
