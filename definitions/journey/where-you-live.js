const { waypoints: WP } = require('../../lib/constants.js');
const {
  d, isEqualTo, isYes, isNo, wasSkipped,
} = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // True if claimant lives in a care home permanently
  const inCareHome = isYes('permanentlyInCareHome', WP.CARE_HOME);

  // True if claimant does not live in a care home permanently
  const notInCareHome = isNo('permanentlyInCareHome', WP.CARE_HOME);

  // Home address postcode lookup
  // Go to address select if look up was attempted & returned array is not empty
  plan.setRoute(
    WP.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
    WP.WHERE_YOU_LIVE_ADDRESS_SELECT,
    (r, c) => (
      d(r, c).lookup_attempted && d(r, c).addresses.length > 0
    ),
  );

  // Go to manual entry page from postcode if skip link clicked or if there was
  // no addresses returned from address look up
  plan.setRoute(
    WP.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
    WP.WHERE_YOU_LIVE_ADDRESS_MANUAL,
    (r, c) => (
      wasSkipped(WP.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP)(r, c) || (
        d(r, c).lookup_attempted && d(r, c).addresses.length === 0
      )
    ),
  );

  // Select address can go to manual if 'enter manually' skip link clicked
  plan.setRoute(
    WP.WHERE_YOU_LIVE_ADDRESS_SELECT,
    WP.WHERE_YOU_LIVE_ADDRESS_MANUAL,
    wasSkipped(WP.WHERE_YOU_LIVE_ADDRESS_SELECT),
  );

  // Select address can continue to next page if hidden page contains data
  // from select page and the page was not skipped
  // Continue where you live journey if not in care home
  plan.setRoute(WP.WHERE_YOU_LIVE_ADDRESS_SELECT, WP.LIVES_WITH_YOU, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.WHERE_YOU_LIVE_ADDRESS_SELECT)(r, c)
    && notInCareHome(r, c)
  ));

  // Otherwise skip to benefit check
  plan.setRoute(WP.WHERE_YOU_LIVE_ADDRESS_SELECT, WP.UNIVERSAL_CREDIT, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.WHERE_YOU_LIVE_ADDRESS_SELECT)(r, c)
    && inCareHome(r, c)
  ));

  // Manual entry can go to next page if hidden page contains manual data
  // Continue where you live journey if not in care home
  plan.setRoute(WP.WHERE_YOU_LIVE_ADDRESS_MANUAL, WP.LIVES_WITH_YOU, (r, c) => (
    isEqualTo('addressFrom', 'manual', WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN)(r, c)
    && notInCareHome(r, c)
  ));

  // Otherwise skip to benefit check
  plan.setRoute(WP.WHERE_YOU_LIVE_ADDRESS_MANUAL, WP.UNIVERSAL_CREDIT, (r, c) => (
    isEqualTo('addressFrom', 'manual', WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN)(r, c)
    && inCareHome(r, c)
  ));

  plan.addSequence(
    WP.LIVES_WITH_YOU,
    WP.RENT_COUNCIL_TAX_RATES,
    WP.HOME_OWNERSHIP,
  );

  // If the claimant owns their own home, we need to ask about service charges
  // before ground rent
  plan.setRoute(WP.HOME_OWNERSHIP, WP.SERVICE_CHARGES, (r, c) => (
    isEqualTo('homeOwnership', 'own')(r, c) || isEqualTo('homeOwnership', 'other')(r, c)
  ));

  // Then ground rent
  plan.addSequence(WP.SERVICE_CHARGES, WP.GROUND_RENT);

  // If the claimant does not own their we don't need to ask about service
  // charges so can go straight to ground rent
  plan.setRoute(WP.HOME_OWNERSHIP, WP.GROUND_RENT, (r, c) => (
    isEqualTo('homeOwnership', 'rent')(r, c) || isEqualTo('homeOwnership', 'sharedOwnership')(r, c)
  ));

  // We go straight to housing benefit for renters that don't pay ground rent
  plan.setRoute(WP.GROUND_RENT, WP.HOUSING_BENEFIT, (r, c) => (
    isNo('paysGroundRent')(r, c) && isEqualTo('homeOwnership', 'rent', WP.HOME_OWNERSHIP)(r, c)
  ));

  // If renters or part owners pay ground rent we need to ask them if they have
  // a 21 year lease
  plan.setRoute(WP.GROUND_RENT, WP.TWENTY_ONE_YEAR_LEASE, (r, c) => (
    isYes('paysGroundRent')(r, c) && (
      isEqualTo('homeOwnership', 'rent', WP.HOME_OWNERSHIP)(r, c)
      || isEqualTo('homeOwnership', 'sharedOwnership', WP.HOME_OWNERSHIP)(r, c)
    )
  ));

  // If the claimant owns their home (or shared ownership with no ground rent),
  // ask if they have a mortgage
  plan.setRoute(WP.GROUND_RENT, WP.MORTGAGE, (r, c) => (
    isEqualTo('homeOwnership', 'own', WP.HOME_OWNERSHIP)(r, c)
    || isEqualTo('homeOwnership', 'other', WP.HOME_OWNERSHIP)(r, c)
    || (
      isNo('paysGroundRent')(r, c)
      && isEqualTo('homeOwnership', 'sharedOwnership', WP.HOME_OWNERSHIP)(r, c)
    )
  ));

  // If the claimant owns their home, ask if they have a mortgage
  plan.setRoute(WP.TWENTY_ONE_YEAR_LEASE, WP.MORTGAGE, isEqualTo('homeOwnership', 'sharedOwnership', WP.HOME_OWNERSHIP));

  // Otherwise they carry on to housing beneift
  plan.setRoute(WP.TWENTY_ONE_YEAR_LEASE, WP.HOUSING_BENEFIT, isEqualTo('homeOwnership', 'rent', WP.HOME_OWNERSHIP));

  // Home owners go to question about SMI if they have a mortgage
  plan.setRoute(WP.MORTGAGE, WP.HOME_LOAN, isYes('hasMortgage'));

  // Home owners go to straight equity release if they don't have a mortgage
  plan.setRoute(WP.MORTGAGE, WP.EQUITY_RELEASE, isNo('hasMortgage'));

  // SMI question always goes to equity release as only home owners can see the
  // question
  plan.addSequence(WP.HOME_LOAN, WP.EQUITY_RELEASE);

  // Equity release goes to housing benefit if they have shared ownership or
  // some other arrangement
  plan.setRoute(WP.EQUITY_RELEASE, WP.HOUSING_BENEFIT, (r, c) => (
    isEqualTo('homeOwnership', 'other', WP.HOME_OWNERSHIP)(r, c)
    || isEqualTo('homeOwnership', 'sharedOwnership', WP.HOME_OWNERSHIP)(r, c)
  ));

  // Equity release goes to share rent/mortgage for owners who still have
  // a mortgage
  plan.setRoute(WP.EQUITY_RELEASE, WP.SHARE_RENT_MORTGAGE, (r, c) => (
    isYes('hasMortgage', WP.MORTGAGE)(r, c)
    && isEqualTo('homeOwnership', 'own', WP.HOME_OWNERSHIP)(r, c)
  ));

  // Equity release goes to straight to the next section for owners who don't
  // have a mortgage
  plan.setRoute(WP.EQUITY_RELEASE, WP.UNIVERSAL_CREDIT, (r, c) => (
    isNo('hasMortgage', WP.MORTGAGE)(r, c)
    && isEqualTo('homeOwnership', 'own', WP.HOME_OWNERSHIP)(r, c)
  ));

  // Housing benefit question always goes to share rent/mortgage
  plan.addSequence(WP.HOUSING_BENEFIT, WP.SHARE_RENT_MORTGAGE);

  // Continue to income journey
  plan.addSequence(WP.SHARE_RENT_MORTGAGE, WP.UNIVERSAL_CREDIT);
};
