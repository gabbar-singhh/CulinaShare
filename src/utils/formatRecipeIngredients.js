function formatRecipeIngredients(inputObject) {
  const outputArray = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (inputObject[ingredientKey] && inputObject[measureKey]) {
      outputArray.push({
        strIngredient: inputObject[ingredientKey],
        strMeasure: inputObject[measureKey],
      });
    } else if (inputObject[ingredientKey]) {
      outputArray.push({
        strIngredient: inputObject[ingredientKey],
        strMeasure: "-",
      });
    }
    // If inputObject[measureKey] is empty, it won't be included in the result
  }

  return outputArray;
}

export default formatRecipeIngredients;
