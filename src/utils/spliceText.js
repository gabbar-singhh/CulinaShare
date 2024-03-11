function spliceText(inputString) {
  if (inputString.length > 23) {
    return inputString.substring(0, 18) + "..";
  } else {
    return inputString;
  }
}

export default spliceText;