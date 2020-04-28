const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Earnings extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      hasEmploymentIncomeYes: '[name="hasEmploymentIncome"][value="yes"]',
      hasEmploymentIncomeNo: '[name="hasEmploymentIncome"][value="no"]',
      hasSelfEmploymentIncomeYes: '[name="hasSelfEmploymentIncome"][value="yes"]',
      hasSelfEmploymentIncomeNo: '[name="hasSelfEmploymentIncome"][value="no"]',
    };
  }
}

module.exports = Earnings;
