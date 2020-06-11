const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerRegisteredBlind extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="partnerRegisteredBlind"][value="yes"]',
      no: '[name="partnerRegisteredBlind"][value="no"]',
    };
  }
}

module.exports = PartnerRegisteredBlind;
