const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class YourName extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      hasPreviousNamesYes: '[name="hasPreviousNames"][value="yes"]',
      hasPreviousNamesNo: '[name="hasPreviousNames"][value="no"]',
    };
  }
}

module.exports = YourName;
