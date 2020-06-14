const { waypoints } = require('../../lib/constants.js');
const checkboxesModifier = require('../field-gather-modifiers/checkboxes.js');
const nationalInsuranceValidation = require('../field-validators/about-claimant/national-insurance.js');
const yourNameValidation = require('../field-validators/about-claimant/your-name.js');
const phoneNumberValidation = require('../field-validators/about-claimant/phone-number.js');
const claimantLanguageValidation = require('../field-validators/about-claimant/claimant-language.js');
const claimantDetailsValidation = require('../field-validators/about-claimant/claimant-details.js');
const contactFormatsValidation = require('../field-validators/about-claimant/contact-formats.js');
const partnerDetailsValidation = require('../field-validators/about-claimant/partner-details.js');
const partnerNationalityValidation = require('../field-validators/about-claimant/partner-nationality.js');
const careHomeValidation = require('../field-validators/about-claimant/care-home.js');
const northernIrelandClaim = require('../hooks/common/northern-ireland-claim.js');
const withDataFromPage = require('../hooks/common/with-data-from-page.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.NATIONAL_INSURANCE] = {
    view: 'pages/about-citizen/national-insurance.njk',
    fieldValidators: nationalInsuranceValidation,
  };

  pages[waypoints.YOUR_NAME] = {
    view: 'pages/about-citizen/your-name.njk',
    fieldValidators: yourNameValidation,
  };

  pages[waypoints.PHONE_NUMBER] = {
    view: 'pages/about-citizen/phone-number.njk',
    fieldValidators: phoneNumberValidation,
  };

  pages[waypoints.CLAIMANT_LANGUAGE] = {
    view: 'pages/about-citizen/claimant-language.njk',
    fieldValidators: claimantLanguageValidation,
    hooks: {
      prerender: withDataFromPage({
        [waypoints.COUNTRY_YOU_LIVE_IN]: ['countryOfResidence'],
      }),
    },
  };

  pages[waypoints.CLAIMANT_DETAILS] = {
    view: 'pages/about-citizen/claimant-details.njk',
    fieldValidators: claimantDetailsValidation,
  };

  pages[waypoints.CONTACT_FORMATS] = {
    view: 'pages/about-citizen/contact-formats.njk',
    fieldValidators: contactFormatsValidation,
    fieldGatherModifiers: {
      contactFormats: checkboxesModifier,
    },
  };

  pages[waypoints.PARTNER_DETAILS] = {
    view: 'pages/about-citizen/partner-details.njk',
    fieldValidators: partnerDetailsValidation,
  };

  pages[waypoints.PARTNER_NATIONALITY] = {
    view: 'pages/about-citizen/partner-nationality.njk',
    fieldValidators: partnerNationalityValidation,
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  pages[waypoints.CARE_HOME] = {
    view: 'pages/about-citizen/care-home.njk',
    fieldValidators: careHomeValidation,
  };

  return pages;
};
