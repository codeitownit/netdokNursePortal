function isValid(obj) {
  if (typeof obj !== "object") return false;

  let keys = Object.keys(obj);

  for (let key of keys) {
    if (obj[key] === true) {
      return false;
    }
  }

  return true;
}

export { isValid };
