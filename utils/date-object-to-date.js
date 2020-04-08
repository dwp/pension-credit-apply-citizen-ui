const dateObjectToDate = (dateObject) => {
  if (Object.prototype.toString.call(dateObject) !== '[object Object]') {
    throw new TypeError(`Expected object got ${typeof dateObject}: ${dateObject}`);
  }
  if (!('yyyy' in dateObject && 'mm' in dateObject && 'dd' in dateObject)) {
    throw new TypeError(`Expected date object got ${typeof dateObject}: ${JSON.stringify(dateObject)}`);
  }

  return new Date(
    parseInt(dateObject.yyyy, 10),
    parseInt(dateObject.mm, 10) - 1,
    parseInt(dateObject.dd, 10),
  );
};

module.exports = dateObjectToDate;
