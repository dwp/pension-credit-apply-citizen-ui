const subtractCalendarMonths = require('./subtract-calendar-months.js');
const dateToISOString = require('./date-to-iso-string.js');

const getSelfEmploymentVars = () => {
  const today = new Date(Date.now());
  const earningsFromDate = subtractCalendarMonths(today, 6);
  const selfEmployedEarningsDate = dateToISOString(earningsFromDate);

  return {
    selfEmployedEarningsDate,
    selfEmployedSuffix: 'Past',
  };
};

module.exports = getSelfEmploymentVars;
