/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.js',
    './**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        lightBackground: '#ffffff',
        darkBackground: '#000000',
        lightText: '#000000',
        darkText: '#ffffff',
      },
    },
  },
  plugins: [],
}

