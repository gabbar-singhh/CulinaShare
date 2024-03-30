function spliceText(inputString) {
  try {
    if (inputString.length > 23) {
      return inputString.substring(0, 18) + "..";
    } else {
      return inputString;
    }
  } catch {
    return inputString;
  }
}

export default spliceText;
