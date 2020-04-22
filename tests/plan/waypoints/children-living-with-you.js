const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class ChildrenLivingWithYou extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="hasChildren"][value="yes"]',
      no: '[name="hasChildren"][value="no"]',
    };
  }
}

module.exports = ChildrenLivingWithYou;
