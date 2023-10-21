/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ["Poppins", "sans-serif"],

    },

    extend: {
      boxShadow: {
        '3xl': '0px 0px 6px 0px rgba(0, 0, 0, 0.8)',
      },
      colors: {
        purple: {
          400: "#C4A2F2",
          600: "#9C5EF2",
          800: "#6D0FF2",
          850:"#5005F2"
        },
        black: {
          800: "#0C0C0C"
        },
        gray:{
          100:"#f2f2f2",
        }
      }
    },
  },
  plugins: [],
}