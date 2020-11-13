const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');
const over10k = require('../../../definitions/route-conditions/over-10k.js');

describe('route-conditions/check-state-pension-age', () => {
  const stubRoute = {};

  it('should be a function', () => {
    expect(over10k).to.be.a('function');
  });

  it('should return false if moneyBackdated and moneyToday are 0.00 and hasSecondPropety is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '0.00',
        moneyToday: '0.00',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.false;
  });

  it('should return false if moneyBackdated and moneyToday are 0.00 and hasSecondPropety is yes', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '0.00',
        moneyToday: '0.00',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'yes',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.false;
  });

  it('should return true if moneyToday is over 0.00 and hasSecondProperty is yes', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyToday: '0.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'yes',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if moneyBackdated is over 0.00 and hasSecondProperty is yes', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '0.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'yes',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if moneyBackdated is over 10000 and second property is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '10000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if moneyToday is over 10000 and second property is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyToday: '10000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if moneyBackdated is over 10000 and second property is yes', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '10000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'yes',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if moneyToday is over 10000 and second property is yes', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyToday: '10000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'yes',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return false if moneyBackdated or moneyToday are at the limit (10000) and hasSecondPropety is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '10000.00',
        moneyToday: '10000.00',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.false;
  });

  it('should return false if moneyBackdated and moneyToday are equal to 10,000.00 (with commas) and hasSecondPropety is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '10,000.00',
        moneyToday: '10,000.00',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.false;
  });

  it('should return true if moneyBackdated and moneyToday are over 10,000.00 (with commas) and hasSecondPropety is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '10,000.01',
        moneyToday: '10,000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if when one of moneyBackdated only is over 10,000.00 (with commas) and hasSecondPropety is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyBackdated: '10,000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });

  it('should return true if when one of moneytoday only is over 10,000.00 (with commas) and hasSecondPropety is no', () => {
    const context = new JourneyContext({
      [WP.MONEY_YOU_HAVE]: {
        moneyToday: '10,000.01',
      },
      [WP.SECOND_PROPERTY]: {
        hasSecondProperty: 'no',
      },
    });

    return expect(over10k(stubRoute, context)).to.be.true;
  });
});
