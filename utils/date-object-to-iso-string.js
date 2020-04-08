const dateObjectToISOString = (dateObject) => {
  if (Object.prototype.toString.call(dateObject) !== '[object Object]') {
    throw new TypeError(`Expected object got ${typeof dateObject}: ${dateObject}`);
  }
  if (!('yyyy' in dateObject && 'mm' in dateObject && 'dd' in dateObject)) {
    throw new TypeError(`Expected date object got ${typeof dateObject}: ${JSON.stringify(dateObject)}`);
  }

  return `${dateObject.yyyy.padStart(4, '0')}-${dateObject.mm.padStart(2, '0')}-${dateObject.dd.padStart(2, '0')}`;
};

module.exports = dateObjectToISOString;
