const { join } = require('path');
const { build } = require('esbuild');
const eslint = require('../source');

const watch = process.argv.includes('--dev');

build({
  entryPoints: [ join(__dirname, 'to-lint.js') ],
  plugins: [ eslint() ],
  watch
});
