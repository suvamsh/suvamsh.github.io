"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "home" },
  { href: "/launches", label: "launches" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" }
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span className={clsx("absolute left-0 top-0.5 h-px w-5 bg-accent transition duration-300", open && "translate-y-[6px] rotate-45")} />
      <span className={clsx("absolute left-0 top-[7px] h-px w-5 bg-accent transition duration-300", open && "opacity-0")} />
      <span className={clsx("absolute left-0 top-[13px] h-px w-5 bg-accent transition duration-300", open && "-translate-y-[6px] -rotate-45")} />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isNavItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/about" && pathname === "/resume") return true;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-topbar">
      <nav className="terminal-nav" aria-label="Primary navigation">
        <Link href="/" className="terminal-brand" onClick={() => setIsMenuOpen(false)}>
          <span>suvamsh@site</span>
          <span className="text-tertiary/70">:~$</span>
        </Link>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          className="terminal-menu-button lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MenuIcon open={isMenuOpen} />
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx("terminal-nav-link", isActive && "is-active")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  /{item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={clsx("terminal-mobile-nav lg:hidden", isMenuOpen && "is-open")}>
          <ul id="site-navigation">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx("terminal-nav-link", isActive && "is-active")}
                    onClick={() => setIsMenuOpen(false)}
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    /{item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
