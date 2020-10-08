const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PeriodsAbroad extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      one: '[name="periodsAbroad"][value="one"]',
      moreThanOne: '[name="periodsAbroad"][value="moreThanOne"]',
    };
  }
}

module.exports = PeriodsAbroad;
