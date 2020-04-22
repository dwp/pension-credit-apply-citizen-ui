const { waypoints } = require('../../lib/constants.js');
const claimantDetailsValidation = require('../field-validators/about-claimant/claimant-details.js');
const contactFormatsValidation = require('../field-validators/about-claimant/contact-formats.js');
const partnerDetailsValidation = require('../field-validators/about-claimant/partner-details.js');
const partnerNationalityValidation = require('../field-validators/about-claimant/partner-nationality.js');
const careHomeValidation = require('../field-validators/about-claimant/care-home.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.CLAIMANT_DETAILS] = {
    view: 'pages/about-citizen/claimant-details.njk',
    fieldValidators: claimantDetailsValidation,
  };

  pages[waypoints.CONTACT_FORMATS] = {
    view: 'pages/about-citizen/contact-formats.njk',
    fieldValidators: contactFormatsValidation,
  };

  pages[waypoints.PARTNER_DETAILS] = {
    view: 'pages/about-citizen/partner-details.njk',
    fieldValidators: partnerDetailsValidation,
  };

  pages[waypoints.PARTNER_NATIONALITY] = {
    view: 'pages/about-citizen/partner-nationality.njk',
    fieldValidators: partnerNationalityValidation,
  };

  pages[waypoints.CARE_HOME] = {
    view: 'pages/about-citizen/care-home.njk',
    fieldValidators: careHomeValidation,
  };

  return pages;
};
