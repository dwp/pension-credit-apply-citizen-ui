const { waypoints: WP, whoMadeClaim: WMC, userTypes: UT } = require('../../lib/constants.js');
const daSuffix = require('../../utils/delegated-authority-suffix.js');
const {
  d, isEqualTo, isYes, isNo, wasSkipped,
} = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // True if user is a delegated authority
  const delegatedAuthority = (r, c) => {
    const { whoMadeClaim } = d(r, c, WP.WHO_MADE_CLAIM);
    const userType = daSuffix(whoMadeClaim);
    return userType === UT.DELEGATED_AUTHORITY;
  };

  // True if user is the claimant or someone helping them
  const claimantOrHelper = (r, c) => {
    const { whoMadeClaim } = d(r, c, WP.WHO_MADE_CLAIM);
    const userType = daSuffix(whoMadeClaim);
    return userType === UT.CLAIMANT || userType === UT.HELPER;
  };

  // True if the user has chosen a valid residence + language preference combo
  const langOk = (r, c) => {
    const cor = c.getDataForPage(WP.COUNTRY_YOU_LIVE_IN).countryOfResidence;
    const pl = c.getDataForPage(WP.LANGUAGE).preferredLanguage;

    return cor === 'WALES' || pl !== 'welsh';
  };

  // If delegated authority ask for name and nino of user (rather than claimant)
  plan.setRoute(WP.WHO_MADE_CLAIM, WP.DELEGATED_AUTHORITY_DETAILS, delegatedAuthority);
  plan.setRoute(WP.DELEGATED_AUTHORITY_DETAILS, WP.CAN_WE_CALL, (r, c) => {
    const { whoMadeClaim } = d(r, c, WP.WHO_MADE_CLAIM);
    // If the user changes whoMadeClaim from corporateActingBody to some other
    // delegated authority (or vice versa) make sure conditional fields are
    // complete before progressing.
    if (whoMadeClaim === WMC.CORPORATE_ACTING_BODY) {
      return !!d(r, c).contactID;
    }

    return !!d(r, c).contactNino;
  });

  // If claimant themselves or helper go straight to CAN_WE_CALL
  plan.setRoute(WP.WHO_MADE_CLAIM, WP.CAN_WE_CALL, claimantOrHelper);
  plan.addSequence(WP.CAN_WE_CALL, WP.LANGUAGE);

  // Ensure language selection is valid before contining journey
  plan.setRoute(WP.LANGUAGE, WP.DIFFERENT_FORMATS, langOk);

  // If the user requests different contact formats, ask which ones, otherwise
  // continue
  plan.setRoute(WP.DIFFERENT_FORMATS, WP.CONTACT_FORMATS, isYes('needsDifferentFormats'));

  // If the user is the claimant or a helper ask if they want to use a separate
  // contact address for letters. However if the user is a delegated authority
  // always ask for a seperate contact address.
  plan.setRoute(WP.DIFFERENT_FORMATS, WP.LETTERS_ADDRESS, (r, c) => isNo('needsDifferentFormats')(r, c) && claimantOrHelper(r, c));
  plan.setRoute(WP.DIFFERENT_FORMATS, WP.LETTERS_ADDRESS_POSTCODE_LOOKUP, (r, c) => isNo('needsDifferentFormats')(r, c) && delegatedAuthority(r, c));
  plan.setRoute(WP.CONTACT_FORMATS, WP.LETTERS_ADDRESS, claimantOrHelper);
  plan.setRoute(WP.CONTACT_FORMATS, WP.LETTERS_ADDRESS_POSTCODE_LOOKUP, delegatedAuthority);

  // Ask if we can send letters to home address, if yes continue to check your
  // answers
  plan.setRoute(WP.LETTERS_ADDRESS, WP.CHECK_YOUR_ANSWERS, isEqualTo('letterAddress', 'homeAddress'));

  // If the want a differnt contact address go through addrerss look up
  plan.setRoute(WP.LETTERS_ADDRESS, WP.LETTERS_ADDRESS_POSTCODE_LOOKUP, isEqualTo('letterAddress', 'differentAddress'));

  // Correspondence postcode lookup
  // Go to address select if look up was attempted & returned array is not empty
  plan.setRoute(
    WP.LETTERS_ADDRESS_POSTCODE_LOOKUP,
    WP.LETTERS_ADDRESS_SELECT,
    (r, c) => (
      d(r, c).lookup_attempted && d(r, c).addresses.length > 0
    ),
  );

  // Go to manual entry page from postcode if skip link clicked or if there was
  // no addresses returned from address look up
  plan.setRoute(
    WP.LETTERS_ADDRESS_POSTCODE_LOOKUP,
    WP.LETTERS_ADDRESS_MANUAL,
    (r, c) => (
      wasSkipped(WP.LETTERS_ADDRESS_POSTCODE_LOOKUP)(r, c) || (
        d(r, c).lookup_attempted && d(r, c).addresses.length === 0
      )
    ),
  );

  // Select address can go to manual if 'enter manually' skip link clicked
  plan.setRoute(
    WP.LETTERS_ADDRESS_SELECT,
    WP.LETTERS_ADDRESS_MANUAL,
    wasSkipped(WP.LETTERS_ADDRESS_SELECT),
  );

  // Select address can continue to next page if hidden page contains data
  // from select page and the page was not skipped
  // Continue where you live journey if not in care home
  plan.setRoute(WP.LETTERS_ADDRESS_SELECT, WP.CHECK_YOUR_ANSWERS, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.LETTERS_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.LETTERS_ADDRESS_SELECT)(r, c)
  ));

  // Manual entry can go to next page if hidden page contains manual data
  // Continue where you live journey if not in care home
  plan.setRoute(WP.LETTERS_ADDRESS_MANUAL, WP.CHECK_YOUR_ANSWERS,
    isEqualTo('addressFrom', 'manual', WP.LETTERS_ADDRESS_HIDDEN));
};
