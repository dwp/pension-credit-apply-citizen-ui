const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ClaimantLanguage extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      english: '[name="preferredLanguage"][value="english"]',
      welsh: '[name="preferredLanguage"][value="welsh"]',
      other: '[name="preferredLanguage"][value="other"]',
    };
  }
}

module.exports = ClaimantLanguage;
