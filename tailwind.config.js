/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f6f2",
          100: "#dde9df",
          200: "#bdd3c1",
          300: "#95b79c",
          400: "#6E9F7A",
          500: "#567f61",
          600: "#42664d",
          700: "#35513e",
          800: "#2b4133",
          900: "#24362a",
        },
        cream: "#faf7f2",
        "cream-warm": "#FFF4E6",
        ink: "#2D1810",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Inter",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
};
