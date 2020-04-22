const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerAgree extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="partnerAgree"][value="yes"]',
      no: '[name="partnerAgree"][value="no"]',
    };
  }
}

module.exports = PartnerAgree;
