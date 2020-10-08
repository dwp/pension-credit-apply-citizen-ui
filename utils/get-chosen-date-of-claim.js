const { waypoints: WP } = require('../lib/constants.js');
const dateObjectToISOString = require('./date-object-to-iso-string.js');
const getOfferedDateOfClaim = require('./get-offered-date-of-claim.js');

const getChosenDateOfClaim = (context) => {
  const offeredDateOfClaimISO = getOfferedDateOfClaim(context);

  // If we can't calculate a date of claim then they couldn't have chosen one.
  if (offeredDateOfClaimISO === null) {
    return null;
  }

  const { acceptClaimDate } = context.getDataForPage(WP.OFFERED_CLAIM_DATE) || {};

  // If they did not reject the offered date of claim return it. This also
  // covers implicit dates which aren't 'offered', such as future dates of claim
  if (acceptClaimDate !== 'no') {
    return offeredDateOfClaimISO;
  }

  const { differentClaimDate } = context.getDataForPage(WP.DIFFERENT_CLAIM_DATE) || {};

  // If they reject the offered date of claim return the date of claim they
  // entered on the DIFFERENT_CLAIM_DATE page.
  return dateObjectToISOString(differentClaimDate);
};

module.exports = getChosenDateOfClaim;
