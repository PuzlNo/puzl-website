export default function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-chalk px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
      {children}
    </span>
  );
}
