/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2', // Base primary color
          dark: '#357ABD',    // Darker shade for hover states
          light: '#6BA5E7',   // Lighter shade for backgrounds
        },
        secondary: {
          DEFAULT: '#6B7280', // Base secondary color
          dark: '#4B5563',    // Darker shade for hover states
          light: '#9CA3AF',   // Lighter shade for backgrounds
        },
        accent: {
          DEFAULT: '#F59E0B', // Base accent color
          dark: '#D97706',    // Darker shade for hover states
          light: '#FBBF24',   // Lighter shade for backgrounds
        },
        neutral: {
          DEFAULT: '#6B7280',
          dark: '#374151',
          light: '#F3F4F6',
        }
      },
      fontFamily: {
        heading: ['Raleway', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
