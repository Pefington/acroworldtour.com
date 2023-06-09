/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '20px', // 'rounded'
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
      maxWidth: {
        '8xl': '90rem',
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
