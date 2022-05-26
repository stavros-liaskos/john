module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gh-dark': '#0d1117',
        'gh-darkly': '#161b22',
        'gh-border': '#30363d',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
