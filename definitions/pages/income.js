const { waypoints } = require('../../lib/constants.js');
const privatePensionsValidation = require('../field-validators/income/private-pensions.js');
const benefitsValidation = require('../field-validators/income/benefits.js');
const earningsValidation = require('../field-validators/income/earnings.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');
const withDataFromPage = require('../hooks/common/with-data-from-page.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.PRIVATE_PENSIONS] = {
    view: 'pages/income/private-pensions.njk',
    fieldValidators: privatePensionsValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  pages[waypoints.BENEFITS] = {
    view: 'pages/income/benefits.njk',
    fieldValidators: benefitsValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  pages[waypoints.EARNINGS] = {
    view: 'pages/income/earnings.njk',
    fieldValidators: earningsValidation,
    hooks: {
      prerender: [
        jointOrSingleClaim(waypoints),
        withDataFromPage({
          [waypoints.DATE_OF_CLAIM]: ['dateOfClaim'],
        }),
      ],
    },
  };

  return pages;
};
