/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.jsx", "./*.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
