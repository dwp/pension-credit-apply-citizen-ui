const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LettersAddress extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      homeAddress: '[name="letterAddress"][value="homeAddress"]',
      differentAddress: '[name="letterAddress"][value="differentAddress"]',
    };
  }
}

module.exports = LettersAddress;
