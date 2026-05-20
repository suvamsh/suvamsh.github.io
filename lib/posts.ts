import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  keywords: string[];
  heroImage?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  return fs.readFileSync(fullPath, "utf8");
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function optionalNumber(value: unknown) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : undefined;
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getSortedPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const raw = readPostFile(slug);
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? "1970-01-01"),
        dateLabel: formatDate(String(data.date ?? "1970-01-01")),
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
        heroImage: optionalString(data.heroImage),
        heroImageAlt: optionalString(data.heroImageAlt),
        heroImageWidth: optionalNumber(data.heroImageWidth),
        heroImageHeight: optionalNumber(data.heroImageHeight)
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string) {
  const raw = readPostFile(slug);
  const { data, content } = matter(raw);
  const processed = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "1970-01-01"),
    dateLabel: formatDate(String(data.date ?? "1970-01-01")),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    heroImage: optionalString(data.heroImage),
    heroImageAlt: optionalString(data.heroImageAlt),
    heroImageWidth: optionalNumber(data.heroImageWidth),
    heroImageHeight: optionalNumber(data.heroImageHeight),
    contentHtml: processed.toString()
  };
}
