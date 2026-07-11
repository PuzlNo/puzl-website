import GrainlineMark from "./GrainlineMark";

export default function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[var(--chalk)]">
      <GrainlineMark size={13} />
      <p className="font-mono text-[12px] uppercase tracking-[0.14em]">{label}</p>
    </div>
  );
}
