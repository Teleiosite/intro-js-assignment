import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F5F3FF",
          500: "#6C3FC8",
          700: "#4C1D95",
          DEFAULT: "#6C3FC8",
          foreground: "#FFFFFF"
        },
        accent: {
          50: "#FAF5FF",
          500: "#E9D9FF",
          DEFAULT: "#E9D9FF"
        }
      }
    }
  },
  plugins: []
};

export default config;
