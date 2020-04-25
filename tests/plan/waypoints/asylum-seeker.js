const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class AsylumSeeker extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="asylumSeeker"][value="yes"]',
      no: '[name="asylumSeeker"][value="no"]',

      asylumBefore3April2000Yes: '[name="asylumBefore3April2000"][value="yes"]',
      asylumBefore3April2000No: '[name="asylumBefore3April2000"][value="no"]',

      successfulDecisionYes: '[name="successfulDecision"][value="yes"]',
      successfulDecisionNo: '[name="successfulDecision"][value="no"]',

      supportedByHomeOfficeYes: '[name="supportedByHomeOffice"][value="yes"]',
      supportedByHomeOfficeNo: '[name="supportedByHomeOffice"][value="no"]',
    };
  }
}

module.exports = AsylumSeeker;
