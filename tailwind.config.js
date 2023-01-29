/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js', './src/**/*.jsx', './components/**/*/jsx', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary': '#111010',
        'secondary': '#fefefe',
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
}