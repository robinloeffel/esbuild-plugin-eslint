const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: "sweet",
  overrides: [{
    files: "./source/index.ts",
    rules: {
      "no-console": "off",
      "unicorn/no-null": "off",
      "@stylistic/lines-around-comment": [
        "error",
        {
          allowEnumStart: true,
          allowInterfaceStart: true,
          allowModuleStart: true,
          allowTypeStart: true
        }
      ]
    }
  }, {
    files: "./test/cases/warnings.js",
    rules: {
      "func-style": "warn",
      "no-unused-vars": "warn",
      "no-empty-function": "warn"
    }
  }]
});
