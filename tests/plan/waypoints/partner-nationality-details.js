const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerNationalityDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      partnerCameToUkToWorkYes: '[name="partnerCameToUkToWork"][value="yes"]',
      partnerCameToUkToWorkNo: '[name="partnerCameToUkToWork"][value="no"]',

      partnerNoRecourseToPublicFundsYes: '[name="partnerNoRecourseToPublicFunds"][value="yes"]',
      partnerNoRecourseToPublicFundsNo: '[name="partnerNoRecourseToPublicFunds"][value="no"]',

      partnerLivedInUkBeforeYes: '[name="partnerLivedInUkBefore"][value="yes"]',
      partnerLivedInUkBeforeNo: '[name="partnerLivedInUkBefore"][value="no"]',

      partnerFamilyReunionSchemeYes: '[name="partnerFamilyReunionScheme"][value="yes"]',
      partnerFamilyReunionSchemeNo: '[name="partnerFamilyReunionScheme"][value="no"]',
    };
  }
}

module.exports = PartnerNationalityDetails;
