const { waypoints: WP } = require('../../lib/constants.js');
const { citizenNeedsHRT, onlyPartnerNeedsHRT, noHRTNeeded } = require('../route-conditions/hrt.js');
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

  // Ask about disregarded money if claimant has over £10,000 or second property
  plan.setRoute(WP.SECOND_PROPERTY, WP.DISREGARDED_MONEY, over10k);

  // If we don't need to ask about disregards, go to either HRT or claim help
  plan.setRoute(WP.SECOND_PROPERTY, WP.HRT_CITIZEN_RETURNED_TO_UK, (r, c) => (
    underOrAt10k(r, c) && citizenNeedsHRT(r, c)
  ));
  plan.setRoute(WP.SECOND_PROPERTY, WP.HRT_PARTNER_RETURNED_TO_UK, (r, c) => (
    underOrAt10k(r, c) && onlyPartnerNeedsHRT(r, c)
  ));
  plan.setRoute(WP.SECOND_PROPERTY, WP.CLAIM_HELP, (r, c) => (
    underOrAt10k(r, c) && noHRTNeeded(r, c)
  ));

  // After disregards also need to consider HRT or go to claim help
  plan.setRoute(WP.DISREGARDED_MONEY, WP.HRT_CITIZEN_RETURNED_TO_UK, citizenNeedsHRT);
  plan.setRoute(WP.DISREGARDED_MONEY, WP.HRT_PARTNER_RETURNED_TO_UK, onlyPartnerNeedsHRT);
  plan.setRoute(WP.DISREGARDED_MONEY, WP.CLAIM_HELP, noHRTNeeded);
};
