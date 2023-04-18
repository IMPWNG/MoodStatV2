/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies, global-require */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: {
          100: '#EBF4FF',
          200: '#C3DAFE',
          300: '#A3BFFA',
          400: '#7F9CF5',
          500: '#667EEA',
          600: '#5A67D8',
          700: '#4C51BF',
          800: '#434190',
          900: '#3C366B',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        backgroundColor: {
          'red-500': '#EF4444',
          'red-600': '#DC2626',
          'red-700': '#B91C1C',
          'yellow-500': '#F59E0B',
        },
        dark: {
          100: '#1a1a1a',
          200: '#333333',
          300: '#4d4d4d',
          400: '#666666',
          500: '#808080',
          600: '#999999',
          700: '#b3b3b3',
          800: '#cccccc',
          900: '#e6e6e6',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms', 'flowbite/plugin')],
});
