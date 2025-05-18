/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // ← ここ重要！！
  ],
  theme: {
    extend: {},
  },
  // tailwind.config.js
  plugins: [require('@tailwindcss/typography')],

}

