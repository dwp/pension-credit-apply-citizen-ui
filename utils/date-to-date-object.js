const dateToDateObject = (date) => {
  if (!(date instanceof Date)) {
    throw new TypeError(`Expected Date got ${typeof date}: ${date}`);
  }

  return {
    dd: String(date.getDate()).padStart(2, '0'),
    mm: String(date.getMonth() + 1).padStart(2, '0'),
    yyyy: String(date.getFullYear()),
  };
};

module.exports = dateToDateObject;
