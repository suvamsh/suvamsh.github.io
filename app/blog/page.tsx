import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Suvamsh Shivaprasad"
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="fade-up surface px-5 py-6 shadow-card sm:px-6 sm:py-8 md:px-10">
      <h1 className="matrix-title font-display text-4xl leading-tight text-accent sm:text-[2.75rem] md:text-5xl">
        Blog
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/50">
        All opinions expressed here are my own and do not represent those of my employer or any other organization.
      </p>

      <div className="mt-8 divide-y divide-ink/10">
        {posts.map((post) => (
          <article key={post.slug} className="py-5 first:pt-0 last:pb-0 sm:py-6">
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-[1.4rem] p-1 transition hover:bg-white/[0.02] focus-visible:bg-white/[0.03]"
            >
              <h2 className="break-words font-display text-2xl font-semibold leading-tight text-ink transition group-hover:text-accent sm:text-[1.8rem]">
                {post.title}
              </h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45 sm:text-sm">
                {post.dateLabel}
              </p>
              {post.excerpt ? <p className="mt-2 max-w-3xl leading-7 text-ink/72">{post.excerpt}</p> : null}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
