const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class EquityRelease extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="equityRelease"][value="yes"]',
      no: '[name="equityRelease"][value="no"]',
    };
  }
}

module.exports = EquityRelease;
