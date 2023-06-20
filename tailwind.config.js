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
        DEFAULT: '20px', // 'rounded' with no suffix
      },
      colors: {
        // i.e. text-primary bg-primary ...
        primary: colors.neutral[900],
        secondary: {
          light: colors.neutral[100],
          'light-hover': colors.neutral[200],
          medium: colors.neutral[400],
          DEFAULT: colors.neutral[500],
        },
        accent: {
          DEFAULT: colors.orange[400],
          text: colors.orange[500],
        },
        hover: colors.amber[500],
        skeleton: colors.neutral[200],
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
    ({ addUtilities }) => {
      addUtilities({
        '.awt-header': {
          '@apply bg-secondary-light pb-16 pt-40 uppercase md:-mt-20': {},
        },
        '.awt-section': {
          '@apply py-16 md:py-24': {},
        },
        /* Centers with 20px of padding, max width 1440px */
        '.awt-center': {
          '@apply px-[max((calc((100vw-1440px)/2)),20px)]': {},
        },
        '.awt-accordion-open': {
          '@apply grid-rows-[1fr]': {},
        },
        '.awt-accordion-closed': {
          '@apply grid-rows-[0fr]': {},
        },
      });
    },
  ],
};
