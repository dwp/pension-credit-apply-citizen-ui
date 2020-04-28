const { trimWhitespace } = require('@dwp/govuk-casa').gatherModifiers;

const { waypoints } = require('../../lib/constants.js');

const postcodeHooks = require('../hooks/common/postcode.js');
const manualAddressHooks = require('../hooks/common/manual-address.js');
const selectAddressHooks = require('../hooks/common/select-address.js');

const postcodeValidation = require('../field-validators/common/postcode.js');
const selectAddressValidation = require('../field-validators/common/select-address.js');
const manualAddressValidation = require('../field-validators/common/manual-address.js');

const returnedToUk = require('../field-validators/hrt-partner/returned-to-uk.js');
const nationalityDetails = require('../field-validators/hrt-partner/nationality-details.js');
const ukSponsorship = require('../field-validators/hrt-partner/uk-sponsorship.js');
const sponsorshipDetails = require('../field-validators/hrt-partner/sponsorship-details.js');
const asylumSeeker = require('../field-validators/hrt-partner/asylum-seeker.js');

module.exports = (addressServiceFactory, mountUrl) => {
  const pages = Object.create(null);

  pages[waypoints.HRT_PARTNER_RETURNED_TO_UK] = {
    view: 'pages/hrt-partner/returned-to-uk.njk',
    fieldValidators: returnedToUk,
  };

  pages[waypoints.HRT_PARTNER_NATIONALITY_DETAILS] = {
    view: 'pages/hrt-partner/nationality-details.njk',
    fieldValidators: nationalityDetails,
  };

  pages[waypoints.HRT_PARTNER_UK_SPONSORSHIP] = {
    view: 'pages/hrt-partner/uk-sponsorship.njk',
    fieldValidators: ukSponsorship,
  };

  pages[waypoints.HRT_PARTNER_SPONSORSHIP_DETAILS] = {
    view: 'pages/hrt-partner/sponsorship-details.njk',
    fieldValidators: sponsorshipDetails,
  };

  pages[waypoints.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP] = {
    view: 'pages/common/postcode.njk',
    fieldValidators: postcodeValidation,
    fieldGatherModifiers: {
      postcode: trimWhitespace,
    },
    hooks: postcodeHooks(addressServiceFactory, waypoints.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL, 'partnerSponsorPageTitle'),
  };

  pages[waypoints.HRT_PARTNER_SPONSOR_ADDRESS_SELECT] = {
    view: 'pages/common/select-address.njk',
    fieldValidators: selectAddressValidation,
    hooks: selectAddressHooks(
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL,
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN,
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_SELECT,
    ),
  };

  pages[waypoints.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL] = {
    view: 'pages/common/manual-address.njk',
    fieldValidators: manualAddressValidation,
    hooks: manualAddressHooks(
      mountUrl,
      '',
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN,
      waypoints.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL,
      'partnerSponsorPageTitle',
    ),
  };

  pages[waypoints.HRT_PARTNER_ASYLUM_SEEKER] = {
    view: 'pages/hrt-partner/asylum-seeker.njk',
    fieldValidators: asylumSeeker,
  };

  return pages;
};