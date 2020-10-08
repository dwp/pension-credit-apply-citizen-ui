const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const dateToDateObject = require('../../../utils/date-to-date-object.js');
const spaIsOver4MonthsAway = require('../../../definitions/route-conditions/spa-is-over-4-months-away.js');

describe('route-conditions/spa-is-over-4-months-away', () => {
  const stubRoute = { source: 'test' };

  let _now;

  beforeEach(() => {
    const date = new Date('2021-01-01');
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    Date.now = _now;
  });

  it('should be a function', () => {
    expect(spaIsOver4MonthsAway).to.be.a('function');
  });

  it('should return false if DOB has no page data', () => {
    const context = new JourneyContext({});
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.false;
  });

  it('should return false if DOB data is empty object', () => {
    const context = new JourneyContext({ test: {} });
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.false;
  });

  it('should return false if claimant is over State Pension Age', () => {
    const dateOfBirth = { yyyy: '1920', mm: '01', dd: '01' };
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.false;
  });

  it('should return false if claimant turned State Pension Age today', () => {
    // Date frozen at 2021-01-01
    const today = new Date(Date.now());
    // 66 birthday on 2021-01-01 will be their State Pension Age
    const birthday = new Date(today.getFullYear() - 66, today.getMonth(), today.getDate());
    const dateOfBirth = dateToDateObject(birthday);
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.false;
  });

  it('should return false if claimant State Pension Age within the next 4 months', () => {
    // Date frozen at 2021-01-01
    const today = new Date(Date.now());
    // 66 birthday on 2021-03-01 will be their State Pension Age (2 months in the future)
    const birthday = new Date(today.getFullYear() - 66, today.getMonth() + 2, today.getDate());
    const dateOfBirth = dateToDateObject(birthday);
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.false;
  });

  it('should return false if claimant State Pension Age is 4 months from today', () => {
    // Date frozen at 2021-01-01
    const today = new Date(Date.now());
    // 66 birthday on 2021-05-01 will be their State Pension Age (4 months in the future)
    const birthday = new Date(today.getFullYear() - 66, today.getMonth() + 4, today.getDate());
    const dateOfBirth = dateToDateObject(birthday);
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.false;
  });

  it('should return true if claimant State Pension Age is over 4 months from today', () => {
    // Date frozen at 2021-01-01
    const today = new Date(Date.now());
    // 66 birthday on 2021-05-02 will be their State Pension Age (4 months and 1 day in the future)
    const birthday = new Date(today.getFullYear() - 66, today.getMonth() + 4, today.getDate() + 1);
    const dateOfBirth = dateToDateObject(birthday);
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsOver4MonthsAway(stubRoute, context)).to.be.true;
  });
});
