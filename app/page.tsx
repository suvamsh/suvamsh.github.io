import Image from "next/image";
import Link from "next/link";

const focusAreas = [
  "Building practical software products end-to-end",
  "Machine learning systems and applied NLP",
  "Product-minded engineering with clean interfaces"
];

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <section className="fade-up overflow-hidden rounded-[2rem] border border-accent/35 bg-gradient-to-br from-[#020806] via-[#03120d] to-[#020507] p-7 text-ink shadow-card md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.45fr_auto]">
          <div className="space-y-5">
            <p className="eyebrow">Software Engineer</p>
            <h1 className="matrix-title font-display text-5xl leading-[0.92] tracking-[0.03em] text-accent md:text-7xl">
              Suvamsh Shivaprasad
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#b7e9c8]">
              I like building useful things that combine great engineering with strong product taste. This site is my
              home base for projects, writing, and everything I am currently exploring.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/blog"
                className="rounded-full border border-accent bg-accent/15 px-5 py-2.5 text-sm font-semibold text-accent shadow-neon transition hover:bg-accent/25"
              >
                Read the blog
              </Link>
              <Link
                href="/pdfs/suvamsh_resume.pdf"
                className="rounded-full border border-accent/45 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:bg-accent/10"
              >
                View resume
              </Link>
            </div>
          </div>
          <div className="mx-auto h-72 w-56 overflow-hidden rounded-3xl border border-accent/45 bg-black/35 shadow-neon">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Suvamsh Shivaprasad"
              width={640}
              height={768}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {focusAreas.map((item, index) => (
          <article
            key={item}
            className="fade-up surface px-5 py-5 shadow-card"
            style={{ animationDelay: `${120 + index * 130}ms` }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent/90">Focus {index + 1}</p>
            <h2 className="mt-3 text-xl font-semibold leading-snug text-ink">{item}</h2>
          </article>
        ))}
      </section>

      <section className="fade-up surface grid gap-8 px-6 py-8 shadow-card md:grid-cols-[1.3fr_1fr] md:px-10">
        <div>
          <h2 className="matrix-title font-display text-4xl font-semibold text-accent">System Online For What Comes Next</h2>
          <p className="mt-4 text-base leading-8 text-[#b8e1c7]">
            This rebuild moves the site to a maintainable setup with React components, Tailwind styling, and markdown
            posts. It is intentionally lightweight so new pages and writing can be added quickly.
          </p>
        </div>
        <div className="rounded-2xl border border-accent/20 bg-black/30 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent/80">Quick links</p>
          <ul className="mt-4 space-y-3 text-base font-semibold text-ink/90">
            <li>
              <Link href="/about" className="transition hover:text-accent">
                About and background
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition hover:text-accent">
                Writing archive
              </Link>
            </li>
            <li>
              <Link href="https://github.com/suvamsh" className="transition hover:text-accent">
                GitHub profile
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
