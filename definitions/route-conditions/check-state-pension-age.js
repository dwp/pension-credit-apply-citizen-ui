const { getStatePensionDate } = require('get-state-pension-date');
const dateObjectToISOString = require('../../utils/date-object-to-iso-string');

// If checking is eligible date of State Pension age must be in the past or now
const atOrOverStatePensionAge = (date) => date.getTime() <= Date.now();

// If checking is ineligible date of State Pension age must be in the future
const underStatePensionAge = (date) => date.getTime() > Date.now();

const checkStatePensionAge = (waypoint, field, eligible) => {
  // Set comparison function if checking for eligibility or ineligibility
  const compare = eligible ? atOrOverStatePensionAge : underStatePensionAge;

  // Set route label
  const label = compare.name;

  return {
    [label]: (_, context) => {
      // Get date of birth from provided waypoint and field
      const dateOfBirth = (context.getDataForPage(waypoint) || Object.create(null))[field];

      // If date of birth has not been submitted, or is incomplete always return
      // false so user cannot progress
      if (!(dateOfBirth && dateOfBirth.yyyy && dateOfBirth.mm && dateOfBirth.dd)) {
        return false;
      }

      // Convert date object to ISO date string eg: 1942-02-01
      const dateOfBirthString = dateObjectToISOString(dateOfBirth);

      // Fetch the matching State Pension age for the applicants date of birth
      const spaFemale = getStatePensionDate(dateOfBirthString, 'female');
      const spaMale = getStatePensionDate(dateOfBirthString, 'male');

      // Compare State Pension age dates with date of birth to determine eligibility
      if (compare(spaFemale) && compare(spaMale)) {
        return true;
      }

      // Check eligibility for an advanced claim 4 months prior to State Pension
      const advanced = new Date(spaMale.getFullYear(), spaMale.getMonth() - 4, spaMale.getDate());

      if (compare(advanced)) {
        return true;
      }

      // Did not match eligibility criteria, cannot progress
      return false;
    },
  }[label];
};

module.exports = checkStatePensionAge;
