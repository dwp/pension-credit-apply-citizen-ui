const subtractCalendarMonths = require('./subtract-calendar-months.js');
const getChosenDateOfClaim = require('./get-chosen-date-of-claim.js');
const addCalendarMonths = require('./add-calendar-months.js');
const dateToDateObject = require('./date-to-date-object.js');
const formatDateObject = require('./format-date-object.js');
const toUTCDate = require('./to-utc-date.js');

const getSelfEmploymentVars = (context) => {
  const chosenDateOfClaimISOString = getChosenDateOfClaim(context);
  const chosenDateOfClaim = new Date(chosenDateOfClaimISOString);

  // Dates contructed from ISO strings return values without daylight savings
  // applied, so chosenDateOfClaim will be UTC. Our future Date must also be
  // UTC for the time comparison.
  const today = new Date(Date.now());
  const threeMonthsFromNow = addCalendarMonths(today, 3);
  const threeMonthsFromNowUTC = toUTCDate(threeMonthsFromNow);

  // If date of claim is more than 3 months from now we won't ask for earnings
  // from a specific date.
  if (chosenDateOfClaim.getTime() > threeMonthsFromNowUTC.getTime()) {
    return { selfEmployedSuffix: 'Present' };
  }

  // We need earnings from 6 months prior to today if a date of claim could not
  // be calculated due to the complexity of the claimants cicumstances.
  // Otherwise we need earnings from 3 months prior to the date of claim.
  const earningsFromDate = chosenDateOfClaimISOString === null
    ? subtractCalendarMonths(today, 6)
    : subtractCalendarMonths(chosenDateOfClaim, 3);

  // Format date as string for this locale (eg. 12 July 2020)
  const selfEmployedEarningsDate = formatDateObject(
    dateToDateObject(earningsFromDate),
    { locale: context.nav.language },
  );

  return {
    selfEmployedEarningsDate,
    selfEmployedSuffix: 'Past',
  };
};

module.exports = getSelfEmploymentVars;
