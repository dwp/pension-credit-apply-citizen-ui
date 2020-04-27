const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ServiceCharges extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      paysServiceChargesYes: '[name="paysServiceCharges"][value="yes"]',
      paysServiceChargesNo: '[name="paysServiceCharges"][value="no"]',
      paysGroundRentYes: '[name="paysGroundRent"][value="yes"]',
      paysGroundRentNo: '[name="paysGroundRent"][value="no"]',
      getsHousingBenefitYes: '[name="getsHousingBenefit"][value="yes"]',
      getsHousingBenefitNo: '[name="getsHousingBenefit"][value="no"]',
    };
  }
}

module.exports = ServiceCharges;
