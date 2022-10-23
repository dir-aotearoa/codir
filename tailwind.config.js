module.exports = {
  content: [
    "./_site/**/*.{html,js,njk,md,svg}",
    "./src/**/*.{html,js,njk,md,svg}",
    "./src/index.html",
    ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
