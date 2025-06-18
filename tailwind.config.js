/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,js,ts,jsx,tsx}',
    './src/pages/**/*.{astro,js,ts,jsx,tsx}',
    './src/components/**/*.{astro,js,ts,jsx,tsx}',
    './src/layouts/**/*.{astro,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A6FA5',
        secondary: '#94B0DA',
        accent: '#8E9E82',
        neutral_light: '#F2F4F8',
        neutral_dark: '#333844',
      },
      fontFamily: {
        heading: ['Raleway', 'Poppins', 'sans-serif'],
        body: ['Open Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
