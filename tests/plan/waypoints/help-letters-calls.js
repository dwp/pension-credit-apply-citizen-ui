const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class HelpLettersCalls extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="helpWithLettersPhone"][value="yes"]',
      no: '[name="helpWithLettersPhone"][value="no"]',
    };
  }
}

module.exports = HelpLettersCalls;
