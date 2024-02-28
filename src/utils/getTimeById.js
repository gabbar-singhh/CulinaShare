function getTimeById(id, arr) {
  let result = null;

  arr.forEach((obj) => {
    if (obj.id == id) {
      result = obj.time;
    }
  });

  return result || "Unknown";
}

export default getTimeById;
