const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class HousingBenefit extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      getsHousingBenefitYes: '[name="getsHousingBenefit"][value="yes"]',
      getsHousingBenefitNo: '[name="getsHousingBenefit"][value="no"]',
      wantsHousingBenefitYes: '[name="wantsHousingBenefit"][value="yes"]',
      wantsHousingBenefitNo: '[name="wantsHousingBenefit"][value="no"]',
    };
  }
}

module.exports = HousingBenefit;
