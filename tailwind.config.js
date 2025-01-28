/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.jsx", "./*.html"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "800px",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
