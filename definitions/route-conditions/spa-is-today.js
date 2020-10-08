const { getStatePensionDate } = require('get-state-pension-date');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string.js');

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

  // getStatePensionDate returns UTC date, we must use UTC date also if comparing
  const today = new Date(Date.now());
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

  if (spaDate.getTime() === todayUTC.getTime()) {
    return true;
  }

  return false;
};

module.exports = spaIsToday;
