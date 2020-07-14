const { trimWhitespace } = require('@dwp/govuk-casa').gatherModifiers;
const checkboxesModifier = require('../field-gather-modifiers/checkboxes.js');

const { waypoints } = require('../../lib/constants.js');
const daErrorMessage = require('../../utils/delegated-authority-error-message.js');

const postcodeHooks = require('../hooks/common/postcode.js');
const manualAddressHooks = require('../hooks/common/manual-address.js');
const selectAddressHooks = require('../hooks/common/select-address.js');
const whoMadeClaimHooks = require('../hooks/common/who-made-claim.js');
const withDataFromPage = require('../hooks/common/with-data-from-page.js');

const whoMadeClaimValidation = require('../field-validators/contact-details/who-made-claim.js');
const canWeCallValidation = require('../field-validators/contact-details/can-we-call.js');
const delegatedAuthorityDetailsValidation = require('../field-validators/contact-details/delegated-authority-details.js');
const languageValidation = require('../field-validators/contact-details/language.js');
const differentFormatsValidation = require('../field-validators/contact-details/different-formats.js');
const contactFormatsValidation = require('../field-validators/contact-details/contact-formats.js');
const letterAddressValidation = require('../field-validators/contact-details/letter-address.js');
const postcodeValidation = require('../field-validators/common/postcode.js');
const selectAddressValidation = require('../field-validators/common/select-address.js');
const manualAddressValidation = require('../field-validators/common/manual-address.js');

module.exports = (addressServiceFactory, mountUrl) => {
  const pages = Object.create(null);

  pages[waypoints.WHO_MADE_CLAIM] = {
    view: 'pages/contact-details/who-made-claim.njk',
    fieldValidators: whoMadeClaimValidation,
  };

  pages[waypoints.CAN_WE_CALL] = {
    view: 'pages/contact-details/can-we-call.njk',
    fieldValidators: canWeCallValidation,
    hooks: whoMadeClaimHooks,
  };

  pages[waypoints.DELEGATED_AUTHORITY_DETAILS] = {
    view: 'pages/contact-details/delegated-authority-details.njk',
    fieldValidators: delegatedAuthorityDetailsValidation,
    hooks: whoMadeClaimHooks,
  };

  pages[waypoints.LANGUAGE] = {
    view: 'pages/contact-details/language.njk',
    fieldValidators: languageValidation,
    hooks: {
      prerender: [
        whoMadeClaimHooks.prerender,
        withDataFromPage({
          [waypoints.COUNTRY_YOU_LIVE_IN]: ['countryOfResidence'],
        }),
      ],
    },
  };

  pages[waypoints.DIFFERENT_FORMATS] = {
    view: 'pages/contact-details/different-formats.njk',
    fieldValidators: differentFormatsValidation,
    hooks: whoMadeClaimHooks,
  };

  pages[waypoints.CONTACT_FORMATS] = {
    view: 'pages/contact-details/contact-formats.njk',
    fieldValidators: contactFormatsValidation,
    fieldGatherModifiers: {
      contactFormats: checkboxesModifier,
    },
    hooks: whoMadeClaimHooks,
  };

  pages[waypoints.LETTERS_ADDRESS] = {
    view: 'pages/contact-details/letter-address.njk',
    fieldValidators: letterAddressValidation,
    hooks: whoMadeClaimHooks,
  };

  const postcodeLookupHooks = postcodeHooks(
    addressServiceFactory,
    waypoints.LETTERS_ADDRESS_MANUAL,
    'lettersPageTitle',
  );

  pages[waypoints.LETTERS_ADDRESS_POSTCODE_LOOKUP] = {
    view: 'pages/contact-details/postcode.njk',
    fieldValidators: postcodeValidation('Letters', daErrorMessage),
    fieldGatherModifiers: {
      postcode: trimWhitespace,
    },
    hooks: {
      postvalidate: postcodeLookupHooks.postvalidate,
      prerender: [
        postcodeLookupHooks.prerender,
        whoMadeClaimHooks.prerender,
      ],
    },
  };

  const selectHooks = selectAddressHooks(
    waypoints.LETTERS_ADDRESS_POSTCODE_LOOKUP,
    waypoints.LETTERS_ADDRESS_MANUAL,
    waypoints.LETTERS_ADDRESS_HIDDEN,
    waypoints.LETTERS_ADDRESS_SELECT,
    'lettersPageTitle',
  );

  pages[waypoints.LETTERS_ADDRESS_SELECT] = {
    view: 'pages/contact-details/select-address.njk',
    fieldValidators: selectAddressValidation('Letters'),
    hooks: {
      postvalidate: selectHooks.postvalidate,
      prerender: [
        selectHooks.prerender,
        whoMadeClaimHooks.prerender,
      ],
    },
  };

  const manualHooks = manualAddressHooks(
    mountUrl,
    '',
    waypoints.LETTERS_ADDRESS_POSTCODE_LOOKUP,
    waypoints.LETTERS_ADDRESS_HIDDEN,
    waypoints.LETTERS_ADDRESS_MANUAL,
    'lettersPageTitle',
  );

  pages[waypoints.LETTERS_ADDRESS_MANUAL] = {
    view: 'pages/contact-details/manual-address.njk',
    fieldValidators: manualAddressValidation,
    hooks: {
      postvalidate: manualHooks.postvalidate,
      prerender: [
        manualHooks.prerender,
        whoMadeClaimHooks.prerender,
      ],
    },
  };

  return pages;
};
