const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const dateToDateObject = require('../../../utils/date-to-date-object.js');
const partnerAtOrOverSPA = require('../../../definitions/route-conditions/partner-at-or-over-spa.js');

describe('route-conditions/partner-at-or-over-spa', () => {
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
    expect(partnerAtOrOverSPA).to.be.a('function');
  });

  it('should return false if DOB has no page data', () => {
    const context = new JourneyContext({});
    return expect(partnerAtOrOverSPA(stubRoute, context)).to.be.false;
  });

  it('should return false if DOB data is empty object', () => {
    const context = new JourneyContext({ test: {} });
    return expect(partnerAtOrOverSPA(stubRoute, context)).to.be.false;
  });

  it('should return true if partner is over State Pension Age', () => {
    const partnerDateOfBirth = { yyyy: '1920', mm: '01', dd: '01' };
    const context = new JourneyContext({ test: { partnerDateOfBirth } });
    return expect(partnerAtOrOverSPA(stubRoute, context)).to.be.true;
  });

  it('should return false if partner is under State Pension Age', () => {
    const partnerDateOfBirth = { yyyy: '2020', mm: '01', dd: '01' };
    const context = new JourneyContext({ test: { partnerDateOfBirth } });
    return expect(partnerAtOrOverSPA(stubRoute, context)).to.be.false;
  });

  it('should return true if partner turned State Pension Age today', () => {
    // Date frozen at 2021-01-01
    const today = new Date(Date.now());
    // 66 birthday on 2021-01-01 will be their State Pension Age
    const birthday = new Date(today.getFullYear() - 66, today.getMonth(), today.getDate());
    const partnerDateOfBirth = dateToDateObject(birthday);
    const context = new JourneyContext({ test: { partnerDateOfBirth } });
    return expect(partnerAtOrOverSPA(stubRoute, context)).to.be.true;
  });
});
