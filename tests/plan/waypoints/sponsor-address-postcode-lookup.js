const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class SponsorAddressPostcodeLookup extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      enterManualLink: 'a[href*="sponsor-address-manual"]',
    };
  }
}

module.exports = SponsorAddressPostcodeLookup;
