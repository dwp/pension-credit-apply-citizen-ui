const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class CountryYouLiveIn extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      england: '[name="countryOfResidence"][value="ENGLAND"]',
      scotland: '[name="countryOfResidence"][value="SCOTLAND"]',
      wales: '[name="countryOfResidence"][value="WALES"]',
      northernIreland: '[name="countryOfResidence"][value="NORTHERN_IRELAND"]',
      somewhereElse: '[name="countryOfResidence"][value="somewhereElse"]',
    };
  }
}

module.exports = CountryYouLiveIn;
