module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './components/**/*.js',
      './components/**/*.jsx',
      './layouts/**/*.js',
      './layouts/**/*.jsx',
      './pages/**/*.js',
      './pages/**/*.jsx',
    ],
  },
  theme: {
    extend: {
      fontSize: {
        'lg': '4rem',
        'xl': '6rem',
      },
      spacing: {
        '96': '24rem',
        '112': '28rem',
        'full': '100%',
        '80vh': '80vh',
      },
      zIndex: {
        'neg-10': -10,
      },
    },
  },
  variants: {},
  plugins: [],
}
