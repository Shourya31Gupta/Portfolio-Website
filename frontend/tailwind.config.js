/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/shadcn/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        // optional: extend your custom colors here if needed
      },
      backgroundImage: {
        "awards-pattern": "url('/src/assets/awards-bg.png')",
      },
      blur: {
        '10': '10px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
