const { waypoints: WP } = require('../../lib/constants.js');
const { isEqualTo, isNotEqualTo } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  plan.addSequence(
    WP.NATIONAL_INSURANCE,
    WP.YOUR_NAME,
    WP.REGISTERED_BLIND,
  );

  // Registered blind will go to partner details if they live with a partner or
  // skip straight to care home
  plan.setRoute(WP.REGISTERED_BLIND, WP.PARTNER_NI_NUMBER, isEqualTo('havePartner', 'yesLiveTogether', WP.LIVE_WITH_PARTNER));
  plan.setRoute(WP.REGISTERED_BLIND, WP.CARE_HOME, isNotEqualTo('havePartner', 'yesLiveTogether', WP.LIVE_WITH_PARTNER));

  // Partner details has its own linear journey finishing on care home
  plan.addSequence(
    WP.PARTNER_NI_NUMBER,
    WP.PARTNER_NAME,
    WP.PARTNER_BLIND,
    WP.CARE_HOME,
    WP.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
  );
};
