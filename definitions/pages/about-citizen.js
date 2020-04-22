const { waypoints } = require('../../lib/constants.js');
const claimantDetailsValidation = require('../field-validators/about-claimant/claimant-details.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.CLAIMANT_DETAILS] = {
    view: 'pages/about-citizen/claimant-details.njk',
    fieldValidators: claimantDetailsValidation,
  };

  return pages;
};
