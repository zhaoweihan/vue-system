module.exports = {
    root: true,
    parserOptions: {
      parser: "babel-eslint",
      sourceType: 'module'
    },
    env: {
      browser: true,
    },
    parser: "vue-eslint-parser",
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',

    // required to lint *.vue files
    plugins: [
      'html',
      'vue'
    ],
    // add your custom rules here
    'rules': {
      'no-new': 0,
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 2 : 0
    }
  }
