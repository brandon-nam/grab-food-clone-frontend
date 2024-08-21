const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1cad46"
      },
      maxWidth: {
        "custom-xl": "1200px"
      },
      width: {
        "custom-lg": "515px"
      }
    },
  },
  plugins: [],
}