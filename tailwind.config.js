/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      digitalMono: ["'Digital-7 Mono'", "monospace"],
      digital: ["'Digital-7'", "sans-serif"],
      sfPro: ["'SF-Pro'", "sans-serif"],
    },
    extend: {
      colors: {
        lightGray: "#cdcfcd",
      },
      // letterSpacing: {
      //   tight: "-1rem",
      // },
    },
  },
  plugins: [],
};
