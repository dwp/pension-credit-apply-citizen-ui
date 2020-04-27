const { testutils: { BaseTestWaypoint } } = require('@dwp/govuk-casa');

class PartnerUkSponsorship extends BaseTestWaypoint {
  static fieldSelectors() {
    return {
      yes: '[name="partnerSponsorshipUndertaking"][value="yes"]',
      no: '[name="partnerSponsorshipUndertaking"][value="no"]',
    };
  }
}

module.exports = PartnerUkSponsorship;
