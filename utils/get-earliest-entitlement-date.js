const getDateOfClaim = require('@dwp/pension-credit-date-of-claim');
const { waypoints: WP } = require('../lib/constants.js');
const dateObjectToDate = require('./date-object-to-date.js');

const getEarliestEntitlementDate = (context) => {
  const { dateOfBirth } = context.getDataForPage(WP.DATE_OF_BIRTH) || Object.create(null);
  const dateOfBirthDate = dateObjectToDate(dateOfBirth);

  // This will give us the claimant's 'earliest entitlement date', we can't
  // offer a true date of claim until we have considered periods abroad.
  const { dateOfClaim } = getDateOfClaim({
    dateOfBirth: dateOfBirthDate,
    applicationDate: new Date(Date.now()),
  });

  // ISO format string: YYYY-MM-DD
  return dateOfClaim;
};

module.exports = getEarliestEntitlementDate;
