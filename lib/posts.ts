import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  return fs.readFileSync(fullPath, "utf8");
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
        dateLabel: formatDate(String(data.date ?? "1970-01-01"))
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string) {
  const raw = readPostFile(slug);
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "1970-01-01"),
    dateLabel: formatDate(String(data.date ?? "1970-01-01")),
    contentHtml: processed.toString()
  };
}
