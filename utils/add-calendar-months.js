const addCalendarMonths = (date, months) => {
  if (!(date instanceof Date)) {
    throw new TypeError(`expected date to be a Date got ${typeof date}: ${date}`);
  }
  if (typeof months !== 'number' || Number.isNaN(months)) {
    throw new TypeError(`expected months to be a number got ${typeof months}: ${months}`);
  }

  const datePlusMonths = new Date(
    date.getFullYear(),
    date.getMonth() + months,
    date.getDate(),
  );

  // If dates are not the same after adding months the resulting month must be
  // shorter than the starting month. ie 31st August -> 30th September.
  // Decalaring a date of 31st September will return 1st of October, setting the
  // date to 0 will result in the last day of the previous month.
  if (datePlusMonths.getDate() !== date.getDate()) {
    datePlusMonths.setDate(0);
  }

  return datePlusMonths;
};

module.exports = addCalendarMonths;
