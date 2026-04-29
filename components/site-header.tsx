"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/launches", label: "Launches" },
  { href: "/about", label: "About me" },
  { href: "/blog", label: "Blog" }
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={clsx(
          "absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-accent transition duration-300",
          open && "translate-y-[6px] rotate-45"
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-accent transition duration-300",
          open && "opacity-0"
        )}
      />
      <span
        className={clsx(
          "absolute left-0 top-[13px] h-0.5 w-5 rounded-full bg-accent transition duration-300",
          open && "-translate-y-[6px] -rotate-45"
        )}
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isNavItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/about" && pathname === "/resume") {
      return true;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="mx-auto mt-3 w-full max-w-6xl px-4 sm:px-5 md:mt-4 md:px-10">
      <nav className="surface relative px-4 py-3 sm:px-5 md:px-7 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="matrix-title font-display text-2xl font-semibold tracking-[0.08em] text-accent transition hover:text-ink sm:text-3xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Suvamsh
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-panel/60 text-accent transition hover:border-accent/60 hover:bg-accent/10 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <MenuIcon open={isMenuOpen} />
          </button>

          <ul className="hidden items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent/75 lg:flex">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "inline-flex rounded-full border px-3 py-2 transition",
                      isActive
                        ? "border-accent/45 bg-accent/10 text-accent"
                        : "border-transparent hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          aria-hidden={!isMenuOpen}
          className={clsx(
            "grid transition-all duration-300 lg:hidden",
            isMenuOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <ul
              id="site-navigation"
              className="space-y-2 border-t border-accent/10 pt-4 text-sm font-semibold uppercase tracking-[0.12em]"
            >
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        "flex items-center justify-between rounded-2xl border px-4 py-3 transition",
                        isActive
                          ? "border-accent/35 bg-accent/10 text-accent"
                          : "border-tertiary/15 bg-panel/45 text-ink/85 hover:border-accent/25 hover:bg-accent/5 hover:text-accent"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      <span>{item.label}</span>
                      <span className="text-accent/45">{isActive ? "Current" : "Open"}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
