const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerSponsorAddressPostcodeLookup extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      enterManualLink: 'a[href*="partner-sponsor-address-manual"]',
    };
  }
}

module.exports = PartnerSponsorAddressPostcodeLookup;
