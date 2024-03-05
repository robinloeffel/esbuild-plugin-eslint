import type { OnLoadArgs, Plugin } from "esbuild";
import { ESLint } from "eslint";

interface Options extends ESLint.Options {
  /**
   * tells esbuild what files to look at; only matches will be processed
   */
  filter?: RegExp;

  /**
   * controls whether or not to forward an error to esbuild when eslint reports any warnings
   */
  throwOnWarning?: boolean;

  /**
   * controls whether or not to forward an error to esbuild when eslint reports any errors
   */
  throwOnError?: boolean;
}

export default ({
  filter = /\.(?:jsx?|tsx?|mts|cts|mjs|cjs|vue|svelte)$/,
  throwOnWarning = false,
  throwOnError = false,
  ...eslintOptions
}: Options = {}): Plugin => ({
  name: "eslint",
  setup: ({ onLoad, onEnd }) => {
    const eslint = new ESLint(eslintOptions);
    const filesToLint: OnLoadArgs["path"][] = [];

    onLoad({ filter }, ({ path }) => {
      if (!path.includes("node_modules")) {
        filesToLint.push(path);
      }

      return null;
    });

    onEnd(async() => {
      const results = await eslint.lintFiles(filesToLint);
      const formatter = await eslint.loadFormatter();
      const output = await formatter.format(results);

      const warnings = results.reduce((count, result) => count + result.warningCount, 0);
      const errors = results.reduce((count, result) => count + result.errorCount, 0);

      if (eslintOptions.fix) {
        await ESLint.outputFixes(results);
      }

      if (output.length > 0) {
        console.log(output);
      }

      return {
        ...throwOnWarning && warnings > 0 && {
          errors: [{ text: `${warnings} warnings were found by eslint!` }]
        },
        ...throwOnError && errors > 0 && {
          errors: [{ text: `${errors} errors were found by eslint!` }]
        }
      };
    });
  }
});
