/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pixelify Sans", "Arial", "sans-serif"],
      },
      colors: {
        darkGreen: "var(--darkGreen)",
        vibrantGreen: "var(--vibrantGreen)",
        lightYellow: "var(--lightYellow)",
        lightBeige: "var(--lightBeige)",
        mediumBeige: "var(--mediumBeige)",
        back: "var(--back)",
        text: "var(--text)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "var(--darkGreen) transparent",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: "20px",
            border: "1px solid var(--lightBeige)",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
