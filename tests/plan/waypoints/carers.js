const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class Carers extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="anyoneGetCarers"][value="yes"]',
      no: '[name="anyoneGetCarers"][value="no"]',
    };
  }
}

module.exports = Carers;
