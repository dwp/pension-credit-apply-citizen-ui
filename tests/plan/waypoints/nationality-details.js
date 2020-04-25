const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class NationalityDetails extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      cameToUkToWorkYes: '[name="cameToUkToWork"][value="yes"]',
      cameToUkToWorkNo: '[name="cameToUkToWork"][value="no"]',

      noRecourseToPublicFundsYes: '[name="noRecourseToPublicFunds"][value="yes"]',
      noRecourseToPublicFundsNo: '[name="noRecourseToPublicFunds"][value="no"]',

      livedInUkBeforeYes: '[name="livedInUkBefore"][value="yes"]',
      livedInUkBeforeNo: '[name="livedInUkBefore"][value="no"]',

      familyReunionSchemeYes: '[name="familyReunionScheme"][value="yes"]',
      familyReunionSchemeNo: '[name="familyReunionScheme"][value="no"]',
    };
  }
}

module.exports = NationalityDetails;
