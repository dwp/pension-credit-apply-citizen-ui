const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');
const eligibleForPensionAgeHB = require('../../../definitions/route-conditions/eligible-for-pension-age-hb.js');

describe('route-conditions/eligible-for-pension-age-hb', () => {
  const stubRoute = {};

  it('should be a function', () => {
    expect(eligibleForPensionAgeHB).to.be.a('function');
  });

  it('should return false if DOB has no page data', () => {
    const context = new JourneyContext({});
    return expect(eligibleForPensionAgeHB(stubRoute, context)).to.be.false;
  });

  it('should return false if DOB data is empty object', () => {
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: {} });
    return expect(eligibleForPensionAgeHB(stubRoute, context)).to.be.false;
  });

  it('should return true if claimant date of birth is before 5 February 1954', () => {
    const dateOfBirth = { yyyy: '1954', mm: '02', dd: '04' };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });
    return expect(eligibleForPensionAgeHB(stubRoute, context)).to.be.true;
  });

  it('should return true if claimant date of birth is 5 February 1954', () => {
    const dateOfBirth = { yyyy: '1954', mm: '02', dd: '05' };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });
    return expect(eligibleForPensionAgeHB(stubRoute, context)).to.be.true;
  });

  it('should return false if claimant date of birth is after 5 February 1954', () => {
    const dateOfBirth = { yyyy: '1954', mm: '02', dd: '06' };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });
    return expect(eligibleForPensionAgeHB(stubRoute, context)).to.be.false;
  });

  it('should throw if date is invalid', () => {
    const dateOfBirth = { yyyy: '1954', mm: 'AA', dd: '06' };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });
    return expect(() => eligibleForPensionAgeHB(stubRoute, context)).to.throw('invalid date of birth');
  });
});
