import type { ESLint, Linter } from "eslint";
import type { PartialMessage } from "esbuild";

export default (
  lintResults: ESLint.LintResult[],
  messageSeverity: Linter.LintMessage["severity"]
) => {
  const messages: PartialMessage[] = [];

  for (const lintResult of lintResults) {
    for (const message of lintResult.messages) {
      if (message.severity === messageSeverity) {
        messages.push({
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

  return messages;
};
