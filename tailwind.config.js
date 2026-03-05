/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#020406",
        panel: "#0a1111",
        ink: "#dcffe6",
        accent: "#4cff7a",
        clay: "#ff4d4d",
        sunrise: "#84ffb0",
        ocean: "#3df2ff"
      },
      fontFamily: {
        sans: ["JetBrains Mono Variable", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        display: ["Orbitron Variable", "JetBrains Mono Variable", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        flicker: {
          "0%, 18%, 22%, 63%, 67%, 100%": { opacity: "1" },
          "20%, 64%": { opacity: "0.82" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.65s ease forwards",
        flicker: "flicker 4s linear infinite"
      },
      boxShadow: {
        card: "0 16px 40px rgba(3, 255, 122, 0.08)",
        neon: "0 0 22px rgba(76, 255, 122, 0.32)"
      }
    }
  },
  plugins: []
};
