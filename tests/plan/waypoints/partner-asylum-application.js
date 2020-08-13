const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerAsylumApplication extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      partnerAsylumBefore3April2000Yes: '[name="partnerAsylumBefore3April2000"][value="yes"]',
      partnerAsylumBefore3April2000No: '[name="partnerAsylumBefore3April2000"][value="no"]',

      partnerSuccessfulDecisionYes: '[name="partnerSuccessfulDecision"][value="yes"]',
      partnerSuccessfulDecisionNo: '[name="partnerSuccessfulDecision"][value="no"]',

      partnerSupportedByHomeOfficeYes: '[name="partnerSupportedByHomeOffice"][value="yes"]',
      partnerSupportedByHomeOfficeNo: '[name="partnerSupportedByHomeOffice"][value="no"]',
    };
  }
}

module.exports = PartnerAsylumApplication;
