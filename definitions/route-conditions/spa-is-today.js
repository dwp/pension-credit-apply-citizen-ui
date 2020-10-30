const { getStatePensionDate } = require('get-state-pension-date');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string.js');
const getTodayDate = require('../../utils/get-today-date.js');
const toUTCDate = require('../../utils/to-utc-date.js');

const spaIsToday = (route, context) => {
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
  const todayUTC = toUTCDate(getTodayDate());

  if (spaDate.getTime() === todayUTC.getTime()) {
    return true;
  }

  return false;
};

module.exports = spaIsToday;
