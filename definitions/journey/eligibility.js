const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  plan.addSequence(WP.START, WP.CLAIMED_STATE_PENSION);

  // Kick out if claimant has not claimed their State Pension
  plan.setRoute(WP.CLAIMED_STATE_PENSION, WP.STATE_PENSION_NOT_CLAIMED, isNo('statePensionClaimed'));
  plan.setRoute(WP.CLAIMED_STATE_PENSION, WP.CHILDREN_LIVING_WITH_YOU, isYes('statePensionClaimed'));
};
