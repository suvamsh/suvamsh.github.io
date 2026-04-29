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
    description: post.excerpt || undefined,
    keywords: post.keywords.length > 0 ? post.keywords : undefined
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!getAllPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  return (
    <article className="fade-up surface px-5 py-6 shadow-card sm:px-6 sm:py-8 md:px-10">
      <p className="mx-auto max-w-3xl text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent/65 sm:text-xs">
        {post.dateLabel}
      </p>
      <h1 className="matrix-title mx-auto mt-3 max-w-4xl break-words text-center font-display text-4xl leading-tight text-accent sm:text-[2.75rem] md:text-5xl">
        {post.title}
      </h1>
      <div
        className="content mx-auto mt-6 w-full max-w-3xl text-ink/90"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
