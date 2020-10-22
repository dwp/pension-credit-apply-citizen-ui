const dateToISOString = (date) => {
  if (!(date instanceof Date)) {
    throw new TypeError(`Expected Date got ${typeof date}: ${date}`);
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

module.exports = dateToISOString;
