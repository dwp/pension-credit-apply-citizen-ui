const subtractCalendarMonths = require('./subtract-calendar-months.js');
const dateToISOString = require('./date-to-iso-string.js');
const getTodayDate = require('./get-today-date.js');

const getSelfEmploymentVars = () => {
  const today = getTodayDate();
  const earningsFromDate = subtractCalendarMonths(today, 6);
  const selfEmployedEarningsDate = dateToISOString(earningsFromDate);

  return {
    selfEmployedEarningsDate,
    selfEmployedSuffix: 'Past',
  };
};

module.exports = getSelfEmploymentVars;
