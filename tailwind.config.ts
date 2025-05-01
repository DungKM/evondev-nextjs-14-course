import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF90BB"
      },
      fontFamily: {
        primary: ["var(--font-manrope)", "sans-serif"],
    },
  },
  },
  plugins: [],
};
export default config;
