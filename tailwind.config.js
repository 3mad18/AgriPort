/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A3626",
          dark: "#12261b",
          light: "#254e37",
        },
        accent: {
          DEFAULT: "#D4AF37",
          dark: "#b89528",
          light: "#e2c563",
        },
        background: "#F9F9F6",
        text: {
          DEFAULT: "#2C3E50",
          muted: "#5A6B7C",
          light: "#7F8C8D",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "var(--font-cairo)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -5px rgba(26, 54, 38, 0.08), 0 4px 6px -2px rgba(26, 54, 38, 0.04)",
        gold: "0 8px 20px -4px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
