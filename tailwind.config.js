/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pixelify Sans", "Arial", "sans-serif"],
      },
      colors: {
        darkPurple: "var(--darkPurple)",
        vividPurple: "var(--vividPurple)",
        softPurple: "var(--softPurple)",
        lightGray: "var(--lightGray)",
        cream: "var(--cream)",
      },
    },
  },
  plugins: [],
};
