const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');

class LettersPostcode extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      enterManualLink: `a[href*="${WP.LETTERS_ADDRESS_MANUAL}"]`,
    };
  }
}

module.exports = LettersPostcode;
