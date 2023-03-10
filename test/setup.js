const { join } = require('path');
const esbuild = require('esbuild');
const plugin = require('../source');
const chokidar = require('chokidar');

const absolute = relative => join(__dirname, relative);

const callback = async () => {
  await esbuild.build({
    entryPoints: [ absolute('cases/to-lint.js') ],
    plugins: [ plugin() ]
  });
};

const run = watch => {
  if (watch) {
    chokidar.watch([
      absolute('../source/index.js'),
      absolute('setup.js'),
      absolute('cases/to-lint.js')
    ]).on('change', callback);
  } else {
    callback();
  }
};

run(process.argv.includes('--watch'));
