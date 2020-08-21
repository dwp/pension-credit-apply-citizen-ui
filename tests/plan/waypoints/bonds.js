const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Bonds extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasIncomeOrCapitalBonds"][value="yes"]',
      no: '[name="hasIncomeOrCapitalBonds"][value="no"]',
    };
  }
}

module.exports = Bonds;
