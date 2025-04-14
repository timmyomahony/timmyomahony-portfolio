const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,.css}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,.css}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#F0F0E8",
        brown: "#72645C",
        ruby: "#ea5038",
      },
      borderWidth: {
        3: "3px",
      },
      scale: {
        105: "105",
      },
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        noto: ["var(--font-noto_serif)", ...defaultTheme.fontFamily.serif],
        overpass: ["var(--font-overpass)", ...defaultTheme.fontFamily.mono],
        ibm: ["var(--font-ibm)", ...defaultTheme.fontFamily.mono],
        // Update the default fonts too
        mono: ["var(--font-ibm)", ...defaultTheme.fontFamily.mono],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "group-hover", "focus", "active"],
    scale: ["responsive", "hover", "group-hover", "focus", "active"],
  },
  plugins: [require("@tailwindcss/typography")],
};
