const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active'],
  },
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}',
  ],
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      colors: {
        primary: '#fbbb0d',
        secondary: '#FEDE4E',
        black: '#191201',
        clay: '#282f3b',
        'black-100': '#151515',
        'primary-100': '#FEF1CF',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-dark-mode')()],
}
