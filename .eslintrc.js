// {
//
//   "rules": {
//     "curly": "error",
//     "eol-last": "warn",
//     "no-const-assign": "warn",
//     "no-this-before-super": "warn",
//     "no-undef": "warn",
//     "no-unreachable": "warn",
//     "no-unused-vars": "warn",
//     "constructor-super": "warn",
//     "valid-typeof": "warn",
//     "no-extend-native": "off",
//     "no-inner-declarations": "off",
//
//   },
//
// }
// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'vue',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    "space-before-function-paren": ["error", "never"],
    //大括号都不需要空格
    'space-before-blocks': ["error", "never"],
    //函数后面一直没有空格

    //if等语句不需要空格
    'keyword-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  "globals": {
    'nav':true,
    'require':false
  }
}
