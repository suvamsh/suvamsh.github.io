import Link from "next/link";

export default function NotFound() {
  return (
    <section className="surface px-6 py-10 text-center shadow-card md:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent/80">404</p>
      <h1 className="matrix-title mt-2 font-display text-5xl text-accent">Page not found</h1>
      <p className="mt-3 text-ink/90">The page you requested does not exist.</p>
      <div className="mt-6">
        <Link href="/" className="font-semibold text-accent transition hover:text-ocean">
          Return home
        </Link>
      </div>
    </section>
  );
}
