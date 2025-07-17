/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F9F6F1',
        },
        surface: '#FFFDFC',
        panel: '#F3EBE3',
        primary: {
          DEFAULT: '#40342E',
          dark: '#2C241E',
        },
        secondary: {
          DEFAULT: '#86786B',
          dark: '#6D645C',
        },
        accent: {
          DEFAULT: '#DFBFAA',
          light: '#FCE8DF',
          dark: '#B89B8A',
        },
        highlight: {
          yellow: '#FFD384',
          pink: '#F4C7C3',
          lavender: '#D9D6F2',
          green: '#A3B18A',
        },
        success: '#9CBCA5',
        warning: '#F4C684',
        error: '#D08C8C',
        border: '#E1D9D0',
        text: {
          primary: '#40342E',
          secondary: '#6D645C',
        },
      },
      fontFamily: {
        heading: ['Raleway', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
    },
  },
  plugins: [],
}
