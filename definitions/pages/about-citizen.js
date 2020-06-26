const { waypoints } = require('../../lib/constants.js');
const checkboxesModifier = require('../field-gather-modifiers/checkboxes.js');
const nationalInsuranceValidation = require('../field-validators/about-claimant/national-insurance.js');
const yourNameValidation = require('../field-validators/about-claimant/your-name.js');
const phoneNumberValidation = require('../field-validators/about-claimant/phone-number.js');
const claimantLanguageValidation = require('../field-validators/about-claimant/claimant-language.js');
const registeredBlindValidation = require('../field-validators/about-claimant/registered-blind.js');
const helpLettersCallsValidation = require('../field-validators/about-claimant/help-letters-calls.js');
const contactFormatsValidation = require('../field-validators/about-claimant/contact-formats.js');
const partnerNationalInsuranceValidation = require('../field-validators/about-claimant/partner-national-insurance.js');
const partnerNameValidation = require('../field-validators/about-claimant/partner-name.js');
const partnerRegisteredBlindValidation = require('../field-validators/about-claimant/partner-registered-blind.js');
const careHomeValidation = require('../field-validators/about-claimant/care-home.js');
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

  pages[waypoints.REGISTERED_BLIND] = {
    view: 'pages/about-citizen/registered-blind.njk',
    fieldValidators: registeredBlindValidation,
  };

  pages[waypoints.HELP_LETTERS_CALLS] = {
    view: 'pages/about-citizen/help-letters-calls.njk',
    fieldValidators: helpLettersCallsValidation,
  };

  pages[waypoints.CONTACT_FORMATS] = {
    view: 'pages/about-citizen/contact-formats.njk',
    fieldValidators: contactFormatsValidation,
    fieldGatherModifiers: {
      contactFormats: checkboxesModifier,
    },
  };

  pages[waypoints.PARTNER_NI_NUMBER] = {
    view: 'pages/about-citizen/partner-national-insurance.njk',
    fieldValidators: partnerNationalInsuranceValidation,
  };

  pages[waypoints.PARTNER_NAME] = {
    view: 'pages/about-citizen/partner-name.njk',
    fieldValidators: partnerNameValidation,
  };

  pages[waypoints.PARTNER_BLIND] = {
    view: 'pages/about-citizen/partner-registered-blind.njk',
    fieldValidators: partnerRegisteredBlindValidation,
  };

  pages[waypoints.CARE_HOME] = {
    view: 'pages/about-citizen/care-home.njk',
    fieldValidators: careHomeValidation,
  };

  return pages;
};
