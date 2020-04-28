const { waypoints: WP } = require('../../lib/constants.js');
const {
  d, isEqualTo, isNo, isYes, wasSkipped,
} = require('../../utils/journey-helpers.js');

module.exports = (plan, FROM_PREVIOUS_SECTION) => {
  // Test if the user needs to take the HRT
  const hasPartner = (c) => c.data[WP.LIVE_WITH_PARTNER].liveWithPartner === 'yes';

  const citizenNeedsHRT = (r, c) => (
    c.data[WP.YOUR_NATIONALITY].rightToReside === 'no' || c.data[WP.YOUR_NATIONALITY].lived2Years === 'no'
  );

  const partnerNeedsHRT = (r, c) => (
    hasPartner(c) && (c.data[WP.PARTNER_NATIONALITY].partnerRightToReside === 'no' || c.data[WP.PARTNER_NATIONALITY].partnerLived2Years === 'no')
  );

  const onlyCitizenNeedsHRT = (r, c) => (
    citizenNeedsHRT(r, c) && (!hasPartner(c) || !partnerNeedsHRT(r, c))
  );

  const onlyPartnerNeedsHRT = (r, c) => (
    !citizenNeedsHRT(r, c) && hasPartner(c) && partnerNeedsHRT(r, c)
  );

  const noHRTNeeded = (r, c) => !citizenNeedsHRT(r, c) && !partnerNeedsHRT(r, c);

  /* ----------------------------------------------------------------- Routes */
  // As this whole section is conditionally displayed, we have to know which
  // waypoint we arrived from in order to setup the route
  plan.setRoute(FROM_PREVIOUS_SECTION, WP.HRT_CITIZEN_RETURNED_TO_UK, citizenNeedsHRT);
  plan.setRoute(FROM_PREVIOUS_SECTION, WP.HRT_PARTNER_RETURNED_TO_UK, onlyPartnerNeedsHRT);
  plan.setRoute(FROM_PREVIOUS_SECTION, WP.CLAIM_HELP, noHRTNeeded);

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

  // asylum-seeker
  plan.setRoute(WP.HRT_CITIZEN_ASYLUM_SEEKER, WP.HRT_PARTNER_RETURNED_TO_UK, partnerNeedsHRT);
  plan.setRoute(WP.HRT_CITIZEN_ASYLUM_SEEKER, WP.CLAIM_HELP, onlyCitizenNeedsHRT);
};
