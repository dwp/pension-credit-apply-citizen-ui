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
    const pl = c.getDataForPage(WP.CLAIMANT_DETAILS).preferredLanguage;

    return cor === 'WALES' || pl !== 'welsh';
  };

  plan.addSequence(
    WP.NATIONAL_INSURANCE,
    WP.YOUR_NAME,
    WP.PHONE_NUMBER,
    WP.CLAIMANT_DETAILS,
  );

  // Claimant details either goes to contact formats if they need them,
  // partner details if they have a partner but don't need other formats or
  // straight to care home if they have neither.
  // In cases where the country of residence has changed since perferred
  // language has been set, we need to ensure the user remains on the
  // CLAIMANT_DETAILS page until they have answered.
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.CONTACT_FORMATS, (r, c) => langOk(r, c) && isYes('helpWithLettersPhone')(r, c));
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.PARTNER_DETAILS, (r, c) => langOk(r, c) && isNo('helpWithLettersPhone')(r, c) && hasPartner(r, c));
  plan.setRoute(WP.CLAIMANT_DETAILS, WP.CARE_HOME, (r, c) => langOk(r, c) && isNo('helpWithLettersPhone')(r, c) && noPartner(r, c));

  // Contact formats will go to partner details if they live with a partner or
  // skip straight to home
  plan.setRoute(WP.CONTACT_FORMATS, WP.PARTNER_DETAILS, hasPartner);
  plan.setRoute(WP.CONTACT_FORMATS, WP.CARE_HOME, noPartner);

  // Partner details has its own linear journey finishing on care home
  plan.addSequence(
    WP.PARTNER_DETAILS,
    WP.PARTNER_NATIONALITY,
    WP.CARE_HOME,
    WP.WHERE_YOU_LIVE_ADDRESS_POSTCODE_LOOKUP,
  );
};
