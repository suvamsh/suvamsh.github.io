import { notFound } from "next/navigation";
import Image from "next/image";
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
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    openGraph: post.heroImage
      ? {
          title: post.title,
          description: post.excerpt || undefined,
          images: [
            {
              url: post.heroImage,
              width: post.heroImageWidth,
              height: post.heroImageHeight,
              alt: post.heroImageAlt ?? post.title
            }
          ]
        }
      : undefined
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!getAllPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPostBySlug(slug);
  const hasContent = post.contentHtml.trim().length > 0;

  return (
    <article className="fade-up surface px-5 py-6 shadow-card sm:px-6 sm:py-8 md:px-10">
      <p className="mx-auto max-w-3xl text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent/65 sm:text-xs">
        {post.dateLabel}
      </p>
      <h1 className="matrix-title mx-auto mt-3 max-w-4xl break-words text-center font-display text-4xl leading-tight text-accent sm:text-[2.75rem] md:text-5xl">
        {post.title}
      </h1>
      {post.heroImage ? (
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt ?? post.title}
          width={post.heroImageWidth ?? 1536}
          height={post.heroImageHeight ?? 1024}
          priority
          className="mx-auto mt-7 h-auto w-full max-w-5xl rounded-2xl border border-tertiary/15 max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:max-w-none"
        />
      ) : null}
      {hasContent ? (
        <div
          className="content mx-auto mt-6 w-full max-w-3xl text-ink/90"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      ) : null}
    </article>
  );
}
