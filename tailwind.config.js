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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "var(--darkPurple) var(--vividPurple)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--darkPurple)",
            borderRadius: "10px",
            border: "3px solid var(--lightGray)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "var(--lightGray)",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
