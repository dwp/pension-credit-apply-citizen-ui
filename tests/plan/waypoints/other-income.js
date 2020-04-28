const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class OtherIncome extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasOtherIncome"][value="yes"]',
      no: '[name="hasOtherIncome"][value="no"]',
    };
  }
}

module.exports = OtherIncome;
