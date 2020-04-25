const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ReturnedToUk extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="cameToUk"][value="yes"]',
      no: '[name="cameToUk"][value="no"]',
    };
  }
}

module.exports = ReturnedToUk;
