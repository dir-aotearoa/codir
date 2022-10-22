module.exports = {
  content: ["./src/**/*.{html,js,njk,md,svg}"],
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
