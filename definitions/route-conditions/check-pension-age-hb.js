const dateObjectToDate = require('../../utils/date-object-to-date.js');

const pensionAgeHBDate = new Date('1954-02-05').getTime();

// If checking is eligible date of birth must be on or before 2 February 1954
const bornOnOrBefore5Feb1954 = (date) => date.getTime() <= pensionAgeHBDate;

// If checking is ineligible date of birth must be after 2 February 1954
const bornAfter5Feb1954 = (date) => date.getTime() > pensionAgeHBDate;

const checkStatePensionAge = (waypoint, field, eligible) => {
  // Set comparison function if checking for eligibility or ineligibility
  const compare = eligible ? bornOnOrBefore5Feb1954 : bornAfter5Feb1954;

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

      // Convert date object to Javascript Date
      const dateOfBirthDate = dateObjectToDate(dateOfBirth);

      if (dateOfBirthDate.toString() === 'Invalid Date') {
        throw new Error('invalid date of birth');
      }

      // Compare date of birth against Pension Age Housing Benefit date
      if (compare(dateOfBirthDate)) {
        return true;
      }

      // Did not match eligibility criteria, cannot progress
      return false;
    },
  }[label];
};

module.exports = checkStatePensionAge;
