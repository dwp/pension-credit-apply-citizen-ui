const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../lib/constants.js');

const getOfferedDateOfClaimStub = sinon.stub();
const getChosenDateOfClaim = proxyquire('../../utils/get-chosen-date-of-claim.js', {
  './get-offered-date-of-claim.js': getOfferedDateOfClaimStub,
});

describe('Utils: get-chosen-date-of-claim', () => {
  it('should export a function', () => {
    expect(getChosenDateOfClaim).to.be.a('function');
  });

  it('should call getOfferedDateOfClaim with context', () => {
    const context = new JourneyContext({});
    getOfferedDateOfClaimStub.returns(null);
    getChosenDateOfClaim(context);
    expect(getOfferedDateOfClaimStub).to.be.calledWith(context);
  });

  it('should return null if getOfferedDateOfClaim returns null', () => {
    const context = new JourneyContext({});
    getOfferedDateOfClaimStub.returns(null);
    expect(getChosenDateOfClaim(context)).to.equal(null);
  });

  it('should return getOfferedDateOfClaim value if claim date accepted', () => {
    const context = new JourneyContext({
      [WP.OFFERED_CLAIM_DATE]: { acceptClaimDate: 'yes' },
    });
    getOfferedDateOfClaimStub.returns('test-value');
    expect(getChosenDateOfClaim(context)).to.equal('test-value');
  });

  it('should return getOfferedDateOfClaim value if acceptClaimDate is undefined', () => {
    const context = new JourneyContext({});
    getOfferedDateOfClaimStub.returns('test-value');
    expect(getChosenDateOfClaim(context)).to.equal('test-value');
  });

  it('should return different claim date as ISO string if claim date rejected', () => {
    const context = new JourneyContext({
      [WP.OFFERED_CLAIM_DATE]: { acceptClaimDate: 'no' },
      [WP.DIFFERENT_CLAIM_DATE]: { differentClaimDate: { yyyy: '2020', mm: '01', dd: '02' } },
    });
    getOfferedDateOfClaimStub.returns('test-value');
    expect(getChosenDateOfClaim(context)).to.equal('2020-01-02');
  });
});
