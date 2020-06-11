const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // True if claimant lives with partner
  const hasPartner = isYes('liveWithPartner', WP.LIVE_WITH_PARTNER);

  // True if claimant does not live with a partner
  const noPartner = isNo('liveWithPartner', WP.LIVE_WITH_PARTNER);

  // True if the user has chosen a valid residence + language preference combo
  const langOk = (r, c) => {
    const cor = c.getDataForPage(WP.COUNTRY_YOU_LIVE_IN).countryOfResidence;
    const pl = c.getDataForPage(WP.CLAIMANT_LANGUAGE).preferredLanguage;

    return cor === 'WALES' || pl !== 'welsh';
  };

  plan.addSequence(
    WP.NATIONAL_INSURANCE,
    WP.YOUR_NAME,
    WP.PHONE_NUMBER,
    WP.CLAIMANT_LANGUAGE,
  );

  // In cases where the country of residence has changed since perferred
  // language has been set, we need to ensure the user remains on the
  // CLAIMANT_LANGUAGE page until they have answered.
  plan.setRoute(WP.CLAIMANT_LANGUAGE, WP.REGISTERED_BLIND, langOk);
  plan.addSequence(WP.REGISTERED_BLIND, WP.HELP_LETTERS_CALLS);

  // HELP_LETTERS_CALLS either goes to contact formats if they need them,
  // partner details if they have a partner but don't need other formats or
  // straight to care home if they have neither.
  plan.setRoute(WP.HELP_LETTERS_CALLS, WP.CONTACT_FORMATS, isYes('helpWithLettersPhone'));
  plan.setRoute(WP.HELP_LETTERS_CALLS, WP.PARTNER_NI_NUMBER, (r, c) => isNo('helpWithLettersPhone')(r, c) && hasPartner(r, c));
  plan.setRoute(WP.HELP_LETTERS_CALLS, WP.CARE_HOME, (r, c) => isNo('helpWithLettersPhone')(r, c) && noPartner(r, c));

  // Contact formats will go to partner details if they live with a partner or
  // skip straight to home
  plan.setRoute(WP.CONTACT_FORMATS, WP.PARTNER_NI_NUMBER, hasPartner);
  plan.setRoute(WP.CONTACT_FORMATS, WP.CARE_HOME, noPartner);

  // Partner details has its own linear journey finishing on care home
  plan.addSequence(
    WP.PARTNER_NI_NUMBER,
    WP.PARTNER_NAME,
    WP.PARTNER_DETAILS,
    WP.PARTNER_NATIONALITY,
    WP.CARE_HOME,
    WP.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
  );
};
