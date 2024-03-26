function getTimeById(id, data) {
  let result = null;

  data.forEach((obj) => {
    if (obj.idMeal == parseInt(id)) {
      result = obj.timestamp;
    }
  });

  // return result || "Unknown";
  return result || 0;
}

export default getTimeById;
