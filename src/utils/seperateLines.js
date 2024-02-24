function separateLines(inputString) {
  const linesArray = inputString.split(/\r\n/);

  const filteredLines = linesArray.filter((line) => line.trim() !== "");

  return filteredLines;
}

export default separateLines;
