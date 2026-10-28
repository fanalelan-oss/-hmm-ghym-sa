import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#11345C",
          50: "#F2FAFE",
          100: "#E1F2FB",
          500: "#11345C",
          600: "#0D2A4B",
          800: "#0B2440",
          900: "#081C33",
          950: "#071628",
        },
        signal: {
          DEFAULT: "#208EC1",
          300: "#7FCBEE",
          400: "#4AB0DE",
          500: "#208EC1",
          600: "#1A77A3",
          800: "#125A7D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-tajawal)", "sans-serif"],
        body: ["var(--font-tajawal)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
