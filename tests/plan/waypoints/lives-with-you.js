const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LivesWithYou extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="othersLiveWithYou"][value="yes"]',
      no: '[name="othersLiveWithYou"][value="no"]',
    };
  }
}

module.exports = LivesWithYou;
