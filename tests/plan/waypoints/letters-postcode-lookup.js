const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LettersPostcodeLookup extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      enterManualLink: 'a[href*="letters-address"]',
    };
  }
}

module.exports = LettersPostcodeLookup;
