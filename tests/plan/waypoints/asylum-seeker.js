const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class AsylumSeeker extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="asylumSeeker"][value="yes"]',
      no: '[name="asylumSeeker"][value="no"]',
    };
  }
}

module.exports = AsylumSeeker;
