const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ClaimantDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      registeredBlindYes: '[name="registeredBlind"][value="yes"]',
      registeredBlindNo: '[name="registeredBlind"][value="no"]',
      helpWithLettersPhoneYes: '[name="helpWithLettersPhone"][value="yes"]',
      helpWithLettersPhoneNo: '[name="helpWithLettersPhone"][value="no"]',
    };
  }
}

module.exports = ClaimantDetails;
