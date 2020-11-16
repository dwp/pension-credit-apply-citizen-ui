const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Mortgage extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasMortgage"][value="yes"]',
      no: '[name="hasMortgage"][value="no"]',
    };
  }
}

module.exports = Mortgage;
