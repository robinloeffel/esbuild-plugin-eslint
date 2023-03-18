module.exports = (
  lintResults,
  messageSeverity
) => {
  const messages = [];

  lintResults.forEach(lintResult => {
    lintResult.messages.forEach(message => {
      if (message.severity === messageSeverity) {
        messages.push({
          text: message.message,
          location: {
            file: lintResult.filePath,
            line: message.line
          }
        });
      }
    });
  });

  return messages;
};
