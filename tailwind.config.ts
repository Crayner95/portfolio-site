import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F0E8",
        "ivory-light": "#ffffff",
        charcoal: "#1C1C1C",
        gold: "#9AA0F0",
        rust: "#7A80D0",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        cormorant: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
