import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto mb-4 mt-4 w-full max-w-6xl px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-5 md:mb-8 md:px-10">
      <div className="surface px-4 py-4 sm:px-5 md:px-7 md:py-5">
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-tertiary/75 sm:text-xs">
          Suvamsh Shivaprasad
        </p>
        <p className="mt-3 flex justify-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-tertiary/65 sm:text-xs">
          <Link href="/rss.xml" className="transition hover:text-accent">
            RSS
          </Link>
          <Link href="/atom.xml" className="transition hover:text-accent">
            Atom
          </Link>
        </p>
      </div>
    </footer>
  );
}
