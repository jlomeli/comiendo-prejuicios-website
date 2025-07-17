/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7ECBC0', // Mint green - new primary color
          dark: '#65AEA4',    // Darker mint for hover states
          light: '#A6DED7',   // Lighter mint for backgrounds
        },
        secondary: {
          DEFAULT: '#3A3A3A', // Dark gray for text
          dark: '#2A2A2A',    // Darker gray for hover states
          light: '#5A5A5A',   // Lighter gray for secondary text
        },
        accent: {
          DEFAULT: '#F9C17C', // Soft orange/yellow accent
          dark: '#E5A95F',    // Darker accent for hover states
          light: '#FBD5A0',   // Lighter accent for backgrounds
        },
        neutral: {
          DEFAULT: '#767676',
          dark: '#3A3A3A',
          light: '#F5F2EB', // Cream/beige background
        },
        background: {
          DEFAULT: '#F9F6F0', // Main background color (cream/beige)
          card: '#FFFFFF',    // Card background color
        }
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
