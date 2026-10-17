/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        panel: "#0d0d0f",
        ink: "#f5f5f5",
        accent: "#d4af37",
        clay: "#525252",
        sunrise: "#a3a3a3",
        ocean: "#e9c766",
        primary: "#d4af37",
        secondary: "#e9c766",
        tertiary: "#a3a3a3",
        violet: "#d4af37",
        sky: "#ffffff",
        mint: "#e5e5e5",
        peach: "#f0d089",
        gold: "#d4af37",
        rose: "#d9d9d9",
        comment: "#737373"
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]
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
        card: "0 16px 40px rgba(0, 0, 0, 0.55)",
        neon: "0 0 22px rgba(212, 175, 55, 0.28)"
      }
    }
  },
  plugins: []
};
