const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ClaimHelp extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="helpMakingClaim"][value="yes"]',
      no: '[name="helpMakingClaim"][value="no"]',
    };
  }
}

module.exports = ClaimHelp;
