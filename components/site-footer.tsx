import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="terminal-statusline">
        <span>© 2026 Suvamsh Shivaprasad</span>
        <span className="terminal-statusline-links">
          <Link href="/launches">Launches</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/rss.xml">rss</Link>
          <Link href="/atom.xml">atom</Link>
        </span>
      </div>
    </footer>
  );
}
