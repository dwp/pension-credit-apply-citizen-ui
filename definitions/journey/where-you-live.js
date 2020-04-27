const { waypoints: WP } = require('../../lib/constants.js');
const {
  d, isEqualTo, wasSkipped, isYes, isNo,
} = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // True if claimant lives in a care home permanently
  const inCareHome = isYes('permanentlyInCareHome', WP.CARE_HOME);

  // True if claimant does not live in a care home permanently
  const notInCareHome = isNo('permanentlyInCareHome', WP.CARE_HOME);

  // Where you live postcode lookup
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
  plan.setRoute(WP.WHERE_YOU_LIVE_ADDRESS_SELECT, WP.LETTERS_HOME, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.WHERE_YOU_LIVE_ADDRESS_SELECT)(r, c)
  ));

  // Manual entry can go to next page if hidden page contains manual data
  plan.setRoute(WP.WHERE_YOU_LIVE_ADDRESS_MANUAL, WP.LETTERS_HOME, isEqualTo('addressFrom', 'manual', WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN));

  // Can we send letters to your home address? - if no ask for another address
  plan.setRoute(WP.LETTERS_HOME, WP.LETTERS_ADDRESS_POSTCODE_LOOKUP, isNo('sendLettersToHome'));

  // If yes continue where you live journey if not in care home otherwise skip
  // to private pensions and begin income journey
  plan.setRoute(WP.LETTERS_HOME, WP.LIVES_WITH_YOU, (r, c) => isYes('sendLettersToHome')(r, c) && notInCareHome(r, c));
  plan.setRoute(WP.LETTERS_HOME, WP.PRIVATE_PENSIONS, (r, c) => isYes('sendLettersToHome')(r, c) && inCareHome(r, c));

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
  plan.setRoute(WP.LETTERS_ADDRESS_SELECT, WP.LIVES_WITH_YOU, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.LETTERS_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.LETTERS_ADDRESS_SELECT)(r, c)
    && notInCareHome(r, c)
  ));

  // Otherwise skip to private pensions
  plan.setRoute(WP.LETTERS_ADDRESS_SELECT, WP.PRIVATE_PENSIONS, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.LETTERS_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.LETTERS_ADDRESS_SELECT)(r, c)
    && inCareHome(r, c)
  ));

  // Manual entry can go to next page if hidden page contains manual data
  // Continue where you live journey if not in care home
  plan.setRoute(WP.LETTERS_ADDRESS_MANUAL, WP.LIVES_WITH_YOU, (r, c) => (
    isEqualTo('addressFrom', 'manual', WP.LETTERS_ADDRESS_HIDDEN)(r, c)
    && notInCareHome(r, c)
  ));

  // Otherwise skip to private pensions
  plan.setRoute(WP.LETTERS_ADDRESS_MANUAL, WP.PRIVATE_PENSIONS, (r, c) => (
    isEqualTo('addressFrom', 'manual', WP.LETTERS_ADDRESS_HIDDEN)(r, c)
    && inCareHome(r, c)
  ));

  // Continue where you live journey
  plan.addSequence(
    WP.LIVES_WITH_YOU,
    WP.RENT_COUNCIL_TAX,
    WP.HOME_OWNERSHIP,
    WP.SERVICE_CHARGES,
    WP.HOME_LOAN,
  );
};
