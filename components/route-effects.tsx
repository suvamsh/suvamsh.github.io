"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const noScroll = pathname === "/";
    document.body.classList.toggle("home-no-scroll", noScroll);
    return () => {
      document.body.classList.remove("home-no-scroll");
    };
  }, [pathname]);

  return null;
}
