const { expect } = require('chai');
const { JourneyContext } = require('@dwp/govuk-casa');
const getSelfEmploymentVars = require('../../utils/get-self-employment-vars.js');

describe('Utils: get-self-employment-vars', () => {
  let _now;

  beforeEach(() => {
    const date = new Date(2020, 6, 1);
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    Date.now = _now;
  });

  it('should export a function', () => {
    expect(getSelfEmploymentVars).to.be.a('function');
  });

  it('should return selfEmployedSuffix of Past and selfEmployedEarningsDate of 6 months before today if chosenDateOfClaim is null', () => {
    const context = new JourneyContext({});
    expect(getSelfEmploymentVars(context)).to.deep.equal({
      selfEmployedEarningsDate: '2020-01-01',
      selfEmployedSuffix: 'Past',
    });
  });
});
