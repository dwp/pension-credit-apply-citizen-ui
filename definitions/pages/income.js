const { waypoints } = require('../../lib/constants.js');
const privatePensionsValidation = require('../field-validators/income/private-pensions.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.PRIVATE_PENSIONS] = {
    view: 'pages/income/private-pensions.njk',
    fieldValidators: privatePensionsValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  return pages;
};
