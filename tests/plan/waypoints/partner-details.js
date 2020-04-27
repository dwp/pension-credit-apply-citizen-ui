const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      partnerHasPreviousNamesYes: '[name="partnerHasPreviousNames"][value="yes"]',
      partnerHasPreviousNamesNo: '[name="partnerHasPreviousNames"][value="no"]',
      partnerRegisteredBlindYes: '[name="partnerRegisteredBlind"][value="yes"]',
      partnerRegisteredBlindNo: '[name="partnerRegisteredBlind"][value="no"]',
    };
  }
}

module.exports = PartnerDetails;
