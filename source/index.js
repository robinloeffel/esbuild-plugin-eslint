const minimatch = require("minimatch");
const { ESLint } = require('eslint');

module.exports = ({ patterns, ...options } = {}) => ({
  name: 'eslint',
  setup(build) {
    const eslint = new ESLint(options);

    build.onLoad({
      filter: /\.(jsx?|tsx?)$/
    }, async ({ path }) => {
      if (patterns && !minimatch(patterns, path)) return;
      const result = await eslint.lintFiles(path);

      if (options.fix) {
        ESLint.outputFixes(result);
      }

      const formatter = await eslint.loadFormatter('stylish');
      const output = formatter.format(result);
      if (output.length > 0) {
        // eslint-disable-next-line no-console
        console.log(output);
      }
    });
  }
});
