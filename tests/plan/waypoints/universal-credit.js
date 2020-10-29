const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class UniversalCredit extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="claimsUniversalCredit"][value="yes"]',
      no: '[name="claimsUniversalCredit"][value="no"]',
    };
  }
}

module.exports = UniversalCredit;
