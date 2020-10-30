const dateFormat = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

const isoStringToDate = (dateString) => {
  if (typeof dateString !== 'string') {
    throw new TypeError(`Expected string got ${typeof dateString}: ${dateString}`);
  }
  if (!dateFormat.test(dateString)) {
    throw new TypeError(`String must be in the format YYYY-MM-DD got: ${dateString}`);
  }

  const [yyyy, mm, dd] = dateString.split('-');

  return new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10));
};

module.exports = isoStringToDate;
