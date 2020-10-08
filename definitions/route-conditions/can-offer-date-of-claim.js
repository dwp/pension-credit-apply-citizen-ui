const getDateOfClaim = require('@dwp/pension-credit-date-of-claim');
const { waypoints: WP } = require('../../lib/constants.js');
const dateObjectToDate = require('../../utils/date-object-to-date.js');

const canOfferDateOfClaim = (r, c) => {
  const { applicationDate } = c.getDataForPage(WP.START) || {};
  const { dateOfBirth } = c.getDataForPage(WP.DATE_OF_BIRTH) || {};
  const { periodAbroadForMedical } = c.getDataForPage(WP.ABROAD_MEDICAL) || {};
  const { dateYouLeft, dateYouReturned } = c.getDataForPage(WP.DATES_ABROAD) || {};

  const { dateOfClaim } = getDateOfClaim({
    dateOfBirth: dateObjectToDate(dateOfBirth),
    applicationDate: new Date(applicationDate || Date.now()),
    abroadPeriod: {
      from: dateObjectToDate(dateYouLeft),
      to: dateObjectToDate(dateYouReturned),
      medicalOrBereavement: (periodAbroadForMedical === 'yes'),
    },
  });

  return dateOfClaim !== null;
};

module.exports = canOfferDateOfClaim;
