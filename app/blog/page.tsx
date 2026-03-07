import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Suvamsh Shivaprasad"
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="space-y-8">
      <section className="fade-up surface px-6 py-8 shadow-card md:px-10">
        <p className="eyebrow">Writing</p>
        <h1 className="matrix-title mt-2 font-display text-5xl leading-tight text-accent">Blog</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/90">
          Notes on projects, experiments, and ideas I am currently working through.
        </p>
      </section>

      <section className="grid gap-4">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="fade-up surface px-6 py-6 shadow-card"
            style={{ animationDelay: `${120 + index * 120}ms` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent/65">{post.dateLabel}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              <Link href={`/blog/${post.slug}`} className="transition hover:text-accent">
                {post.title}
              </Link>
            </h2>
            {post.excerpt ? <p className="mt-2 text-ink/85">{post.excerpt}</p> : null}
          </article>
        ))}
      </section>
    </div>
  );
}
