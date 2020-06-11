const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerName extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      partnerHasPreviousNamesYes: '[name="partnerHasPreviousNames"][value="yes"]',
      partnerHasPreviousNamesNo: '[name="partnerHasPreviousNames"][value="no"]',
      partnerRegisteredBlindYes: '[name="partnerRegisteredBlind"][value="yes"]',
    };
  }
}

module.exports = PartnerName;
