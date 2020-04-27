const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerNationality extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      partnerRightToResideYes: '[name="partnerRightToReside"][value="yes"]',
      partnerRightToResideNo: '[name="partnerRightToReside"][value="no"]',
      partnerLived2YearsYes: '[name="partnerLived2Years"][value="yes"]',
      partnerLived2YearsNo: '[name="partnerLived2Years"][value="no"]',
    };
  }
}

module.exports = PartnerNationality;
