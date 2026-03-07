import Image from "next/image";
import Link from "next/link";

type TimelineItem = {
  period: string;
  company: string;
  role: string;
  location?: string;
  badge: string;
  badgeClass: string;
  logoPath?: string;
};

const timeline: TimelineItem[] = [
  {
    period: "2024 - Present",
    company: "Meta",
    role: "Software Engineer",
    location: "Menlo Park, CA",
    badge: "M",
    badgeClass: "border-primary/60 bg-primary/15 text-primary",
    logoPath: "/icons/meta.png"
  },
  {
    period: "2023 - 2024",
    company: "mfg.parts",
    role: "CTO, Cofounder",
    badge: "MP",
    badgeClass: "border-secondary/60 bg-secondary/15 text-secondary"
  },
  {
    period: "2021 - 2023",
    company: "GOAT Group",
    role: "Software Engineer",
    badge: "GG",
    badgeClass: "border-tertiary/60 bg-tertiary/15 text-tertiary",
    logoPath: "/icons/goat.png"
  },
  {
    period: "2015 - 2020",
    company: "Microsoft",
    role: "Software Engineer",
    location: "Redmond, WA",
    badge: "MS",
    badgeClass: "border-primary/60 bg-primary/15 text-primary",
    logoPath: "/icons/microsoft.png"
  },
  {
    period: "2014 - 2015",
    company: "SparkCognition",
    role: "Software Engineer",
    location: "Austin, TX",
    badge: "SC",
    badgeClass: "border-secondary/60 bg-secondary/15 text-secondary",
    logoPath: "/icons/sparkcognition.png"
  },
  {
    period: "2014",
    company: "DRW",
    role: "Software Engineer",
    location: "Austin, TX",
    badge: "DRW",
    badgeClass: "border-tertiary/60 bg-tertiary/15 text-tertiary",
    logoPath: "/icons/drw.png"
  },
  {
    period: "2013",
    company: "Qualcomm",
    role: "Software Engineer",
    location: "San Diego, CA",
    badge: "Q",
    badgeClass: "border-primary/60 bg-primary/15 text-primary",
    logoPath: "/icons/qualcomm.png"
  },
  {
    period: "2012",
    company: "GENPACT",
    role: "Software Developer",
    location: "Bengaluru, India",
    badge: "G",
    badgeClass: "border-secondary/60 bg-secondary/15 text-secondary"
  },
  {
    period: "2010",
    company: "Brio Telecom",
    role: "Software Developer",
    location: "Bengaluru, India",
    badge: "BT",
    badgeClass: "border-tertiary/60 bg-tertiary/15 text-tertiary"
  }
];

const highlights = [
  {
    label: "NAACL 2018 publication: Bag of Experts Architectures for Model Reuse in Conversational Language Understanding",
    href: "https://aclanthology.org/N18-3019.pdf"
  },
  {
    label: "US11170819B2 patent: Dynamic video highlight",
    href: "https://patents.google.com/patent/US11170819B2"
  }
];

export const metadata = {
  title: "About | Suvamsh Shivaprasad"
};

export default function AboutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <section className="fade-up surface px-6 py-8 shadow-card md:px-10">
        <h1 className="matrix-title mt-1 font-display text-4xl leading-tight text-accent md:text-5xl">Experience</h1>
        <div className="relative mt-8 space-y-7">
          <div className="pointer-events-none absolute bottom-1 left-2 top-3 w-px bg-accent/25 md:left-[11.5rem]" />
          {timeline.map((item) => (
            <article key={`${item.company}-${item.period}`} className="relative grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8">
              <p className="pl-7 text-xs font-semibold uppercase tracking-[0.14em] text-tertiary/85 md:pl-0 md:pt-1 md:text-right">
                {item.period}
              </p>
              <span className="absolute left-[2px] top-1.5 h-3.5 w-3.5 rounded-full border border-accent/60 bg-panel shadow-neon md:left-[11.08rem]" />

              <div className="ml-7 rounded-2xl border border-accent/20 bg-panel/70 p-5 md:ml-0">
                <div className="flex flex-wrap items-start justify-between gap-3 md:flex-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border text-xs font-bold uppercase tracking-[0.08em] ${item.badgeClass}`}
                    >
                      {item.logoPath ? (
                        <Image
                          src={item.logoPath}
                          alt={`${item.company} logo`}
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-sm object-contain"
                        />
                      ) : (
                        item.badge
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-ink">{item.company}</p>
                      <p className="text-sm text-ink/80">{item.role}</p>
                    </div>
                  </div>
                  {item.location ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tertiary/80 md:ml-4 md:text-right">
                      {item.location}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-5">
        <section className="fade-up surface px-6 py-7 shadow-card md:px-8">
          <h2 className="font-display text-3xl font-semibold text-secondary">About Me</h2>
          <p className="mt-3 text-lg leading-8 text-ink/90">My experience spans across product, engineering, research, and applied AI.</p>
        </section>

        <section className="fade-up surface px-6 py-7 shadow-card md:px-8" style={{ animationDelay: "140ms" }}>
          <h2 className="font-display text-2xl font-semibold text-ocean">Highlights</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-ink/90">
            {highlights.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-semibold text-accent underline decoration-tertiary/60 underline-offset-4 transition hover:text-ocean"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
