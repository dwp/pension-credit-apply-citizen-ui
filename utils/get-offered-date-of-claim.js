const getDateOfClaim = require('@dwp/pension-credit-date-of-claim');
const { waypoints: WP } = require('../lib/constants.js');
const spaIsWithin4Months = require('../definitions/route-conditions/spa-is-within-4-months.js');
const dateObjectToDate = require('./date-object-to-date.js');

const getOfferedDateOfClaim = (context) => {
  const { dateOfBirth } = context.getDataForPage(WP.DATE_OF_BIRTH) || {};
  const { abroadMoreThan4Weeks } = context.getDataForPage(WP.ABROAD) || {};

  // Set up options to use for date of claim calculation.
  const dateOfClaimParams = {
    dateOfBirth: dateObjectToDate(dateOfBirth),
    applicationDate: new Date(Date.now()),
  };

  // If claimant has been abroad for more than 4 weeks, add dates for the period
  // (calling spaIsWithin4Months to check they could have accessed ABROAD).
  if (!spaIsWithin4Months({ source: WP.DATE_OF_BIRTH }, context) && abroadMoreThan4Weeks === 'yes') {
    const { periodsAbroad } = context.getDataForPage(WP.PERIODS_ABROAD) || {};
    const { periodAbroadForMedical } = context.getDataForPage(WP.ABROAD_MEDICAL) || {};

    // If claimant has been out of the country more than once during the period
    // or it was for medical reasons, we cannot offer a date of claim.
    if (periodsAbroad === 'moreThanOne' || periodAbroadForMedical === 'yes') {
      return null;
    }

    const { dateYouLeft, dateYouReturned } = context.getDataForPage(WP.DATES_ABROAD) || {};

    // Set up abroadPeriod
    dateOfClaimParams.abroadPeriod = {
      medicalOrBereavement: false,
      from: dateObjectToDate(dateYouLeft),
      to: dateObjectToDate(dateYouReturned),
    };
  }

  const { dateOfClaim } = getDateOfClaim(dateOfClaimParams);
  return dateOfClaim;
};

module.exports = getOfferedDateOfClaim;
