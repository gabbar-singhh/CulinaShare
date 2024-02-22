function spliceText(inputString) {
    if (inputString.length > 39){
        return inputString.substring(0, 39) + "..";
    } else {
        return inputString;
    }
}

export default spliceText;