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

      if (eslintOptions.fix) {
        ESLint.outputFixes(results);
      }

      if (output.length > 0) {
        console.log(output);
      }

      if (throwOnError) {
        const errors = formatMessages(results, 2);
        if (errors.length > 0) {
          return { errors };
        }
      }

      if (throwOnWarning) {
        const warnings = formatMessages(results, 1);
        if (warnings.length > 0) {
          return { warnings };
        }
      }

      return null;
    });
  }
});
