const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerHousingBenefit extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="partnerGetsHousingBenefit"][value="yes"]',
      no: '[name="partnerGetsHousingBenefit"][value="no"]',
    };
  }
}

module.exports = PartnerHousingBenefit;
