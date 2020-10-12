const subtractCalendarMonths = require('./subtract-calendar-months.js');
const dateToDateObject = require('./date-to-date-object.js');
const formatDateObject = require('./format-date-object.js');

const getSelfEmploymentVars = (context) => {
  const today = new Date(Date.now());
  const earningsFromDate = subtractCalendarMonths(today, 6);

  // Format date as string for this locale (eg. 12 July 2020)
  const selfEmployedEarningsDate = formatDateObject(
    dateToDateObject(earningsFromDate),
    { locale: context.nav.language },
  );

  return {
    selfEmployedEarningsDate,
    selfEmployedSuffix: 'Past',
  };
};

module.exports = getSelfEmploymentVars;
