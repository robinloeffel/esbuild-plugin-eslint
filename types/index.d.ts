import { ESLint } from 'eslint';
import { Plugin } from 'esbuild';

interface esbuildPluginEslintOptions extends ESLint.Options {
  /**
   * tells esbuild what files to look at; only matches will be processed
   * @default /\.(jsx?|tsx?|vue|svelte)$/
   */
  filter?: RegExp,

  /**
   * controls whether or not to throw an error when eslint reports any warnings
   * @default false
   */
  throwOnWarning?: boolean,

  /**
   * controls whether or not to throw an error when eslint reports any errors
   * @default false
   */
  throwOnError?: boolean,
}

declare function eslint(options?: esbuildPluginEslintOptions): Plugin;

export = eslint;
