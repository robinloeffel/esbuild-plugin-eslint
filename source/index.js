const { ESLint } = require('eslint');

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
      const [ result ] = await eslint.lintFiles(filesToLint);
      const formatter = await eslint.loadFormatter('stylish');
      const output = formatter.format([ result ]);

      if (eslintOptions.fix) {
        ESLint.outputFixes([ result ]);
      }

      if (output.length > 0) {
        console.log(output);
      }

      if (throwOnError && result.errorCount > 0) {
        return {
          errors: [{
            pluginName,
            text: `ESLint encountered ${result.errorCount} errors.`
          }]
        };
      }

      if (throwOnWarning && result.warningCount > 0) {
        return {
          warnings: [{
            pluginName,
            text: `ESLint encountered ${result.warnings} warnings.`
          }]
        };
      }

      return null;
    });
  }
});
