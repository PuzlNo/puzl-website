export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[62px] backdrop-blur-md bg-[var(--bg)]/70 border-b border-[var(--brd)]">
      <div className="mx-auto h-full max-w-[1180px] px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1.5" fill="var(--cyan)" opacity="0.85" />
            <rect x="13" y="1" width="8" height="8" rx="1.5" fill="var(--cyan)" opacity="0.55" />
            <rect x="1" y="13" width="8" height="8" rx="1.5" fill="var(--cyan)" opacity="0.55" />
            <rect x="13" y="13" width="8" height="8" rx="1.5" fill="var(--cyan)" opacity="0.85" />
            <circle cx="11" cy="11" r="2" fill="var(--cyan)" />
          </svg>
          <span className="font-display font-bold text-[17px] tracking-tight">Puzl</span>
        </a>

        <nav className="hidden [@media(min-width:960px)]:flex items-center gap-8 text-sm text-[var(--w70)]">
          <a href="#levert" className="hover:text-[var(--w100)] transition-colors">
            Levert
          </a>
          <a href="#tilnærming" className="hover:text-[var(--w100)] transition-colors">
            Tilnærming
          </a>
          <a href="#kompetanse" className="hover:text-[var(--w100)] transition-colors">
            Kompetanse
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-[var(--cyan)] px-4 py-2 text-[13px] font-medium text-[var(--bg)] hover:opacity-90 transition-opacity"
          >
            Ta kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}
