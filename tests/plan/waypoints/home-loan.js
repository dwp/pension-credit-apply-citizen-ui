const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class HomeLoan extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="wantsSMI"][value="yes"]',
      no: '[name="wantsSMI"][value="no"]',
    };
  }
}

module.exports = HomeLoan;
