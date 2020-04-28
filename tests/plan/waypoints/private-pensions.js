const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PrivatePensions extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasPrivatePensions"][value="yes"]',
      no: '[name="hasPrivatePensions"][value="no"]',
    };
  }
}

module.exports = PrivatePensions;
