import { roboto } from "@/components/font";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-manrope)", "serif"],
        mono: ["var(--font-manrope)", "monospace"],
        roboto: ["var(--font-roboto)", "sans-serif"],
    },
  },
  },
  plugins: [],
};
export default config;
