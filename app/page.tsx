import { HomeHero } from "@/components/home-hero";
import { launches } from "@/lib/launches";
import { getSortedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getSortedPosts();

  return <HomeHero posts={posts} launches={launches} />;
}
