import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0B",
        carbon: "#121214",
        graphite: "#1C1C20",
        gold: {
          DEFAULT: "#C9A227",
          bright: "#E6C66B",
          deep: "#9C7C1A",
        },
        ivory: "#F5F3EC",
        ash: "#8C8C92",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        floatGlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.5" },
          "50%": { transform: "translate(2%, -3%) scale(1.05)", opacity: "0.75" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        floatGlow: "floatGlow 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
