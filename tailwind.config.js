/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '800px', // 'md:'
      },
      colors: {
        // i.e. text-primary bg-primary ...
        primary: colors.neutral[900],
        secondary: {
          light: colors.neutral[100],
          medium: colors.neutral[200],
          DEFAULT: colors.neutral[400],
        },
        accent: colors.orange[400],
        hover: colors.amber[600],
      },
      borderRadius: {
        DEFAULT: '20px', // 'rounded'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base',
    }),
    require('@tailwindcss/typography'),
  ],
};
