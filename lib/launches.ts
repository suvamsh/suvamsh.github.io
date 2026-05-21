export type Launch = {
  title: string;
  summary: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const launches: Launch[] = [
  {
    title: "Mathu AI",
    summary: "Agent for hotel operations.",
    href: "https://www.mathu.ai",
    image: "/images/launches/mathu.png",
    imageAlt: "Mathu AI landing page screenshot showing the hotel operations agent hero"
  },
  {
    title: "Asthi",
    summary:
      "Portfolio intelligence for tracking net worth, allocations, holdings-aware news, and market research across assets.",
    href: "https://www.asthi.app",
    image: "/images/launches/asthi.png",
    imageAlt: "Asthi landing page screenshot showing a portfolio dashboard hero"
  },
  {
    title: "Screamer",
    summary: "A fast, free speech-to-text app that runs locally and works anywhere you type.",
    href: "https://www.screamer.app",
    image: "/images/launches/screamer.png",
    imageAlt: "Screamer landing page screenshot showing the product hero and feature highlights"
  }
];
