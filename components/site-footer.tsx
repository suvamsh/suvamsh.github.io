import Link from "next/link";

const socialLinks = [
  { href: "mailto:ssuvamsh@gmail.com", label: "Email" },
  { href: "https://github.com/suvamsh", label: "GitHub" },
  { href: "https://www.linkedin.com/in/suvamsh-shivaprasad-5aab3860/", label: "LinkedIn" },
  { href: "https://www.instagram.com/suvamsh", label: "Instagram" }
];

export function SiteFooter() {
  return (
    <footer className="mx-auto mb-8 mt-2 w-full max-w-6xl px-5 md:px-10">
      <div className="surface flex flex-col items-start justify-between gap-4 px-5 py-5 text-sm text-[#9bc9ab] md:flex-row md:items-center md:px-7">
        <p>Built with Next.js + Tailwind. Deployed with GitHub Pages.</p>
        <ul className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-semibold text-ink/90 transition hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
