module.exports = {
  content: [
    "_site/**/*.{html,js,njk,md,svg}",
    "_site/index.html",
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
