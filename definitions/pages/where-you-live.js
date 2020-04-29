const { trimWhitespace } = require('@dwp/govuk-casa').gatherModifiers;

const { waypoints } = require('../../lib/constants.js');

const postcodeHooks = require('../hooks/common/postcode.js');
const manualAddressHooks = require('../hooks/common/manual-address.js');
const selectAddressHooks = require('../hooks/common/select-address.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');

const postcodeValidation = require('../field-validators/common/postcode.js');
const selectAddressValidation = require('../field-validators/common/select-address.js');
const manualAddressValidation = require('../field-validators/common/manual-address.js');
const lettersHomeValidation = require('../field-validators/where-you-live/letters-home.js');
const livesWithYouValidation = require('../field-validators/where-you-live/lives-with-you.js');
const rentCouncilTaxValidation = require('../field-validators/where-you-live/rent-council-tax.js');
const homeOwnershipValidation = require('../field-validators/where-you-live/home-ownership.js');
const serviceChargesValidation = require('../field-validators/where-you-live/service-charges.js');
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

  pages[waypoints.LETTERS_HOME] = {
    view: 'pages/where-you-live/letters-home.njk',
    fieldValidators: lettersHomeValidation,
  };

  pages[waypoints.LETTERS_ADDRESS_POSTCODE_LOOKUP] = {
    view: 'pages/common/postcode.njk',
    fieldValidators: postcodeValidation('Letters'),
    fieldGatherModifiers: {
      postcode: trimWhitespace,
    },
    hooks: postcodeHooks(addressServiceFactory, waypoints.LETTERS_ADDRESS_MANUAL, 'lettersPageTitle'),
  };

  pages[waypoints.LETTERS_ADDRESS_SELECT] = {
    view: 'pages/common/select-address.njk',
    fieldValidators: selectAddressValidation('Letters'),
    hooks: selectAddressHooks(
      waypoints.LETTERS_ADDRESS_POSTCODE_LOOKUP,
      waypoints.LETTERS_ADDRESS_MANUAL,
      waypoints.LETTERS_ADDRESS_HIDDEN,
      waypoints.LETTERS_ADDRESS_SELECT,
      'lettersPageTitle',
    ),
  };

  pages[waypoints.LETTERS_ADDRESS_MANUAL] = {
    view: 'pages/common/manual-address.njk',
    fieldValidators: manualAddressValidation,
    hooks: manualAddressHooks(
      mountUrl,
      '',
      waypoints.LETTERS_ADDRESS_POSTCODE_LOOKUP,
      waypoints.LETTERS_ADDRESS_HIDDEN,
      waypoints.LETTERS_ADDRESS_MANUAL,
      'lettersPageTitle',
    ),
  };

  pages[waypoints.LIVES_WITH_YOU] = {
    view: 'pages/where-you-live/lives-with-you.njk',
    fieldValidators: livesWithYouValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  pages[waypoints.RENT_COUNCIL_TAX] = {
    view: 'pages/where-you-live/rent-council-tax.njk',
    fieldValidators: rentCouncilTaxValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
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

  pages[waypoints.HOME_LOAN] = {
    view: 'pages/where-you-live/home-loan.njk',
    fieldValidators: homeLoanValidation,
  };

  pages[waypoints.SHARE_RENT_MORTGAGE] = {
    view: 'pages/where-you-live/share-rent-mortgage.njk',
    fieldValidators: shareRentMortgageValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  return pages;
};
