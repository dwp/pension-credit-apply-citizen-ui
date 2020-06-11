const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      partnerRegisteredBlindNo: '[name="partnerRegisteredBlind"][value="no"]',
    };
  }
}

module.exports = PartnerDetails;
