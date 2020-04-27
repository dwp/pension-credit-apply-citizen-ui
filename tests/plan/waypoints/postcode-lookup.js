const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PostcodeLookup extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      enterManualLink: 'a[href*="address-manual"]',
    };
  }
}

module.exports = PostcodeLookup;
