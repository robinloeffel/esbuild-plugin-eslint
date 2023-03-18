const { ESLint } = require('eslint');
const getMessages = require('./util/get-messages');

const pluginName = 'eslint';

module.exports = ({
  filter = /\.(jsx?|tsx?|vue|svelte)$/,
  throwOnError = false,
  throwOnWarning = false,
  ...eslintOptions
} = {}) => ({
  name: pluginName,
  setup(build) {
    const eslint = new ESLint(eslintOptions);
    const filesToLint = [];

    build.onLoad({ filter }, ({ path }) => {
      if (!path.includes('node_modules')) {
        filesToLint.push(path);
      }
    });

    build.onEnd(async () => {
      const results = await eslint.lintFiles(filesToLint);
      const formatter = await eslint.loadFormatter('stylish');
      const output = formatter.format(results);

      if (eslintOptions.fix) {
        ESLint.outputFixes(results);
      }

      if (output.length > 0) {
        console.log(output);
      }

      if (throwOnError) {
        const errors = getMessages(results, 2);
        if (errors.length > 0) {
          return { errors };
        }
      }

      if (throwOnWarning) {
        const warnings = getMessages(results, 1);
        if (warnings.length > 0) {
          return { warnings };
        }
      }

      return null;
    });
  }
});
