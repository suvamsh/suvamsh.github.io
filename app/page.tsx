import Image from "next/image";
import Link from "next/link";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 0C5.37 0 0 5.5 0 12.28c0 5.42 3.44 10.01 8.21 11.63.6.11.82-.27.82-.59 0-.29-.01-1.07-.02-2.11-3.34.74-4.04-1.65-4.04-1.65-.55-1.42-1.34-1.8-1.34-1.8-1.1-.77.08-.76.08-.76 1.22.09 1.86 1.29 1.86 1.29 1.08 1.9 2.84 1.35 3.53 1.03.11-.8.42-1.35.76-1.66-2.67-.31-5.47-1.37-5.47-6.09 0-1.35.47-2.45 1.25-3.32-.13-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.27a11.2 11.2 0 0 1 6 0c2.29-1.6 3.3-1.27 3.3-1.27.66 1.71.25 2.97.12 3.28.78.87 1.25 1.97 1.25 3.32 0 4.73-2.8 5.77-5.48 6.08.43.38.82 1.12.82 2.26 0 1.63-.02 2.94-.02 3.34 0 .33.22.71.83.59C20.56 22.28 24 17.7 24 12.28 24 5.5 18.63 0 12 0Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M20.45 20.45H16.9v-5.56c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.36 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.14 20.45H3.58V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M18.9 2H22l-6.76 7.72L23.2 22h-6.23l-4.88-6.9L6.05 22H2.94l7.23-8.26L.8 2h6.38l4.4 6.24L18.9 2Zm-1.1 18.1h1.72L6.25 3.8H4.4l13.4 16.3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M7.75 2h8.5C19.42 2 22 4.58 22 7.75v8.5C22 19.42 19.42 22 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5C2 4.58 4.58 2 7.75 2Zm-.2 1.8A3.75 3.75 0 0 0 3.8 7.55v8.9a3.75 3.75 0 0 0 3.75 3.75h8.9a3.75 3.75 0 0 0 3.75-3.75v-8.9a3.75 3.75 0 0 0-3.75-3.75h-8.9Zm9.65 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="-mb-16 -mt-8 flex h-[calc(100vh-6.5rem)] items-center overflow-hidden py-8">
      <section className="fade-up relative overflow-hidden rounded-[2rem] border border-primary/35 bg-gradient-to-br from-[#001b35] via-[#062949] to-[#00152a] p-7 text-ink shadow-card md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-secondary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-tertiary/20 blur-3xl" />
        <div className="grid items-center gap-8 md:grid-cols-[1.45fr_auto]">
          <div className="space-y-5 relative z-10">
            <h1 className="matrix-title font-display text-5xl leading-[0.92] tracking-[0.03em] text-accent md:text-7xl">
              Suvamsh Shivaprasad
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/90">i build things</p>
            <div className="flex flex-wrap gap-3 text-ink/90">
              <Link
                href="https://github.com/suvamsh"
                aria-label="GitHub"
                className="rounded-full border border-tertiary/40 bg-panel/60 p-2 transition hover:border-secondary/70 hover:text-secondary"
              >
                <GitHubIcon />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/suvamsh-shivaprasad-5aab3860/"
                aria-label="LinkedIn"
                className="rounded-full border border-tertiary/40 bg-panel/60 p-2 transition hover:border-secondary/70 hover:text-secondary"
              >
                <LinkedInIcon />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://x.com/suvamsh"
                aria-label="X"
                className="rounded-full border border-tertiary/40 bg-panel/60 p-2 transition hover:border-secondary/70 hover:text-secondary"
              >
                <XIcon />
                <span className="sr-only">X</span>
              </Link>
              <Link
                href="https://www.instagram.com/suvamsh"
                aria-label="Instagram"
                className="rounded-full border border-tertiary/40 bg-panel/60 p-2 transition hover:border-secondary/70 hover:text-secondary"
              >
                <InstagramIcon />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/blog"
                className="rounded-full border border-secondary bg-secondary/15 px-5 py-2.5 text-sm font-semibold text-secondary transition hover:bg-secondary/25"
              >
                Read the blog
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-tertiary/55 bg-tertiary/10 px-5 py-2.5 text-sm font-semibold text-tertiary transition hover:border-tertiary/70 hover:bg-tertiary/20"
              >
                About me
              </Link>
            </div>
          </div>
          <div className="relative z-10 mx-auto h-72 w-56 overflow-hidden rounded-3xl border border-tertiary/45 bg-panel/70 shadow-neon">
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
    </div>
  );
}
