const { waypoints } = require('../../lib/constants.js');
const benefitsValidation = require('../field-validators/income/benefits.js');
const earningsValidation = require('../field-validators/income/earnings.js');
const otherIncomeValidation = require('../field-validators/income/other-income.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');
const earningsHooks = require('../hooks/income/earnings.js');

module.exports = () => {
  const pages = Object.create(null);

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
        earningsHooks,
      ],
    },
  };

  pages[waypoints.OTHER_INCOME] = {
    view: 'pages/income/other-income.njk',
    fieldValidators: otherIncomeValidation,
    hooks: {
      prerender: [
        jointOrSingleClaim(waypoints),
      ],
    },
  };

  return pages;
};
