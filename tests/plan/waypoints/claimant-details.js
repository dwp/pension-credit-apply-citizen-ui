const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ClaimantDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      hasPreviousNamesYes: '[name="hasPreviousNames"][value="yes"]',
      hasPreviousNamesNo: '[name="hasPreviousNames"][value="no"]',
      registeredBlindYes: '[name="registeredBlind"][value="yes"]',
      registeredBlindNo: '[name="registeredBlind"][value="no"]',
      canSpeakEnglishYes: '[name="canSpeakEnglish"][value="yes"]',
      canSpeakEnglishNo: '[name="canSpeakEnglish"][value="no"]',
      speakInWelshYes: '[name="speakInWelsh"][value="yes"]',
      speakInWelshNo: '[name="speakInWelsh"][value="no"]',
      helpWithLettersPhoneYes: '[name="helpWithLettersPhone"][value="yes"]',
      helpWithLettersPhoneNo: '[name="helpWithLettersPhone"][value="no"]',
    };
  }
}

module.exports = ClaimantDetails;
