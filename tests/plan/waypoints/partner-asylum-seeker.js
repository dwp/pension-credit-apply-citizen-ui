const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerAsylumSeeker extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="partnerAsylumSeeker"][value="yes"]',
      no: '[name="partnerAsylumSeeker"][value="no"]',
    };
  }
}

module.exports = PartnerAsylumSeeker;
