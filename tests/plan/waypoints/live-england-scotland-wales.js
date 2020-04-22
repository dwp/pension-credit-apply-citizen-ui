const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class LiveEnglandScotlandWales extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="inEnglandScotlandWales"][value="yes"]',
      no: '[name="inEnglandScotlandWales"][value="no"]',
    };
  }
}

module.exports = LiveEnglandScotlandWales;
