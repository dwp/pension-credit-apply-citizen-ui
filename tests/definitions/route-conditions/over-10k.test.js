const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');
const over10k = require('../../../definitions/route-conditions/over-10k.js');

describe('route-conditions/check-state-pension-age', () => {
  const stubRoute = {};

  it('should be a function', () => {
    expect(over10k).to.be.a('function');
  });

  it('should return true if moneyBackdated is over 10000', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: 10000.01,
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if moneyToday is over 10000', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyToday: 10000.01,
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if hasSecondProperty is over yes', () => {
    const context = new JourneyContext({
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'yes',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return false if both moneyBackdated and moneyToday are no over 10000 and hasSecondPropety is not yes', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: 10000.00,
        moneyToday: 10000.00,
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.false;
  });
});
