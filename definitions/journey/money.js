const { waypoints: WP } = require('../../lib/constants.js');
const { citizenNeedsHRT, onlyPartnerNeedsHRT, noHRTNeeded } = require('../route-conditions/hrt.js');
const over10k = require('../route-conditions/over-10k.js');

module.exports = (plan) => {
  const underOrAt10k = (r, c) => !over10k(r, c);

  plan.addSequence(WP.MONEY_YOU_HAVE, WP.SECOND_PROPERTY);

  plan.setRoute(WP.SECOND_PROPERTY, WP.DISREGARDED_MONEY, over10k);
  plan.setRoute(WP.SECOND_PROPERTY, WP.HRT_CITIZEN_RETURNED_TO_UK, (r, c) => (
    underOrAt10k(r, c) && citizenNeedsHRT(r, c)
  ));
  plan.setRoute(WP.SECOND_PROPERTY, WP.HRT_PARTNER_RETURNED_TO_UK, (r, c) => (
    underOrAt10k(r, c) && onlyPartnerNeedsHRT(r, c)
  ));
  plan.setRoute(WP.SECOND_PROPERTY, WP.CLAIM_HELP, (r, c) => (
    underOrAt10k(r, c) && noHRTNeeded(r, c)
  ));
};
