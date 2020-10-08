const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class OfferedClaimDate extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="acceptClaimDate"][value="yes"]',
      no: '[name="acceptClaimDate"][value="no"]',
    };
  }
}

module.exports = OfferedClaimDate;
