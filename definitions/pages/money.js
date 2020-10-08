const { trimWhitespace } = require('@dwp/govuk-casa').gatherModifiers;
const { waypoints } = require('../../lib/constants.js');
const checkboxesModifier = require('../field-gather-modifiers/checkboxes.js');
const removeTrailingStop = require('../field-gather-modifiers/remove-trailing-stop.js');
const moneyYouHaveValidation = require('../field-validators/money/money-you-have.js');
const secondPropertyValidation = require('../field-validators/money/second-property.js');
const bondsValidation = require('../field-validators/money/bonds.js');
const disregardedMoneyValidation = require('../field-validators/money/disregarded-money.js');
const jointOrSingleClaim = require('../hooks/common/joint-or-single-claim.js');
const needToBackdate = require('../hooks/common/need-to-backdate.js');
const northernIrelandClaim = require('../hooks/common/northern-ireland-claim.js');
const chosenDateOfClaim = require('../hooks/common/chosen-date-of-claim.js');
const moneyYouHaveHooks = require('../hooks/money/money-you-have.js');

module.exports = () => {
  const pages = Object.create(null);
  const moneyModifiers = [trimWhitespace, removeTrailingStop];

  pages[waypoints.MONEY_YOU_HAVE] = {
    view: 'pages/money/money-you-have.njk',
    fieldValidators: moneyYouHaveValidation,
    fieldGatherModifiers: {
      moneyBackdated: moneyModifiers,
      moneyToday: moneyModifiers,
    },
    hooks: {
      prerender: [
        moneyYouHaveHooks(waypoints.MONEY_YOU_HAVE),
        jointOrSingleClaim(waypoints),
        needToBackdate,
        chosenDateOfClaim,
      ],
    },
  };

  pages[waypoints.SECOND_PROPERTY] = {
    view: 'pages/money/second-property.njk',
    fieldValidators: secondPropertyValidation,
  };

  pages[waypoints.BONDS] = {
    view: 'pages/money/bonds.njk',
    fieldValidators: bondsValidation,
  };

  pages[waypoints.DISREGARDED_MONEY] = {
    view: 'pages/money/disregarded-money.njk',
    fieldValidators: disregardedMoneyValidation,
    fieldGatherModifiers: {
      disregardedMoney: checkboxesModifier,
    },
    hooks: {
      prerender: northernIrelandClaim(waypoints),
    },
  };

  return pages;
};
