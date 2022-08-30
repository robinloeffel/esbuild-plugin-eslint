import { ESLint } from 'eslint';
import { Plugin } from 'esbuild';

interface esbuildPluginEslintOptions extends ESLint.Options {
  /**
  * tells esbuild what files to look at; only matches will be processed.
  * @default /\.(jsx?|tsx?|vue|svelte)$/
  */
  filter?: RegExp
}

declare function eslint(options?: esbuildPluginEslintOptions): Plugin;

export = eslint;
