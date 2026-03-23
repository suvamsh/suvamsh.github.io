import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Suvamsh Shivaprasad"
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="fade-up surface px-6 py-8 shadow-card md:px-10">
      <h1 className="matrix-title font-display text-5xl leading-tight text-accent">Blog</h1>
      <p className="mt-2 text-sm text-ink/40">All opinions expressed here are my own and do not represent those of my employer or any other organization.</p>

      <div className="mt-8 divide-y divide-ink/10">
        {posts.map((post) => (
          <article key={post.slug} className="py-5 first:pt-0 last:pb-0">
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="font-display text-2xl font-semibold text-ink transition group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-ink/50">{post.dateLabel}</p>
              {post.excerpt ? <p className="mt-1 text-ink/70">{post.excerpt}</p> : null}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
