const { waypoints: WP } = require('../../lib/constants.js');
const { d, isEqualTo, wasSkipped } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // postcode-lookup
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
};
