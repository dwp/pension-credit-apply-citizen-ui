const { waypoints } = require('../../lib/constants.js');
const claimantDetailsValidation = require('../field-validators/about-claimant/claimant-details.js');
const partnerDetailsValidation = require('../field-validators/about-claimant/partner-details.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.CLAIMANT_DETAILS] = {
    view: 'pages/about-citizen/claimant-details.njk',
    fieldValidators: claimantDetailsValidation,
  };

  pages[waypoints.PARTNER_DETAILS] = {
    view: 'pages/about-citizen/partner-details.njk',
    fieldValidators: partnerDetailsValidation,
  };

  return pages;
};
