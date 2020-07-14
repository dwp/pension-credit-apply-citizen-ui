const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class DifferentFormats extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="needsDifferentFormats"][value="yes"]',
      no: '[name="needsDifferentFormats"][value="no"]',
    };
  }
}

module.exports = DifferentFormats;
