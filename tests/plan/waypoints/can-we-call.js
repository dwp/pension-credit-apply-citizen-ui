const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class CanWeCall extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="canWeCall"][value="yes"]',
      no: '[name="canWeCall"][value="no"]',
    };
  }
}

module.exports = CanWeCall;
