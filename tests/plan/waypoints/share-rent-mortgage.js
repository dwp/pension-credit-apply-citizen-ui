const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ShareRentMortgage extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="shareRentMortgage"][value="yes"]',
      no: '[name="shareRentMortgage"][value="no"]',
    };
  }
}

module.exports = ShareRentMortgage;
