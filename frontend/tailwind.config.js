/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        zain: ['Zain', 'sans-serif'], // Define the font here
      },
      colors: {
        'dark-bg': "#171717",
        'green': "#77B91D",
        'grey': "#4B4B4B",
        'grey2': "#313131",
        'grey3': "#A3A3A3",
        
        }
    },
  },
  plugins: [],
}

