const { waypoints: WP } = require('../../lib/constants.js');
const {
  isYes, isNo, isEqualTo, isNotEqualTo,
} = require('../../utils/journey-helpers.js');
const spaIsToday = require('../route-conditions/spa-is-today.js');
const spaIsInThePast = require('../route-conditions/spa-is-in-the-past.js');
const spaIsWithin4Months = require('../route-conditions/spa-is-within-4-months.js');
const spaIsOver4MonthsAway = require('../route-conditions/spa-is-over-4-months-away.js');
const canOfferDateOfClaim = require('../route-conditions/can-offer-date-of-claim.js');
const partnerAtOrOverSPA = require('../route-conditions/partner-at-or-over-spa.js');
const claimantEligibleForPAHB = require('../route-conditions/eligible-for-pension-age-hb.js');

module.exports = (plan) => {
  // True if partner is under State Pension age
  const partnerUnderSPA = (r, c) => !partnerAtOrOverSPA(r, c);

  // True if claimant is not eligible for Pension Age Housing Benefit
  const claimantNotEligibleForPAHB = (r, c) => !claimantEligibleForPAHB(r, c);

  // True if date of claim calculation results in null value
  const canNotOfferDateOfClaim = (r, c) => !canOfferDateOfClaim(r, c);

  // Has a partner, and living with them
  const livingWithPartner = isEqualTo('havePartner', 'yesLiveTogether', WP.LIVE_WITH_PARTNER);
  const notLivingWithPartner = isNotEqualTo('havePartner', 'yesLiveTogether', WP.LIVE_WITH_PARTNER);

  // Start page
  plan.addSequence(WP.START, WP.COUNTRY_YOU_LIVE_IN);

  // Kick out if claimant does not live in England, Scotland or Wales
  plan.setRoute(WP.COUNTRY_YOU_LIVE_IN, WP.DO_NOT_LIVE_UK, isEqualTo('countryOfResidence', 'somewhereElse'));
  plan.setRoute(WP.COUNTRY_YOU_LIVE_IN, WP.CLAIMED_STATE_PENSION, isNotEqualTo('countryOfResidence', 'somewhereElse'));

  // Kick out if claimant has not claimed their State Pension
  plan.setRoute(WP.CLAIMED_STATE_PENSION, WP.STATE_PENSION_NOT_CLAIMED, isNo('statePensionClaimed'));
  plan.setRoute(WP.CLAIMED_STATE_PENSION, WP.CHILDREN_LIVING_WITH_YOU, isYes('statePensionClaimed'));

  // Kick out if claimant has children
  plan.setRoute(WP.CHILDREN_LIVING_WITH_YOU, WP.CLAIM_INCLUDES_CHILDREN, isYes('hasChildren'));
  plan.setRoute(WP.CHILDREN_LIVING_WITH_YOU, WP.DATE_OF_BIRTH, isNo('hasChildren'));

  // Kick out if claimant is under State Pension age
  plan.setRoute(WP.DATE_OF_BIRTH, WP.TOO_YOUNG_TO_CLAIM, spaIsOver4MonthsAway);

  // State pension age is within 4 months, it's an advance claim
  plan.setRoute(WP.DATE_OF_BIRTH, WP.ADVANCE_CLAIM_DATE, spaIsWithin4Months);
  plan.addSequence(WP.ADVANCE_CLAIM_DATE, WP.LIVE_WITH_PARTNER);

  // Go straight to partner page if State Pension age is today
  plan.setRoute(WP.DATE_OF_BIRTH, WP.LIVE_WITH_PARTNER, spaIsToday);

  // If State Pension age date is in the past we need to ask about periods
  // abroad as it can affect their date of claim
  plan.setRoute(WP.DATE_OF_BIRTH, WP.ABROAD, spaIsInThePast);

  // If no periods abroad, offer claim date based on State Pension
  plan.setRoute(WP.ABROAD, WP.OFFERED_CLAIM_DATE, isNo('abroadMoreThan4Weeks'));

  // Otherwise we need more details about the period
  plan.setRoute(WP.ABROAD, WP.PERIODS_ABROAD, isYes('abroadMoreThan4Weeks'));
  plan.addSequence(WP.PERIODS_ABROAD, WP.ABROAD_MEDICAL);

  // If the user indicates their period abroad was for medical reasons or they
  // were abroad more than once, we don't offer a date of claim and jump
  // straight partner page. A callback will be required from an advisor.
  plan.setRoute(WP.ABROAD_MEDICAL, WP.LIVE_WITH_PARTNER, (r, c) => (
    isYes('periodAbroadForMedical')(r, c)
    || isEqualTo('periodsAbroad', 'moreThanOne', WP.PERIODS_ABROAD)(r, c)
  ));

  // If they had one period abroad for non-medical purposes ask about the dates.
  plan.setRoute(WP.ABROAD_MEDICAL, WP.DATES_ABROAD, (r, c) => (
    isNo('periodAbroadForMedical')(r, c)
    && isEqualTo('periodsAbroad', 'one', WP.PERIODS_ABROAD)(r, c)
  ));

  // Calculate a date of claim. If we get a result offer it to the user, if we
  // don't jump to 'live with partner' and user will need a callback.
  // For example if the abroad period starts after their earlierest entilement
  // date but ends before today, splitting the backdating period in two.
  plan.setRoute(WP.DATES_ABROAD, WP.OFFERED_CLAIM_DATE, canOfferDateOfClaim);
  plan.setRoute(WP.DATES_ABROAD, WP.LIVE_WITH_PARTNER, canNotOfferDateOfClaim);

  // Offer a date of claim
  plan.setRoute(WP.OFFERED_CLAIM_DATE, WP.LIVE_WITH_PARTNER, isYes('acceptClaimDate'));

  // If user does not accept the date of claim, they can enter their own
  plan.setRoute(WP.OFFERED_CLAIM_DATE, WP.DIFFERENT_CLAIM_DATE, isNo('acceptClaimDate'));
  plan.addSequence(WP.DIFFERENT_CLAIM_DATE, WP.LIVE_WITH_PARTNER);

  // Do you live with a partner?
  // If claimant has a partner over State Pension age ask if they agree to claim
  plan.setRoute(WP.LIVE_WITH_PARTNER, WP.NATIONAL_INSURANCE, notLivingWithPartner);
  plan.setRoute(
    WP.LIVE_WITH_PARTNER,
    WP.PARTNER_AGREE,
    (r, c) => livingWithPartner(r, c) && partnerAtOrOverSPA(r, c),
  );

  // If partner is under State Pension age and claimant is eligible for
  // Pension Age Housing Benefitask ask if they get it, if they aren't eligible
  // kick them out
  plan.setRoute(
    WP.LIVE_WITH_PARTNER,
    WP.PARTNER_HOUSING_BENEFIT,
    (r, c) => livingWithPartner(r, c) && partnerUnderSPA(r, c) && claimantEligibleForPAHB(r, c),
  );
  plan.setRoute(
    WP.LIVE_WITH_PARTNER,
    WP.DONE_PARTNER,
    (r, c) => livingWithPartner(r, c) && partnerUnderSPA(r, c) && claimantNotEligibleForPAHB(r, c),
  );
  plan.setRoute(WP.PARTNER_HOUSING_BENEFIT, WP.DONE_PARTNER, isNo('partnerGetsHousingBenefit'));

  // If they get Housing Benefit ask if they agree to claim and continue
  plan.setRoute(WP.PARTNER_HOUSING_BENEFIT, WP.PARTNER_AGREE, isYes('partnerGetsHousingBenefit'));
  plan.addSequence(WP.PARTNER_AGREE, WP.NATIONAL_INSURANCE);
};
