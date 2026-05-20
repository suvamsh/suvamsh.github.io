import Image from "next/image";
import Link from "next/link";
import { launches } from "@/lib/launches";

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M7 4.5h8.5V13M15.25 4.75 5 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export const metadata = {
  title: "Launches | Suvamsh Shivaprasad",
  description: "Products, open source software, and companies shipped by Suvamsh Shivaprasad."
};

export default function LaunchesPage() {
  return (
    <div className="space-y-7">
      <section className="fade-up surface px-5 py-6 shadow-card sm:px-6 sm:py-8 md:px-10">
        <h1 className="matrix-title font-display text-4xl leading-tight text-accent sm:text-[2.75rem] md:text-5xl">
          Launches
        </h1>
      </section>

      <div className="space-y-6">
        {launches.map((launch, index) => (
          <article
            key={launch.href}
            className="fade-up overflow-hidden rounded-lg border border-tertiary/25 bg-panel/70 shadow-card backdrop-blur-md"
            style={{ animationDelay: `${120 + index * 110}ms` }}
          >
            <div className="grid gap-0 lg:grid-cols-[minmax(17rem,0.58fr)_minmax(0,1fr)]">
              <div className="flex flex-col justify-between gap-8 border-b border-tertiary/15 px-5 py-6 sm:px-6 sm:py-7 md:px-8 lg:border-b-0 lg:border-r">
                <div>
                  <h2 className="break-words font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                    {launch.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink/76 sm:text-base">{launch.summary}</p>
                </div>

                <Link
                  href={launch.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md border border-secondary/55 bg-secondary/10 px-5 py-3 text-sm font-semibold text-secondary transition hover:border-secondary/80 hover:bg-secondary/20"
                >
                  Visit website
                  <ExternalLinkIcon />
                </Link>
              </div>

              <Link
                href={launch.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${launch.title}`}
                className="group block bg-[#020b14]"
              >
                <Image
                  src={launch.image}
                  alt={launch.imageAlt}
                  width={1440}
                  height={1100}
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="aspect-[16/10] h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.015]"
                  priority={index === 0}
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
