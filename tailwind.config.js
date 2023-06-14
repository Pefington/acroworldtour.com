/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
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
          medium: colors.neutral[400],
          DEFAULT: colors.neutral[500],
        },
        accent: {
          DEFAULT: colors.orange[400],
          text: colors.orange[500],
        },
        hover: colors.amber[500],
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
  ],
};
