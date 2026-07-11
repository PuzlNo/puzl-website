export default function Footer() {
  return (
    <footer className="border-t border-[var(--brd)] px-6 py-8">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 text-[13.5px] text-[var(--w45)] sm:flex-row">
        <p>© 2026 Puzl. Alle rettigheter forbeholdt.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[var(--w100)] transition-colors">
            Personvern
          </a>
        </div>
      </div>
    </footer>
  );
}
