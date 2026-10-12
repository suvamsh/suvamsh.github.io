/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#1a1b26",
        panel: "#24283b",
        ink: "#c0caf5",
        accent: "#7aa2f7",
        clay: "#565f89",
        sunrise: "#9aa5ce",
        ocean: "#9ece6a",
        primary: "#7aa2f7",
        secondary: "#9ece6a",
        tertiary: "#9aa5ce",
        violet: "#bb9af7",
        sky: "#7dcfff",
        mint: "#73daca",
        peach: "#ff9e64",
        gold: "#e0af68",
        rose: "#f7768e",
        comment: "#565f89"
      },
      fontFamily: {
        sans: ["JetBrains Mono Variable", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        display: ["Orbitron Variable", "JetBrains Mono Variable", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.65s ease forwards"
      },
      boxShadow: {
        card: "0 16px 40px rgba(10, 10, 18, 0.45)",
        neon: "0 0 22px rgba(122, 162, 247, 0.35)"
      }
    }
  },
  plugins: []
};
