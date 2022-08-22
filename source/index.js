const { ESLint } = require('eslint');

module.exports = ({
  filter = /\.(jsx?|tsx?|vue|svelte)$/,
  ...eslintOptions
} = {}) => ({
  name: 'eslint',
  setup(build) {
    const eslint = new ESLint(eslintOptions);
    const filesToLint = [];

    build.onLoad({ filter }, ({ path }) => {
      if (!path.includes('node_modules')) {
        filesToLint.push(path);
      }
    });

    build.onEnd(async () => {
      const result = await eslint.lintFiles(filesToLint);

      if (eslintOptions.fix) {
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
