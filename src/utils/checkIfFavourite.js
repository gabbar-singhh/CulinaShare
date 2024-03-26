function checkIfFavourite(id, data) {
  for (const item of data) {
    if (parseInt(item.idMeal) == id) {
      return true;
    }
  }

  return false;
}

export default checkIfFavourite;
