const { waypoints: WP } = require('../../lib/constants.js');
const {
  d, isEqualTo, isNotEqualTo, isNo, isYes, wasSkipped,
} = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  // Has a partner, and living with them
  const livingWithPartner = isEqualTo('havePartner', 'yesLiveTogether', WP.LIVE_WITH_PARTNER);
  const notLivingWithPartner = isNotEqualTo('havePartner', 'yesLiveTogether', WP.LIVE_WITH_PARTNER);

  // If claimant has indicated they don't have the right to work in the UK or
  // has been out of the country for 2 years we need to ask HRT questions
  plan.setRoute(WP.YOUR_NATIONALITY, WP.HRT_CITIZEN_RETURNED_TO_UK, (r, c) => (
    isNo('rightToReside')(r, c)
    || isNo('lived2Years')(r, c)
  ));

  // Otherwise ask about partner nationality if they live with a partner
  plan.setRoute(WP.YOUR_NATIONALITY, WP.PARTNER_NATIONALITY, (r, c) => (
    isYes('rightToReside')(r, c)
    && isYes('lived2Years')(r, c)
    && livingWithPartner(r, c)
  ));

  // Or skip this section and go to WHO_MADE_CLAIM page if no partner or HRT needed
  plan.setRoute(WP.YOUR_NATIONALITY, WP.WHO_MADE_CLAIM, (r, c) => (
    isYes('rightToReside')(r, c)
    && isYes('lived2Years')(r, c)
    && notLivingWithPartner(r, c)
  ));

  // returned-to-uk
  plan.setRoute(WP.HRT_CITIZEN_RETURNED_TO_UK, WP.HRT_CITIZEN_UK_SPONSORSHIP, isNo('cameToUk'));
  plan.setRoute(WP.HRT_CITIZEN_RETURNED_TO_UK, WP.HRT_CITIZEN_NATIONALITY_DETAILS, isYes('cameToUk'));

  // nationality-details
  plan.addSequence(WP.HRT_CITIZEN_NATIONALITY_DETAILS, WP.HRT_CITIZEN_UK_SPONSORSHIP);

  // uk-sponsorship
  plan.setRoute(WP.HRT_CITIZEN_UK_SPONSORSHIP, WP.HRT_CITIZEN_ASYLUM_SEEKER, isNo('sponsorshipUndertaking'));
  plan.setRoute(WP.HRT_CITIZEN_UK_SPONSORSHIP, WP.HRT_CITIZEN_SPONSORSHIP_DETAILS, isYes('sponsorshipUndertaking'));

  // sponsorship-details
  plan.addSequence(
    WP.HRT_CITIZEN_SPONSORSHIP_DETAILS,
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
  );

  // sponsor-address-postcode-lookup
  // Go to address select if look up was attempted & returned array is not empty
  plan.setRoute(
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT,
    (r, c) => (
      d(r, c).lookup_attempted && d(r, c).addresses.length > 0
    ),
  );

  // Go to manual entry page from postcode if skip link clicked or if there was
  // no addresses returned from address look up
  plan.setRoute(
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL,
    (r, c) => (
      wasSkipped(WP.HRT_CITIZEN_SPONSOR_ADDRESS_POSTCODE_LOOKUP)(r, c) || (
        d(r, c).lookup_attempted && d(r, c).addresses.length === 0
      )
    ),
  );

  // Select address can go to manual if 'enter manually' skip link clicked
  plan.setRoute(
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT,
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL,
    wasSkipped(WP.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT),
  );

  // Select address can continue to next page if hidden page contains data
  // from select page and the page was not skipped
  plan.setRoute(WP.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT, WP.HRT_CITIZEN_ASYLUM_SEEKER, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT)(r, c)
  ));

  // Manual entry can go to next page if hidden page contains manual data
  plan.setRoute(WP.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL, WP.HRT_CITIZEN_ASYLUM_SEEKER, isEqualTo('addressFrom', 'manual', WP.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN));

  // If claimant lives with a partner, ask about their nationality
  plan.setRoute(WP.HRT_CITIZEN_ASYLUM_SEEKER, WP.PARTNER_NATIONALITY, livingWithPartner);

  // Or go to WHO_MADE_CLAIM page
  plan.setRoute(WP.HRT_CITIZEN_ASYLUM_SEEKER, WP.WHO_MADE_CLAIM, notLivingWithPartner);
};
