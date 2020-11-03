const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class SelfEmployment extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasSelfEmploymentIncome"][value="yes"]',
      no: '[name="hasSelfEmploymentIncome"][value="no"]',
    };
  }
}

module.exports = SelfEmployment;
