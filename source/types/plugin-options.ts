import type { ESLint } from "eslint";

export interface PluginOptions extends ESLint.Options {
  /**
   * tells esbuild what files to look at; only matches will be processed
   */
  filter?: RegExp,

  /**
   * controls whether or not to throw an error when eslint reports any warnings
   */
  throwOnWarning?: boolean,

  /**
   * controls whether or not to throw an error when eslint reports any errors
   */
  throwOnError?: boolean,
}
