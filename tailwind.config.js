/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#fceef4',
        rose: '#c65487',
        plum: '#5d2a4e',
        mint: '#2f9d8f',
        amber: '#d59f27',
        coral: '#ca5c63',
      },
    },
  },
  plugins: [],
};
