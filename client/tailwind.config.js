/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        'custom-bg-white': '#f8fafc',
        'custom-light-green': '#a0ecb1',
        'custom-dark-green': '#32d657',
        'custom-pink': '#f7d4d3',
        'custom-orange': '#e9a23b',
        'custom-light-orange': '#f5d565',
        'custom-skin': '#f5e8d5',
        'custom-red': '#dd524c',
        'custom-dark-grey': '#97a3b6',
        'custom-grey': '#00000033',
        'custom-light-grey': '#e3e8ef',
        'custom-blue': '#3662e3',
      },
    },
  },
  plugins: [],
};
