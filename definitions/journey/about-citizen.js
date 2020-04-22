const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.CARE_HOME, isNo('liveWithPartner', WP.LIVE_WITH_PARTNER));
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.PARTNER_DETAILS, isYes('liveWithPartner', WP.LIVE_WITH_PARTNER));
  plan.addSequence(WP.PARTNER_DETAILS, WP.PARTNER_NATIONALITY);
};
