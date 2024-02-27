function checkIfFavourite(id, arrayOfObjects) {
  for (let obj of arrayOfObjects) {
    if (obj.hasOwnProperty("id") && obj.id === id) {
      return true;
    }
  }
  return false;
}

export default checkIfFavourite;