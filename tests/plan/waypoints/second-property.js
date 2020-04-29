const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class SecondProperty extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasSecondProperty"][value="yes"]',
      no: '[name="hasSecondProperty"][value="no"]',
    };
  }
}

module.exports = SecondProperty;
