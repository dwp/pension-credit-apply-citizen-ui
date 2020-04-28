const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Benefits extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      waitingToHearAboutBenefitsYes: '[name="waitingToHearAboutBenefits"][value="yes"]',
      waitingToHearAboutBenefitsNo: '[name="waitingToHearAboutBenefits"][value="no"]',
      anyoneGetCarersYes: '[name="anyoneGetCarers"][value="yes"]',
      anyoneGetCarersNo: '[name="anyoneGetCarers"][value="no"]',
    };
  }
}

module.exports = Benefits;
