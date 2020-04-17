const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  plan.addSequence(WP.START, WP.CLAIMED_STATE_PENSION);

  // Kick out if claimant has not claimed their State Pension
  plan.setRoute(WP.CLAIMED_STATE_PENSION, WP.STATE_PENSION_NOT_CLAIMED, isNo('statePensionClaimed'));
  plan.setRoute(WP.CLAIMED_STATE_PENSION, WP.CHILDREN_LIVING_WITH_YOU, isYes('statePensionClaimed'));

  // Kick out if claimant has children
  plan.setRoute(WP.CHILDREN_LIVING_WITH_YOU, WP.CLAIM_INCLUDES_CHILDREN, isYes('hasChildren'));
  plan.setRoute(WP.CHILDREN_LIVING_WITH_YOU, WP.LIVE_ENGLAND_SCOTLAND_WALES, isNo('hasChildren'));

  // Kick out if claimant does not live in England, Scotland or Wales
  plan.setRoute(WP.LIVE_ENGLAND_SCOTLAND_WALES, WP.DO_NOT_LIVE_UK, isNo('inEnglandScotlandWales'));
  plan.setRoute(WP.LIVE_ENGLAND_SCOTLAND_WALES, WP.YOUR_NATIONALITY, isYes('inEnglandScotlandWales'));

  plan.addSequence(WP.YOUR_NATIONALITY, WP.DATE_OF_BIRTH);
};
