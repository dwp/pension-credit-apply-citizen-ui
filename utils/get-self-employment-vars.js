const getChosenDateOfClaim = require('./get-chosen-date-of-claim.js');
const formatDateObject = require('./format-date-object.js');
const dateToDateObject = require('./date-to-date-object.js');

// Add months to a given date
const addMonths = (date, numberOfMonths) => new Date(Date.UTC(
  date.getFullYear(),
  date.getMonth() + numberOfMonths,
  date.getDate(),
));

// Subtract months from a given date
const subtractMonths = (date, numberOfMonths) => addMonths(date, numberOfMonths * -1);

const getSelfEmploymentVars = (context) => {
  const chosenDateOfClaimISO = getChosenDateOfClaim(context);
  const chosenDateOfClaim = new Date(chosenDateOfClaimISO);
  const today = new Date(Date.now());
  const threeMonthsFromNow = addMonths(today, 3);

  // If date of claim is more than 3 months from now we won't ask for earnings
  // from a specific date.
  if (chosenDateOfClaim.getTime() > threeMonthsFromNow.getTime()) {
    return { selfEmployedSuffix: 'Present' };
  }

  // We need earnings from 6 months prior to today if a date of claim could not
  // be calculated due to the complexity of their cicumstances. Otherwise we
  // need earnings from 3 months prior to the date of claim.
  const earningsFromDate = chosenDateOfClaimISO === null
    ? subtractMonths(today, 6)
    : subtractMonths(chosenDateOfClaim, 3);

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
