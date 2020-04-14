const { getStatePensionDate } = require('get-state-pension-date');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string');

const isTodayOrEarlier = (date) => date.getTime() <= Date.now();

const underSPA = (waypoints) => (_, context) => {
  const { dateOfBirth } = context.getDataForPage(waypoints.DATE_OF_BIRTH) || Object.create(null);

  // If date of birth has not been submitted, return true (done page) to avoid
  // throwing an error when destructuring the values
  if (!(dateOfBirth && dateOfBirth.yyyy && dateOfBirth.mm && dateOfBirth.dd)) {
    return true;
  }

  // Construct the applicant dob from the data object
  const dateOfBirthString = dateObjectToISOString(dateOfBirth);

  // Fetch the SPA for the applicants dob
  const spaFemale = getStatePensionDate(dateOfBirthString, 'female');
  const spaMale = getStatePensionDate(dateOfBirthString, 'male');

  // If applicant is eligible for SPA
  if (isTodayOrEarlier(spaFemale) && isTodayOrEarlier(spaMale)) {
    return false;
  }

  // Check if applicant is eligible for an early claim 4 months prior to their
  // state pension age
  const spaEarlyDateM = new Date(spaMale.getFullYear(), spaMale.getMonth() - 4, spaMale.getDate());

  if (isTodayOrEarlier(spaEarlyDateM)) {
    return false;
  }

  // Applicant is not eligible (too young)
  return true;
};

module.exports = underSPA;
