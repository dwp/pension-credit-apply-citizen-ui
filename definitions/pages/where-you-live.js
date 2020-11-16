const { trimWhitespace } = require('@dwp/govuk-casa').gatherModifiers;

const { waypoints } = require('../../lib/constants.js');

const postcodeHooks = require('../hooks/common/postcode.js');
const manualAddressHooks = require('../hooks/common/manual-address.js');
const selectAddressHooks = require('../hooks/common/select-address.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');
const northernIrelandClaim = require('../hooks/common/northern-ireland-claim.js');
const shareRentMortgageHook = require('../hooks/where-you-live/share-rent-mortgage.js');

const postcodeValidation = require('../field-validators/common/postcode.js');
const selectAddressValidation = require('../field-validators/common/select-address.js');
const manualAddressValidation = require('../field-validators/common/manual-address.js');
const livesWithYouValidation = require('../field-validators/where-you-live/lives-with-you.js');
const rentCouncilTaxValidation = require('../field-validators/where-you-live/rent-council-tax-rates.js');
const homeOwnershipValidation = require('../field-validators/where-you-live/home-ownership.js');
const serviceChargesValidation = require('../field-validators/where-you-live/service-charges.js');
const groundRentValidation = require('../field-validators/where-you-live/ground-rent.js');
const mortgageValidation = require('../field-validators/where-you-live/mortgage.js');
const housingBenefitValidation = require('../field-validators/where-you-live/housing-benefit.js');
const twentyOneYearLeaseValidation = require('../field-validators/where-you-live/21-year-lease.js');
const homeLoanValidation = require('../field-validators/where-you-live/home-loan.js');
const shareRentMortgageValidation = require('../field-validators/where-you-live/share-rent-mortgage.js');

module.exports = (addressServiceFactory, mountUrl) => {
  const pages = Object.create(null);

  pages[waypoints.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP] = {
    view: 'pages/common/postcode.njk',
    fieldValidators: postcodeValidation(),
    fieldGatherModifiers: {
      postcode: trimWhitespace,
    },
    hooks: postcodeHooks(addressServiceFactory, waypoints.WHERE_YOU_LIVE_ADDRESS_MANUAL),
  };

  pages[waypoints.WHERE_YOU_LIVE_ADDRESS_SELECT] = {
    view: 'pages/common/select-address.njk',
    fieldValidators: selectAddressValidation(),
    hooks: selectAddressHooks(
      waypoints.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
      waypoints.WHERE_YOU_LIVE_ADDRESS_MANUAL,
      waypoints.WHERE_YOU_LIVE_ADDRESS_HIDDEN,
      waypoints.WHERE_YOU_LIVE_ADDRESS_SELECT,
    ),
  };

  pages[waypoints.WHERE_YOU_LIVE_ADDRESS_MANUAL] = {
    view: 'pages/common/manual-address.njk',
    fieldValidators: manualAddressValidation,
    hooks: manualAddressHooks(
      mountUrl,
      '',
      waypoints.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
      waypoints.WHERE_YOU_LIVE_ADDRESS_HIDDEN,
      waypoints.WHERE_YOU_LIVE_ADDRESS_MANUAL,
    ),
  };

  pages[waypoints.LIVES_WITH_YOU] = {
    view: 'pages/where-you-live/lives-with-you.njk',
    fieldValidators: livesWithYouValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  pages[waypoints.RENT_COUNCIL_TAX_RATES] = {
    view: 'pages/where-you-live/rent-council-tax-rates.njk',
    fieldValidators: rentCouncilTaxValidation,
    hooks: {
      prerender: [
        jointOrSingleClaim(waypoints),
        northernIrelandClaim(waypoints),
      ],
    },
  };

  pages[waypoints.HOME_OWNERSHIP] = {
    view: 'pages/where-you-live/home-ownership.njk',
    fieldValidators: homeOwnershipValidation,
  };

  pages[waypoints.SERVICE_CHARGES] = {
    view: 'pages/where-you-live/service-charges.njk',
    fieldValidators: serviceChargesValidation,
  };

  pages[waypoints.GROUND_RENT] = {
    view: 'pages/where-you-live/ground-rent.njk',
    fieldValidators: groundRentValidation,
  };

  pages[waypoints.MORTGAGE] = {
    view: 'pages/where-you-live/mortgage.njk',
    fieldValidators: mortgageValidation,
  };

  pages[waypoints.HOUSING_BENEFIT] = {
    view: 'pages/where-you-live/housing-benefit.njk',
    fieldValidators: housingBenefitValidation,
  };

  pages[waypoints.TWENTY_ONE_YEAR_LEASE] = {
    view: 'pages/where-you-live/21-year-lease.njk',
    fieldValidators: twentyOneYearLeaseValidation,
  };

  pages[waypoints.HOME_LOAN] = {
    view: 'pages/where-you-live/home-loan.njk',
    fieldValidators: homeLoanValidation,
  };

  pages[waypoints.SHARE_RENT_MORTGAGE] = {
    view: 'pages/where-you-live/share-rent-mortgage.njk',
    fieldValidators: shareRentMortgageValidation,
    hooks: {
      prerender: [
        jointOrSingleClaim(waypoints),
        shareRentMortgageHook,
      ],
    },
  };

  return pages;
};
