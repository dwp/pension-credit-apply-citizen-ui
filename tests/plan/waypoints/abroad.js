const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Abroad extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="abroadMoreThan4Weeks"][value="yes"]',
      no: '[name="abroadMoreThan4Weeks"][value="no"]',
    };
  }
}

module.exports = Abroad;
