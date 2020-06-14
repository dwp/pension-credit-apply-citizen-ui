const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class RegisteredBlind extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="registeredBlind"][value="yes"]',
      no: '[name="registeredBlind"][value="no"]',
    };
  }
}

module.exports = RegisteredBlind;
