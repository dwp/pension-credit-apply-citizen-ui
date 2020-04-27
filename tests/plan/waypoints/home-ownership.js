const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class HomeOwnership extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      own: '[name="homeOwnership"][value="own"]',
      rent: '[name="homeOwnership"][value="rent"]',
      other: '[name="homeOwnership"][value="other"]',
    };
  }
}

module.exports = HomeOwnership;
