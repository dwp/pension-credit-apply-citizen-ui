const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Employment extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasEmploymentIncome"][value="yes"]',
      no: '[name="hasEmploymentIncome"][value="no"]',
    };
  }
}

module.exports = Employment;
