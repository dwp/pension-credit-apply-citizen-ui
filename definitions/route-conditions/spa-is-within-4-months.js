const { getStatePensionDate } = require('get-state-pension-date');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string.js');

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
  const today = new Date(Date.now());

  // getStatePensionDate returns UTC date, we must use UTC date also if comparing
  const advanced = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 4, today.getDate()));

  // State Pension age date is in the future but not more than 4 months away
  if (spaDate.getTime() > today.getTime() && spaDate.getTime() <= advanced.getTime()) {
    return true;
  }

  return false;
};

module.exports = spaIsWithin4Months;
