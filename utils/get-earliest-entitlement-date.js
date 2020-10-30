const getDateOfClaim = require('@dwp/pension-credit-date-of-claim');
const { waypoints: WP } = require('../lib/constants.js');
const dateObjectToDate = require('./date-object-to-date.js');
const isoStringToDate = require('./iso-string-to-date.js');
const getTodayDate = require('./get-today-date.js');

const getEarliestEntitlementDate = (context) => {
  const { applicationDate } = context.getDataForPage(WP.START) || Object.create(null);
  const { dateOfBirth } = context.getDataForPage(WP.DATE_OF_BIRTH) || Object.create(null);
  const dateOfBirthDate = dateObjectToDate(dateOfBirth);

  // Get fixed application date from session, set on START page submission
  const appDate = applicationDate ? isoStringToDate(applicationDate) : getTodayDate();

  // This will give us the claimant's 'earliest entitlement date', we can't
  // offer a true date of claim until we have considered periods abroad.
  const { dateOfClaim } = getDateOfClaim({
    dateOfBirth: dateOfBirthDate,
    applicationDate: appDate,
  });

  // ISO format string: YYYY-MM-DD
  return dateOfClaim;
};

module.exports = getEarliestEntitlementDate;
