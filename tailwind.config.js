/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pixelify Sans", "Arial", "sans-serif"],
      },
      colors: {
        darkPurple: "#242038",
        vividPurple: "#9067c6",
        softPurple: "#8d86c9",
        lightGray: "#cac4ce",
        cream: "#f7ece1",
      },
    },
  },
  plugins: [],
};
