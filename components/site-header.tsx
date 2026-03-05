import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/pdfs/suvamsh_resume.pdf", label: "Resume" }
];

export function SiteHeader() {
  return (
    <header className="mx-auto mt-4 w-full max-w-6xl px-5 md:px-10">
      <nav className="surface flex flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-7">
        <Link href="/" className="matrix-title animate-flicker font-display text-3xl font-semibold tracking-[0.08em] text-accent">
          Suvamsh
        </Link>
        <ul className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent/75">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full border border-transparent px-3 py-2 transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
