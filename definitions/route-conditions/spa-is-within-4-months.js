const { getStatePensionDate } = require('get-state-pension-date');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string.js');
const addCalendarMonths = require('../../utils/add-calendar-months.js');
const toUTCDate = require('../../utils/to-utc-date.js');

const spaIsWithin4Months = (route, context) => {
  const { dateOfBirth } = context.getDataForPage(route.source) || Object.create(null);

  // If date of birth has not been submitted, or is incomplete always return
  // false so user cannot progress
  if (!(dateOfBirth && dateOfBirth.yyyy && dateOfBirth.mm && dateOfBirth.dd)) {
    return false;
  }

  // Convert date object to ISO date string eg: 1942-02-01
  const dateOfBirthString = dateObjectToISOString(dateOfBirth);

  // Fetch the matching State Pension age for the applicants date of birth
  const spaDate = getStatePensionDate(dateOfBirthString, 'male');

  // getStatePensionDate returns a UTC date, we must also use a UTC date when
  // comparing otherwise our date may be one hour behind due to daylight savings
  const today = toUTCDate(new Date(Date.now()));
  const fourMonthsFromNow = addCalendarMonths(today, 4);
  const fourMonthsFromNowUTC = toUTCDate(fourMonthsFromNow);

  // State Pension age date is in the future but not more than 4 months away
  if (spaDate.getTime() > today.getTime() && spaDate.getTime() <= fourMonthsFromNowUTC.getTime()) {
    return true;
  }

  return false;
};

module.exports = spaIsWithin4Months;
