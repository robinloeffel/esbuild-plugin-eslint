const minimatch = require('minimatch');
const Path = require('path');
const { ESLint } = require('eslint');

module.exports = ({ patterns, ...options } = {}) => ({
  name: 'eslint',
  setup(build) {
    const eslint = new ESLint(options);
    const cwd = process.cwd()
    let _patterns = Array.isArray(patterns) ? patterns : [ patterns ];
    build.onLoad({
      filter: /\.(jsx?|tsx?)$/
    }, async ({ path }) => {
      const relative = Path.relative(cwd,path)
      if (_patterns.length > 0 && !_patterns.some(p => minimatch(relative, p, {matchBase:true}))) {
        return;
      }
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
