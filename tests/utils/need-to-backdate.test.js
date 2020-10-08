const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../lib/constants.js');

const getEarliestEntitlementDateStub = sinon.stub();
const getOfferedDateOfClaimStub = sinon.stub();

const needToBackdate = proxyquire('../../utils/need-to-backdate.js', {
  './get-earliest-entitlement-date.js': getEarliestEntitlementDateStub,
  './get-offered-date-of-claim.js': getOfferedDateOfClaimStub,
});

describe('Utils: need-to-backdate', () => {
  let _now;

  beforeEach(() => {
    const date = new Date(2020, 0, 10);
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    getEarliestEntitlementDateStub.reset();
    getOfferedDateOfClaimStub.reset();
    Date.now = _now;
  });

  it('should export a function', () => {
    expect(needToBackdate).to.be.a('function');
  });

  it('should return false if earliestEntitlementDate is not over a week ago', () => {
    const context = new JourneyContext();
    getEarliestEntitlementDateStub.returns('2020-01-09');
    expect(needToBackdate(context)).to.equal(false);
  });

  it('should return false if getOfferedDateOfClaim cannot calculate a date of claim', () => {
    const context = new JourneyContext();
    getEarliestEntitlementDateStub.returns('2020-01-02');
    getOfferedDateOfClaimStub.returns(null);
    expect(needToBackdate(context)).to.equal(false);
    expect(getEarliestEntitlementDateStub).to.be.calledWith(context);
  });

  it('should return false if offeredDateOfClaim was rejected and differentClaimDate is not over a week ago', () => {
    const context = new JourneyContext({
      [WP.OFFERED_CLAIM_DATE]: { acceptClaimDate: 'no' },
      [WP.DIFFERENT_CLAIM_DATE]: { differentClaimDate: { yyyy: '2020', mm: '01', dd: '09' } },
    });
    getEarliestEntitlementDateStub.returns('2020-01-02');
    getOfferedDateOfClaimStub.returns('2020-01-02');
    expect(needToBackdate(context)).to.equal(false);
    expect(getEarliestEntitlementDateStub).to.be.calledWith(context);
    expect(getOfferedDateOfClaimStub).to.be.calledWith(context);
  });

  it('should return true if offeredDateOfClaim was rejected and differentClaimDate is over a week ago', () => {
    const context = new JourneyContext({
      [WP.OFFERED_CLAIM_DATE]: { acceptClaimDate: 'no' },
      [WP.DIFFERENT_CLAIM_DATE]: { differentClaimDate: { yyyy: '2020', mm: '01', dd: '02' } },
    });
    getEarliestEntitlementDateStub.returns('2020-01-02');
    getOfferedDateOfClaimStub.returns('2020-01-02');
    expect(needToBackdate(context)).to.equal(true);
    expect(getEarliestEntitlementDateStub).to.be.calledWith(context);
    expect(getOfferedDateOfClaimStub).to.be.calledWith(context);
  });

  it('should return false if offeredDateOfClaim was accepted and is not over a week ago', () => {
    const context = new JourneyContext({ [WP.OFFERED_CLAIM_DATE]: { acceptClaimDate: 'yes' } });
    getEarliestEntitlementDateStub.returns('2020-01-02');
    getOfferedDateOfClaimStub.returns('2020-01-09');
    expect(needToBackdate(context)).to.equal(false);
    expect(getEarliestEntitlementDateStub).to.be.calledWith(context);
    expect(getOfferedDateOfClaimStub).to.be.calledWith(context);
  });

  it('should return true if offeredDateOfClaim was accepted and is over a week ago', () => {
    const context = new JourneyContext({ [WP.OFFERED_CLAIM_DATE]: { acceptClaimDate: 'yes' } });
    getEarliestEntitlementDateStub.returns('2020-01-02');
    getOfferedDateOfClaimStub.returns('2020-01-02');
    expect(needToBackdate(context)).to.equal(true);
    expect(getEarliestEntitlementDateStub).to.be.calledWith(context);
    expect(getOfferedDateOfClaimStub).to.be.calledWith(context);
  });
});
