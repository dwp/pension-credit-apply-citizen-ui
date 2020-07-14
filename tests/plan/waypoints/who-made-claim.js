const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class WhoMadeClaim extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      claimant: '[name="whoMadeClaim"][value="claimant"]',
      powerOfAttorney: '[name="whoMadeClaim"][value="powerOfAttorney"]',
      appointee: '[name="whoMadeClaim"][value="appointee"]',
      personalActingBodyher: '[name="whoMadeClaim"][value="personalActingBody"]',
      corporateActingBody: '[name="whoMadeClaim"][value="corporateActingBody"]',
      charity: '[name="whoMadeClaim"][value="charity"]',
      friendOrFamily: '[name="whoMadeClaim"][value="friendOrFamily"]',
      someoneElse: '[name="whoMadeClaim"][value="someoneElse"]',
    };
  }
}

module.exports = WhoMadeClaim;
