import { generateRssFeed } from "@/lib/feed";

export const dynamic = "force-static";

export async function GET() {
  const body = await generateRssFeed();

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
