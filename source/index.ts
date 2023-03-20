import type { PluginOptions } from "./types/plugin-options.js";
import type { Plugin, OnLoadArgs } from "esbuild";

import formatMessages from "./util/format-messages.js";
import { ESLint } from "eslint";

export default ({
  filter = /\.(?:jsx?|tsx?|vue|svelte)$/,
  throwOnError = false,
  throwOnWarning = false,
  ...eslintOptions
}: PluginOptions = {}): Plugin => ({
  name: "eslint",
  setup(build) {
    const eslint = new ESLint(eslintOptions);
    const filesToLint: OnLoadArgs["path"][] = [];

    build.onLoad({ filter }, ({ path }) => {
      if (!path.includes("node_modules")) {
        filesToLint.push(path);
      }

      return null;
    });

    build.onEnd(async () => {
      const results = await eslint.lintFiles(filesToLint);
      const formatter = await eslint.loadFormatter("stylish");
      const output = await formatter.format(results);
      const { warnings, errors } = formatMessages(results);

      if (eslintOptions.fix) {
        ESLint.outputFixes(results);
      }

      if (output.length > 0) {
        console.log(output);
      }

      return {
        ...throwOnWarning && warnings.length > 0 && { warnings },
        ...throwOnError && errors.length > 0 && { errors },

        // in case throwOnWarning is true, and there are warnings to
        // report, but throwOnError is false, we need to return a dummy
        // error to make esbuild throw
        ...throwOnWarning && warnings.length > 0 && !throwOnError && {
          errors: [{ text: `${warnings.length} warning(s) were found!` }]
        }
      };
    });
  }
});
