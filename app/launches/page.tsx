import Image from "next/image";
import Link from "next/link";
import { launches } from "@/lib/launches";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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
                  {launch.href.includes("github.com") ? (
                    <>
                      <GitHubIcon />
                      Visit on GitHub
                    </>
                  ) : (
                    <>
                      Visit website
                      <ExternalLinkIcon />
                    </>
                  )}
                </Link>
              </div>

              <Link
                href={launch.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${launch.title}`}
                className="group block bg-[#16161e]"
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
