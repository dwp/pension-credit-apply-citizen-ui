const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class AbroadMedical extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="periodAbroadForMedical"][value="yes"]',
      no: '[name="periodAbroadForMedical"][value="no"]',
    };
  }
}

module.exports = AbroadMedical;
