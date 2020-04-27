const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LettersHome extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="sendLettersToHome"][value="yes"]',
      no: '[name="sendLettersToHome"][value="no"]',
    };
  }
}

module.exports = LettersHome;
