const getEarliestEntitlementDate = require('./get-earliest-entitlement-date.js');
const getOfferedDateOfClaim = require('./get-offered-date-of-claim.js');
const dateObjectToISOString = require('./date-object-to-iso-string.js');
const { waypoints: WP } = require('../lib/constants.js');

// True if given ISO Date string is over a week in the past
const overAWeekAgo = (isoString) => {
  const date = new Date(isoString);
  const today = new Date(Date.now());
  const lastWeek = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 7));

  return date.getTime() < lastWeek.getTime();
};

const needToBackdate = (context) => {
  const earliestEntitlementDate = getEarliestEntitlementDate(context);

  // Earliest entitlement date not over a week ago, no need to backdate.
  if (!overAWeekAgo(earliestEntitlementDate)) {
    return false;
  }

  const offeredDateOfClaim = getOfferedDateOfClaim(context);

  // Date of claim could not be calculated, so can't backdate.
  if (offeredDateOfClaim === null) {
    return false;
  }

  const { acceptClaimDate } = context.getDataForPage(WP.OFFERED_CLAIM_DATE) || {};

  // Offered date of claim was rejected, return true if chosen date was over a
  // week ago.
  if (acceptClaimDate === 'no') {
    const { differentClaimDate } = context.getDataForPage(WP.DIFFERENT_CLAIM_DATE) || {};
    const differentClaimDateISO = dateObjectToISOString(differentClaimDate);
    return overAWeekAgo(differentClaimDateISO);
  }

  // Offered date of claim was accepted, return true if date was over a week ago.
  return overAWeekAgo(offeredDateOfClaim);
};

module.exports = needToBackdate;
