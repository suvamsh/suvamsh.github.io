import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="terminal-statusline">
        <span>Suvamsh Shivaprasad</span>
        <span className="terminal-statusline-links">
          <Link href="/rss.xml">rss</Link>
          <Link href="/atom.xml">atom</Link>
        </span>
      </div>
    </footer>
  );
}
