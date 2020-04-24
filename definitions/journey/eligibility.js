const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');
const checkSPA = require('../route-conditions/check-state-pension-age.js');

module.exports = (plan) => {
  // True if claimant is at or over State Pension age
  const claimantAtOrOverSPA = checkSPA(WP.DATE_OF_BIRTH, 'dateOfBirth', true);

  // True if claimant is under State Pension age
  const claimantUnderSPA = checkSPA(WP.DATE_OF_BIRTH, 'dateOfBirth', false);

  // True if partner is at or over State Pension age
  const partnerAtOrOverSPA = checkSPA(WP.LIVE_WITH_PARTNER, 'partnerDateOfBirth', true);

  // True if partner is under State Pension age
  const partnerUnderSPA = checkSPA(WP.LIVE_WITH_PARTNER, 'partnerDateOfBirth', false);

  // Start page
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

  // Kick out if claimant is under State Pension age
  plan.setRoute(WP.DATE_OF_BIRTH, WP.TOO_YOUNG_TO_CLAIM, claimantUnderSPA);
  plan.setRoute(WP.DATE_OF_BIRTH, WP.LIVE_WITH_PARTNER, claimantAtOrOverSPA);

  // If claimant has a partner over State Pension age ask if they agree to claim
  plan.setRoute(WP.LIVE_WITH_PARTNER, WP.DATE_OF_CLAIM, isNo('liveWithPartner'));
  plan.setRoute(WP.LIVE_WITH_PARTNER, WP.PARTNER_AGREE, (r, c) => isYes('liveWithPartner')(r, c) && partnerAtOrOverSPA(r, c));

  // If partner is under State Pension age ask about Housing Benefit, if they
  // don't get it then kick out
  plan.setRoute(WP.LIVE_WITH_PARTNER, WP.PARTNER_HOUSING_BENEFIT, (r, c) => isYes('liveWithPartner')(r, c) && partnerUnderSPA(r, c));
  plan.setRoute(WP.PARTNER_HOUSING_BENEFIT, WP.DONE_PARTNER, isNo('partnerGetsHousingBenefit'));

  // If they get Housing Benefit ask if they agree to claim and continue
  plan.setRoute(WP.PARTNER_HOUSING_BENEFIT, WP.PARTNER_AGREE, isYes('partnerGetsHousingBenefit'));
  plan.addSequence(WP.PARTNER_AGREE, WP.DATE_OF_CLAIM);
};
