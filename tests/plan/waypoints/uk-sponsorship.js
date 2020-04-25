const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class UkSponsorship extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="sponsorshipUndertaking"][value="yes"]',
      no: '[name="sponsorshipUndertaking"][value="no"]',
    };
  }
}

module.exports = UkSponsorship;
