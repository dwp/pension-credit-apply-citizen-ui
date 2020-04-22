const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ClaimedStatePension extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="statePensionClaimed"][value="yes"]',
      no: '[name="statePensionClaimed"][value="no"]',
    };
  }
}

module.exports = ClaimedStatePension;
