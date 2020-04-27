const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class RentCouncilTax extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="responsibleForCouncilTax"][value="yes"]',
      no: '[name="responsibleForCouncilTax"][value="no"]',
    };
  }
}

module.exports = RentCouncilTax;
