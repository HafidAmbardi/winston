// tailwind.config.js
const { fontFamily } = "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["plus-jakarta-sans"],
    },
  },
  plugins: [],
};
