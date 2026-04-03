import { getPostBySlug, getSortedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function absolutizeHtmlUrls(html: string) {
  return html.replaceAll(/(?:src|href)="(\/[^"]*)"/g, (match, url) =>
    match.replace(url, toAbsoluteUrl(url))
  );
}

function toRfc2822Date(value: string) {
  return new Date(value).toUTCString();
}

function toIsoDate(value: string) {
  return new Date(value).toISOString();
}

export async function generateRssFeed() {
  const posts = await Promise.all(
    getSortedPosts().map(async (post) => {
      const fullPost = await getPostBySlug(post.slug);

      return {
        ...post,
        contentHtml: absolutizeHtmlUrls(fullPost.contentHtml)
      };
    })
  );

  const lastBuildDate = posts[0] ? toRfc2822Date(posts[0].date) : new Date().toUTCString();
  const items = posts
    .map((post) => {
      const postUrl = toAbsoluteUrl(`/blog/${post.slug}/`);

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${postUrl}</link>
  <guid>${postUrl}</guid>
  <pubDate>${toRfc2822Date(post.date)}</pubDate>
  <description>${escapeXml(post.excerpt)}</description>
  <content:encoded><![CDATA[${post.contentHtml}]]></content:encoded>
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <link>${toAbsoluteUrl("/blog/")}</link>
  <description>${escapeXml(siteConfig.description)}</description>
  <language>en-us</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${toAbsoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${items}
</channel>
</rss>`;
}

export async function generateAtomFeed() {
  const posts = await Promise.all(
    getSortedPosts().map(async (post) => {
      const fullPost = await getPostBySlug(post.slug);

      return {
        ...post,
        contentHtml: absolutizeHtmlUrls(fullPost.contentHtml)
      };
    })
  );

  const updated = posts[0] ? toIsoDate(posts[0].date) : new Date().toISOString();
  const entries = posts
    .map((post) => {
      const postUrl = toAbsoluteUrl(`/blog/${post.slug}/`);

      return `<entry>
  <title>${escapeXml(post.title)}</title>
  <id>${postUrl}</id>
  <link href="${postUrl}" />
  <updated>${toIsoDate(post.date)}</updated>
  <summary>${escapeXml(post.excerpt)}</summary>
  <content type="html"><![CDATA[${post.contentHtml}]]></content>
</entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteConfig.name)}</title>
  <id>${toAbsoluteUrl("/atom.xml")}</id>
  <link href="${toAbsoluteUrl("/atom.xml")}" rel="self" />
  <link href="${toAbsoluteUrl("/blog/")}" />
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(siteConfig.author)}</name>
  </author>
  <subtitle>${escapeXml(siteConfig.description)}</subtitle>
${entries}
</feed>`;
}
