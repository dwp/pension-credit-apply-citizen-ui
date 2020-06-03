const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class TwentyOneYearLease extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="twentyOneYearLease"][value="yes"]',
      no: '[name="twentyOneYearLease"][value="no"]',
    };
  }
}

module.exports = TwentyOneYearLease;
