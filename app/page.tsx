import { TerminalHome } from "@/components/terminal-home";
import { launches } from "@/lib/launches";
import { getSortedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getSortedPosts();

  return <TerminalHome posts={posts} launches={launches} />;
}
