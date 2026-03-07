import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!getAllPostSlugs().includes(slug)) {
    return { title: "Post not found | Suvamsh Shivaprasad" };
  }

  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} | Suvamsh Shivaprasad`,
    description: post.excerpt || undefined
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!getAllPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  return (
    <article className="fade-up surface px-6 py-8 shadow-card md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent/65">{post.dateLabel}</p>
      <h1 className="matrix-title mt-2 font-display text-5xl leading-tight text-accent">{post.title}</h1>
      <div className="content mt-6 max-w-none text-lg text-ink/90" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
