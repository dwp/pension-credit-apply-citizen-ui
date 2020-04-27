const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerReturnedToUk extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="partnerCameToUk"][value="yes"]',
      no: '[name="partnerCameToUk"][value="no"]',
    };
  }
}

module.exports = PartnerReturnedToUk;
