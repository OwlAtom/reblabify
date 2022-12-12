module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    // todo: add rules
    "vue/require-default-prop": 0,
    "vue/html-indent": ["error", 4],
    "vue/singleline-html-element-content-newline": 0,
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
  },
  settings: {},
};
