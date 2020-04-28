const { waypoints } = require('../../lib/constants.js');
const moneyYouHaveValidation = require('../field-validators/money/money-you-have.js');
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

  return pages;
};
