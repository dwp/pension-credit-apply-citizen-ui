const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LiveWithPartner extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="liveWithPartner"][value="yes"]',
      no: '[name="liveWithPartner"][value="no"]',
    };
  }
}

module.exports = LiveWithPartner;
