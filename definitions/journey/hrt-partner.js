const { waypoints: WP } = require('../../lib/constants.js');
const {
  d, isEqualTo, isNo, isYes, wasSkipped,
} = require('../../utils/journey-helpers.js');

module.exports = (plan) => {
  /* ----------------------------------------------------------------- Routes */
  // partner-returned-to-uk
  plan.setRoute(WP.HRT_PARTNER_RETURNED_TO_UK, WP.HRT_PARTNER_UK_SPONSORSHIP, isNo('partnerCameToUk'));
  plan.setRoute(WP.HRT_PARTNER_RETURNED_TO_UK, WP.HRT_PARTNER_NATIONALITY_DETAILS, isYes('partnerCameToUk'));

  // partner-nationality-details
  plan.addSequence(WP.HRT_PARTNER_NATIONALITY_DETAILS, WP.HRT_PARTNER_UK_SPONSORSHIP);

  // partner-uk-sponsorship
  plan.setRoute(WP.HRT_PARTNER_UK_SPONSORSHIP, WP.HRT_PARTNER_ASYLUM_SEEKER, isNo('partnerSponsorshipUndertaking'));
  plan.setRoute(WP.HRT_PARTNER_UK_SPONSORSHIP, WP.HRT_PARTNER_SPONSORSHIP_DETAILS, isYes('partnerSponsorshipUndertaking'));

  // partner-sponsorship-details
  plan.addSequence(
    WP.HRT_PARTNER_SPONSORSHIP_DETAILS,
    WP.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
  );

  // partner-sponsor-address-postcode-lookup
  // Go to address select if look up was attempted & returned array is not empty
  plan.setRoute(
    WP.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
    WP.HRT_PARTNER_SPONSOR_ADDRESS_SELECT,
    (r, c) => (
      d(r, c).lookup_attempted && d(r, c).addresses.length > 0
    ),
  );

  // Go to manual entry page from postcode if skip link clicked or if there was
  // no addresses returned from address look up
  plan.setRoute(
    WP.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP,
    WP.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL,
    (r, c) => (
      wasSkipped(WP.HRT_PARTNER_SPONSOR_ADDRESS_POSTCODE_LOOKUP)(r, c) || (
        d(r, c).lookup_attempted && d(r, c).addresses.length === 0
      )
    ),
  );

  // Select address can go to manual if 'enter manually' skip link clicked
  plan.setRoute(
    WP.HRT_PARTNER_SPONSOR_ADDRESS_SELECT,
    WP.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL,
    wasSkipped(WP.HRT_PARTNER_SPONSOR_ADDRESS_SELECT),
  );

  // Select address can continue to next page if hidden page contains data
  // from select page and the page was not skipped
  plan.setRoute(WP.HRT_PARTNER_SPONSOR_ADDRESS_SELECT, WP.HRT_PARTNER_ASYLUM_SEEKER, (r, c) => (
    isEqualTo('addressFrom', 'select', WP.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN)(r, c)
    && !wasSkipped(WP.HRT_PARTNER_SPONSOR_ADDRESS_SELECT)(r, c)
  ));

  // Manual entry can go to next page if hidden page contains manual data
  plan.setRoute(WP.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL, WP.HRT_PARTNER_ASYLUM_SEEKER, isEqualTo('addressFrom', 'manual', WP.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN));

  // partner-asylum-seeker
  plan.addSequence(WP.HRT_PARTNER_ASYLUM_SEEKER, WP.CHECK_YOUR_ANSWERS);
};
