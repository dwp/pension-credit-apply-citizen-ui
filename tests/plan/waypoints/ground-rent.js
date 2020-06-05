const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class GroundRent extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="paysGroundRent"][value="yes"]',
      no: '[name="paysGroundRent"][value="no"]',
    };
  }
}

module.exports = GroundRent;
