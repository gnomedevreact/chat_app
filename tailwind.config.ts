import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#075E54",
        normalGreen: "#128C7E",
        lightGreen: "#25D366",
        blue: "#34B7F1",
      },
    },
  },
  plugins: [],
};
export default config;
