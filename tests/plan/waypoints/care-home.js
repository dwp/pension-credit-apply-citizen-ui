const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class CareHome extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      permanentlyInCareHomeYes: '[name="permanentlyInCareHome"][value="yes"]',
      permanentlyInCareHomeNo: '[name="permanentlyInCareHome"][value="no"]',
      stillOwnsHomeYes: '[name="stillOwnsHome"][value="no"]',
      stillOwnsHomeNo: '[name="stillOwnsHome"][value="no"]',
    };
  }
}

module.exports = CareHome;
