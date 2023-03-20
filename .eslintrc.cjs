/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: "sweet",
  rules: {
    "no-console": "off",
    "unicorn/no-null": "off"
  },
  overrides: [{
    files: "test/cases/warnings.js",
    rules: {
      "func-style": "warn",
      "no-unused-vars": "warn",
      "no-empty-function": "warn"
    }
  }]
};
