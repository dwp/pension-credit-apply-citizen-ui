const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const dateToDateObject = require('../../../utils/date-to-date-object.js');
const spaIsToday = require('../../../definitions/route-conditions/spa-is-today.js');

describe('route-conditions/spa-is-today', () => {
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
    expect(spaIsToday).to.be.a('function');
  });

  it('should return false if DOB has no page data', () => {
    const context = new JourneyContext({});
    return expect(spaIsToday(stubRoute, context)).to.be.false;
  });

  it('should return false if DOB data is empty object', () => {
    const context = new JourneyContext({ test: {} });
    return expect(spaIsToday(stubRoute, context)).to.be.false;
  });

  it('should return false if claimant is over State Pension Age', () => {
    const dateOfBirth = { yyyy: '1920', mm: '01', dd: '01' };
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsToday(stubRoute, context)).to.be.false;
  });

  it('should return false if claimant is under State Pension Age', () => {
    const dateOfBirth = { yyyy: '2020', mm: '01', dd: '01' };
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsToday(stubRoute, context)).to.be.false;
  });

  it('should return true if claimant turned State Pension Age today', () => {
    // Date frozen at 2021-01-01
    const today = new Date(Date.now());
    // 66 birthday on 2021-01-01 will be their State Pension Age
    const birthday = new Date(today.getFullYear() - 66, today.getMonth(), today.getDate());
    const dateOfBirth = dateToDateObject(birthday);
    const context = new JourneyContext({ test: { dateOfBirth } });
    return expect(spaIsToday(stubRoute, context)).to.be.true;
  });
});
