const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Benefits extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="waitingToHearAboutBenefits"][value="yes"]',
      no: '[name="waitingToHearAboutBenefits"][value="no"]',
    };
  }
}

module.exports = Benefits;
