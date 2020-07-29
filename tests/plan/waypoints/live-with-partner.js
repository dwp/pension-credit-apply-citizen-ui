const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LiveWithPartner extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yesLiveTogether: '[name="havePartner"][value="yesLiveTogether"]',
      yesLiveApart: '[name="havePartner"][value="yesLiveApart"]',
      no: '[name="havePartner"][value="no"]',
    };
  }
}

module.exports = LiveWithPartner;
