const { waypoints } = require('../lib/constants.js');
const dateObjectToDate = require('./date-object-to-date.js');

const needToBackdate = (journeyContext) => {
  const { dateOfClaim } = journeyContext.getDataForPage(waypoints.DATE_OF_CLAIM)
    || Object.create(null);

  const today = new Date(Date.now());
  const dateOfClaimDate = dateOfClaim ? dateObjectToDate(dateOfClaim) : today;
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  // Need to backdate if date of claim is over a week in the past
  return dateOfClaimDate.getTime() < lastWeek.getTime();
};

module.exports = needToBackdate;
