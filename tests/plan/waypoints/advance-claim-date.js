const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class AdvanceClaimDate extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      continue: '#continue-button',
    };
  }
}

module.exports = AdvanceClaimDate;
