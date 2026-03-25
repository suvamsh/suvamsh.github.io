import Link from "next/link";

export default function NotFound() {
  return (
    <section className="surface px-5 py-8 text-center shadow-card sm:px-6 sm:py-10 md:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent/80">404</p>
      <h1 className="matrix-title mt-2 font-display text-4xl leading-tight text-accent sm:text-[2.75rem] md:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-7 text-ink/90 sm:text-base">The page you requested does not exist.</p>
      <div className="mt-6">
        <Link href="/" className="font-semibold text-accent transition hover:text-ocean">
          Return home
        </Link>
      </div>
    </section>
  );
}
