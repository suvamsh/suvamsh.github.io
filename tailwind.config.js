/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#001326",
        panel: "#08203a",
        ink: "#dbe2e6",
        accent: "#2f78b8",
        clay: "#8f9aa0",
        sunrise: "#a5acaf",
        ocean: "#69be28",
        primary: "#2f78b8",
        secondary: "#69be28",
        tertiary: "#a5acaf"
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
        card: "0 16px 40px rgba(0, 34, 68, 0.35)",
        neon: "0 0 22px rgba(47, 120, 184, 0.35)"
      }
    }
  },
  plugins: []
};
