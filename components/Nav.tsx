import Image from "next/image";

const links = [
  { href: "#tilnærming", label: "Hva vi gjør" },
  { href: "#levert", label: "Hva vi har bygget" },
  { href: "#kompetanse", label: "Hva vi leverer" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 backdrop-blur-md bg-paper/85 border-b border-[var(--line)]">
      <div className="mx-auto h-full max-w-[1180px] px-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Image src="/logo.svg" alt="Puzl" width={92} height={24} priority />
        </a>

        <nav className="hidden lg:flex items-center gap-8 font-mono text-[12.5px] uppercase tracking-wide text-[var(--ink-70)]">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="stitch-link hover:text-ink transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full bg-ink px-4 py-2 text-[13px] normal-case tracking-normal font-body font-medium text-paper hover:bg-[var(--thread)] transition-colors"
          >
            Ta kontakt
          </a>
        </nav>

        <a
          href="#kontakt"
          className="lg:hidden rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper hover:bg-[var(--thread)] transition-colors"
        >
          Ta kontakt
        </a>
      </div>
    </header>
  );
}
