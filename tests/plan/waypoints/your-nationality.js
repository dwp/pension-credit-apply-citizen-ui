const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class YourNationality extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      rightToResideYes: '[name="rightToReside"][value="yes"]',
      rightToResideNo: '[name="rightToReside"][value="no"]',
      lived2YearsYes: '[name="lived2Years"][value="yes"]',
      lived2YearsNo: '[name="lived2Years"][value="no"]',
    };
  }
}

module.exports = YourNationality;
