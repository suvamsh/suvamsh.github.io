import Link from "next/link";

const education = [
  {
    school: "The University of Texas at Austin",
    detail: "B.S. in Computer Science (2015)"
  }
];

export const metadata = {
  title: "About | Suvamsh Shivaprasad"
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="fade-up surface px-6 py-8 shadow-card md:px-10">
        <p className="eyebrow">About</p>
        <h1 className="matrix-title mt-2 font-display text-5xl leading-tight text-accent">Background</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#c1e8cf]">
          I enjoy solving meaningful problems with software. My interests sit at the intersection of engineering,
          machine learning, and product design.
        </p>
      </section>

      <section className="fade-up surface px-6 py-8 shadow-card md:px-10" style={{ animationDelay: "130ms" }}>
        <h2 className="font-display text-3xl font-semibold text-ocean">Education</h2>
        <ul className="mt-4 space-y-3">
          {education.map((item) => (
            <li key={item.school} className="rounded-2xl border border-accent/25 bg-black/30 px-5 py-4">
              <p className="text-lg font-semibold text-ink">{item.school}</p>
              <p className="text-[#aad2ba]">{item.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link href="/pdfs/suvamsh_resume.pdf" className="text-sm font-semibold text-accent hover:text-ocean">
            Download resume
          </Link>
        </div>
      </section>
    </div>
  );
}
