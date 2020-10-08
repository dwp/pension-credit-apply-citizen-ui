const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');

const getChosenDateOfClaimStub = sinon.stub();
const getSelfEmploymentVars = proxyquire('../../utils/get-self-employment-vars.js', {
  './get-chosen-date-of-claim.js': getChosenDateOfClaimStub,
});

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

  it('should call getChosenDateOfClaim with context', () => {
    const context = new JourneyContext({});
    getChosenDateOfClaimStub.returns(null);
    getSelfEmploymentVars(context);
    expect(getChosenDateOfClaimStub).to.be.calledWith(context);
  });

  it('should return selfEmployedSuffix of Present if chosenDateOfClaim is more than 3 months in the future', () => {
    const context = new JourneyContext({});
    getChosenDateOfClaimStub.returns('2020-10-02');
    expect(getSelfEmploymentVars(context)).to.deep.equal({ selfEmployedSuffix: 'Present' });
  });

  it('should return selfEmployedSuffix of Past and selfEmployedEarningsDate of 3 months before chosenDateOfClaim if chosenDateOfClaim is less than 3 months from now', () => {
    const context = new JourneyContext({});
    getChosenDateOfClaimStub.returns('2020-7-01');
    expect(getSelfEmploymentVars(context)).to.deep.equal({
      selfEmployedEarningsDate: '1 April 2020',
      selfEmployedSuffix: 'Past',
    });
  });

  it('should return selfEmployedSuffix of Past and selfEmployedEarningsDate of 6 months before today if chosenDateOfClaim is null', () => {
    const context = new JourneyContext({});
    getChosenDateOfClaimStub.returns(null);
    expect(getSelfEmploymentVars(context)).to.deep.equal({
      selfEmployedEarningsDate: '1 January 2020',
      selfEmployedSuffix: 'Past',
    });
  });

  it('should return selfEmployedEarningsDate in welsh if language is set to cy', () => {
    const context = new JourneyContext({}, {}, { language: 'cy' });
    getChosenDateOfClaimStub.returns(null);
    expect(getSelfEmploymentVars(context)).to.deep.equal({
      selfEmployedEarningsDate: '1 Ionawr 2020',
      selfEmployedSuffix: 'Past',
    });
  });
});
