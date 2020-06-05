const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ServiceCharges extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="paysServiceCharges"][value="yes"]',
      no: '[name="paysServiceCharges"][value="no"]',
    };
  }
}

module.exports = ServiceCharges;
