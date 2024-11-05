import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: "#3B82F6",
        "blue-deep": "#2563EB",
        "clr-light": "rgb(0, 0, 0)",
        "clr-light-start-rgb": "rgb(214, 219, 220)",
        "clr-light-end-rgb": "rgb(255, 255, 255)",
        "clr-dark": "rgb(255, 255, 255)",
        "clr-dark-start-rgb": "rgb(0, 0, 0)",
        "clr-dark-end-rgb": "rgb(0, 0, 0)",
      },
      backgroundColor: {
        light: "rgb(214, 219, 220)",
        dark: "rgb(0, 0, 0)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  darkMode: "class",
};
export default config;
