const { join } = require('path');
const esbuild = require('esbuild');
const plugin = require('../source');
const chokidar = require('chokidar');

const absolute = relative => join(__dirname, relative);

const callback = async () => {
  await esbuild.build({
    entryPoints: [ absolute('cases') ],
    plugins: [ plugin({ throwOnError: true }) ],
    bundle: true
  });
};

const run = watch => {
  if (watch) {
    chokidar.watch([
      absolute('../source/**/*.js'),
      absolute('../test/**/*.js')
    ]).on('change', callback);
  } else {
    callback();
  }
};

run(process.argv.includes('--watch'));
