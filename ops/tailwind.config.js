/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        background: "#F8FAFC",
        text: {
          DEFAULT: "#0f172a",
          muted: "#64748b",
          light: "#94a3b8",
        },
      },
      fontFamily: {
        heading: ["var(--font-cairo)", "var(--font-inter)", "sans-serif"],
        sans: ["var(--font-cairo)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -5px rgba(26, 54, 38, 0.08), 0 4px 6px -2px rgba(26, 54, 38, 0.04)",
        gold: "0 8px 20px -4px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
