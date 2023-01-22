const eslintConfig = require("../.eslintrc.cjs");
eslintConfig.env.node = true;
module.exports = eslintConfig;
// {
//   root: true,
//   env: {
//     es6: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "google",
//   ],
//   rules: {
//     quotes: ["error", "double"],
//   },
// };
