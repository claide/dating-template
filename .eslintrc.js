module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    // requireConfigFile: false,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'prettier'],
  // add your custom rules here
  rules: {
    // 'prettier/prettier': ['error'],
    // 'vue/html-indent': ['error', 2],
    // 'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    // 'import/no-named-as-default': 0,
    // 'vue/valid-v-slot': [
    //   'error',
    //   {
    //     allowModifiers: true,
    //   },
    // ],
  },
  globals: {
    $nuxt: true,
  },
}
