import type { ESLint } from "eslint";
import type { PartialMessage } from "esbuild";

export default (
  lintResults: ESLint.LintResult[]
) => {
  const warnings: PartialMessage[] = [];
  const errors: PartialMessage[] = [];

  for (const lintResult of lintResults) {
    for (const message of lintResult.messages) {
      if (message.severity === 1) {
        warnings.push({
          pluginName: "eslint",
          text: message.message,
          location: {
            file: lintResult.filePath,
            line: message.line
          }
        });
      }

      if (message.severity === 2) {
        errors.push({
          pluginName: "eslint",
          text: message.message,
          location: {
            file: lintResult.filePath,
            line: message.line
          }
        });
      }
    }
  }

  return { warnings, errors };
};
