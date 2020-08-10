const { trimWhitespace } = require('@dwp/govuk-casa').gatherModifiers;
const deepTrimWhitespace = require('../field-gather-modifiers/deep-trim-white-space.js');

const { waypoints } = require('../../lib/constants.js');

const postcodeHooks = require('../hooks/common/postcode.js');
const manualAddressHooks = require('../hooks/common/manual-address.js');
const selectAddressHooks = require('../hooks/common/select-address.js');
const northernIrelandClaim = require('../hooks/common/northern-ireland-claim.js');

const postcodeValidation = require('../field-validators/common/postcode.js');
const selectAddressValidation = require('../field-validators/common/select-address.js');
const manualAddressValidation = require('../field-validators/common/manual-address.js');

const yourNationalityValidation = require('../field-validators/hrt-citizen/your-nationality.js');
const returnedToUk = require('../field-validators/hrt-citizen/returned-to-uk.js');
const nationalityDetails = require('../field-validators/hrt-citizen/nationality-details.js');
const ukSponsorship = require('../field-validators/hrt-citizen/uk-sponsorship.js');
const sponsorshipDetails = require('../field-validators/hrt-citizen/sponsorship-details.js');
const asylumSeeker = require('../field-validators/hrt-citizen/asylum-seeker.js');

module.exports = (addressServiceFactory, mountUrl) => {
  const pages = Object.create(null);

  pages[waypoints.YOUR_NATIONALITY] = {
    view: 'pages/eligibility/your-nationality.njk',
    fieldValidators: yourNationalityValidation,
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  pages[waypoints.HRT_CITIZEN_RETURNED_TO_UK] = {
    view: 'pages/hrt-citizen/returned-to-uk.njk',
    fieldValidators: returnedToUk,
  };

  pages[waypoints.HRT_CITIZEN_NATIONALITY_DETAILS] = {
    view: 'pages/hrt-citizen/nationality-details.njk',
    fieldValidators: nationalityDetails,
    fieldGatherModifiers: {
      lastCameToUk: deepTrimWhitespace,
      lastLeftUk: deepTrimWhitespace,
    },
  };

  pages[waypoints.HRT_CITIZEN_UK_SPONSORSHIP] = {
    view: 'pages/hrt-citizen/uk-sponsorship.njk',
    fieldValidators: ukSponsorship,
  };

  pages[waypoints.HRT_CITIZEN_SPONSORSHIP_DETAILS] = {
    view: 'pages/hrt-citizen/sponsorship-details.njk',
    fieldValidators: sponsorshipDetails,
    fieldGatherModifiers: {
      sponsorshipUndertakingSigned: deepTrimWhitespace,
    },
  };

  pages[waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP] = {
    view: 'pages/common/postcode.njk',
    fieldValidators: postcodeValidation('Sponsor'),
    fieldGatherModifiers: {
      postcode: trimWhitespace,
    },
    hooks: postcodeHooks(addressServiceFactory, waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL, 'sponsorPageTitle', 'sponsorEnterManually'),
  };

  pages[waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT] = {
    view: 'pages/common/select-address.njk',
    fieldValidators: selectAddressValidation('Sponsor'),
    hooks: selectAddressHooks(
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL,
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT,
      'sponsorPageTitle',
    ),
  };

  pages[waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL] = {
    view: 'pages/common/manual-address.njk',
    fieldValidators: manualAddressValidation,
    hooks: manualAddressHooks(
      mountUrl,
      '',
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
      waypoints.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL,
      'sponsorPageTitle',
    ),
  };

  pages[waypoints.HRT_CITIZEN_ASYLUM_SEEKER] = {
    view: 'pages/hrt-citizen/asylum-seeker.njk',
    fieldValidators: asylumSeeker,
    fieldGatherModifiers: {
      successfulDecisionDate: deepTrimWhitespace,
    },
  };

  return pages;
};
