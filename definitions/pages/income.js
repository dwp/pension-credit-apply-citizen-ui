const { waypoints } = require('../../lib/constants.js');
const universalCreditValidation = require('../field-validators/income/universal-credit.js');
const benefitsValidation = require('../field-validators/income/benefits.js');
const employmentValidation = require('../field-validators/income/employment.js');
const selfEmploymentValidation = require('../field-validators/income/self-employment.js');
const otherIncomeValidation = require('../field-validators/income/other-income.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');
const selfEmploymentsHooks = require('../hooks/income/self-employment.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.UNIVERSAL_CREDIT] = {
    view: 'pages/income/universal-credit.njk',
    fieldValidators: universalCreditValidation,
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

  pages[waypoints.EMPLOYMENT] = {
    view: 'pages/income/employment.njk',
    fieldValidators: employmentValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  pages[waypoints.SELF_EMPLOYMENT] = {
    view: 'pages/income/self-employment.njk',
    fieldValidators: selfEmploymentValidation,
    hooks: {
      prerender: [
        jointOrSingleClaim(waypoints),
        selfEmploymentsHooks,
      ],
    },
  };

  pages[waypoints.OTHER_INCOME] = {
    view: 'pages/income/other-income.njk',
    fieldValidators: otherIncomeValidation,
    hooks: {
      prerender: jointOrSingleClaim(waypoints),
    },
  };

  return pages;
};
