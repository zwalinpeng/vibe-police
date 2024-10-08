import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      "spotify-green": "#1DB954",
      "spotify-dark-green": "#18a349",
      "spotify-black": "#191414",
      "spotify-grey": "#1f1f1f",
      "hover-grey": "#f2f2f2",
    },
  },
  plugins: [],
};
export default config;
