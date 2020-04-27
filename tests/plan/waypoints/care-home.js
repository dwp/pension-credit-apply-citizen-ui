const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class CareHome extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="permanentlyInCareHome"][value="yes"]',
      no: '[name="permanentlyInCareHome"][value="no"]',
    };
  }
}

module.exports = CareHome;
