const { waypoints } = require('../../lib/constants.js');
const moneyYouHaveValidation = require('../field-validators/money/money-you-have.js');
const secondPropertyValidation = require('../field-validators/money/second-property.js');
const disregardedMoneyValidation = require('../field-validators/money/disregarded-money.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');
const withDataFromPage = require('../hooks/common/with-data-from-page.js');
const needToBackdate = require('../hooks/common/need-to-backdate.js');

module.exports = () => {
  const pages = Object.create(null);

  pages[waypoints.MONEY_YOU_HAVE] = {
    view: 'pages/money/money-you-have.njk',
    fieldValidators: moneyYouHaveValidation,
    hooks: {
      prerender: [
        jointOrSingleClaim(waypoints),
        needToBackdate,
        withDataFromPage({
          [waypoints.DATE_OF_CLAIM]: ['dateOfClaim'],
        }),
      ],
    },
  };

  pages[waypoints.SECOND_PROPERTY] = {
    view: 'pages/money/second-property.njk',
    fieldValidators: secondPropertyValidation,
  };

  pages[waypoints.DISREGARDED_MONEY] = {
    view: 'pages/money/disregarded-money.njk',
    fieldValidators: disregardedMoneyValidation,
  };

  return pages;
};
