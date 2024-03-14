function getTimeById(id, arr) {
  let result = null;

  arr.forEach((obj) => {
    if (obj.id == id) {
      result = obj.time;
    }
  });

  // return result || "Unknown";
  return result || 0;
}

export default getTimeById;
