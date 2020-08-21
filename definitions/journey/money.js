const { waypoints: WP } = require('../../lib/constants.js');
const { d } = require('../../utils/journey-helpers');
const needToBackDate = require('../../utils/need-to-backdate');
const over10k = require('../route-conditions/over-10k.js');

module.exports = (plan) => {
  const underOrAt10k = (r, c) => !over10k(r, c);

  plan.setRoute(WP.MONEY_YOU_HAVE, WP.SECOND_PROPERTY, (r, c) => {
    // If the user changes their date of claim from check your answers enabling
    // backdating, make sure they stop at this page to complete the
    // 'moneyBackdated' field
    if (needToBackDate(c)) {
      return !!d(r, c).moneyBackdated;
    }
    return true;
  });

  // If claimant has over £10,000 or a second property go down disregard journey
  plan.setRoute(WP.SECOND_PROPERTY, WP.BONDS, over10k);
  plan.addSequence(WP.BONDS, WP.DISREGARDED_MONEY, WP.YOUR_NATIONALITY);

  // Otherwise go straight to nationality questions
  plan.setRoute(WP.SECOND_PROPERTY, WP.YOUR_NATIONALITY, underOrAt10k);
};
