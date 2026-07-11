export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-6 py-8">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 font-mono text-[12px] text-[var(--ink-45)] sm:flex-row">
        <p>© 2026 Puzl. Alle rettigheter forbeholdt.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="stitch-link hover:text-ink transition-colors">
            Personvern
          </a>
        </div>
      </div>
    </footer>
  );
}
