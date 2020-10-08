const { waypoints: WP } = require('../../lib/constants.js');
const dateObjectToDate = require('../../utils/date-object-to-date.js');

// Date of birth to be eligible for Pension Age Housing Benefit
const pensionAgeHBDate = new Date(1954, 1, 5).getTime();

const eligibleForPensionAgeHB = (_, context) => {
  const { dateOfBirth } = context.getDataForPage(WP.DATE_OF_BIRTH) || Object.create(null);

  // If date of birth has not been submitted, or is incomplete always return
  // false so user cannot progress
  if (!(dateOfBirth && dateOfBirth.yyyy && dateOfBirth.mm && dateOfBirth.dd)) {
    return false;
  }

  // Convert date object to Javascript Date
  const dateOfBirthDate = dateObjectToDate(dateOfBirth);

  if (dateOfBirthDate.toString() === 'Invalid Date') {
    throw new Error('invalid date of birth');
  }

  // Eligible for Pension Age Housing Benefit
  if (dateOfBirthDate.getTime() <= pensionAgeHBDate) {
    return true;
  }

  // Not eligible
  return false;
};

module.exports = eligibleForPensionAgeHB;
