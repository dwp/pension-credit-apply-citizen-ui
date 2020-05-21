const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ClaimantDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      hasPreviousNamesYes: '[name="hasPreviousNames"][value="yes"]',
      hasPreviousNamesNo: '[name="hasPreviousNames"][value="no"]',
      registeredBlindYes: '[name="registeredBlind"][value="yes"]',
      registeredBlindNo: '[name="registeredBlind"][value="no"]',
      preferredLanguageEnglish: '[name="preferredLanguage"][value="english"]',
      preferredLanguageWelsh: '[name="preferredLanguage"][value="welsh"]',
      preferredLanguageOther: '[name="preferredLanguage"][value="other"]',
      helpWithLettersPhoneYes: '[name="helpWithLettersPhone"][value="yes"]',
      helpWithLettersPhoneNo: '[name="helpWithLettersPhone"][value="no"]',
    };
  }
}

module.exports = ClaimantDetails;
