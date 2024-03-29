/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.tsx'],
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
          medium: colors.neutral[400],
          DEFAULT: colors.neutral[500],
        },
        accent: {
          DEFAULT: colors.orange[500],
          light: colors.orange[400],
        },
      },
      maxWidth: {
        card: 'min(80vw,260px)',
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
          '@apply pt-8 pb-14 odd:bg-secondary-light': {},
        },
        '.awt-home-section': {
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
