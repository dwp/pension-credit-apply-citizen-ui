const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // If claimant has a partner ask for partner details
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.PARTNER_DETAILS, isYes('liveWithPartner', WP.LIVE_WITH_PARTNER));
  plan.addSequence(WP.PARTNER_DETAILS, WP.PARTNER_NATIONALITY, WP.CARE_HOME);

  // Otherwise go straight to care home
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.CARE_HOME, isNo('liveWithPartner', WP.LIVE_WITH_PARTNER));
};
