/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        elegantSerif: ["Playfair Display", "serif"],
        classySerif: ["Prata", "serif"],
        classySans: ["Josefin Sans", "sans-serif"],
      },

    },
  },
  plugins: [],
}

