# `esbuild-plugin-eslint`

[![latest version on npm](https://img.shields.io/npm/v/esbuild-plugin-eslint)](https://www.npmjs.com/package/esbuild-plugin-eslint)
[![npm downloads a month](https://img.shields.io/npm/dm/esbuild-plugin-eslint)](https://www.npmjs.com/package/esbuild-plugin-eslint)
[![required node version](https://img.shields.io/node/v/esbuild-plugin-eslint)](https://github.com/nodejs/Release)
[![esbuild peer dep](https://img.shields.io/npm/dependency-version/esbuild-plugin-eslint/peer/esbuild?label=esbuild%20peer%20dep)](https://github.com/rollup/rollup)
[![eslint peer dep](https://img.shields.io/npm/dependency-version/esbuild-plugin-eslint/peer/eslint?label=eslint%20peer%20dep)](https://github.com/eslint/eslint)
[![package license](https://img.shields.io/npm/l/esbuild-plugin-eslint)](license)

> Lint your [`esbuild`](https://github.com/evanw/esbuild) bundles with [`eslint`](https://github.com/eslint/eslint). 🧐

Nicely integrates the most recent version of [`eslint`](https://github.com/eslint/eslint) into an [`esbuild`](https://github.com/rollup/rollup) plugin.

## How

```bash
yarn add esbuild-plugin-eslint --dev
```

```js
const { build } = require('esbuild');
const eslint = require('esbuild-plugin-eslint');

build({
  // ...
  plugins: [
    eslint()
  ]
})
```

## Config

This plugin respects your [ESLint configuration](https://eslint.org/docs/user-guide/configuring) as per default. It also takes a configuration object intended for the [ESLint constructor](https://eslint.org/docs/developer-guide/nodejs-api#-new-eslintoptions) with the addition of a `filter` property. The most important options are:

### `filter`

Type: `RegExp`<br>
Default: `/\.(jsx?|tsx?|vue|svelte)$/`<br>
Reference: [esbuild.github.io](https://esbuild.github.io/plugins/#on-load-options)

Instructs `esbuild` what files to look at. Files _not_ matching this pattern will be ignored.

### `fix`

Type: `boolean`<br>
Default: `false`<br>

Controls whether to enable or disable the autofix feature of ESLint.

### `useEslintrc`

Type: `boolean`<br>
Default: `true`<br>

If set to `false`, ESLint will not respect any configuration files it finds.

## License

MIT
