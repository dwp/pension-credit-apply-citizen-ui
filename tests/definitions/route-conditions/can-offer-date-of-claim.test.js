const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../../lib/constants.js');

const getDateOfClaimStub = sinon.stub();
getDateOfClaimStub.returns({ dateOfClaim: '2020-10-10' });

const canOfferDateOfClaim = proxyquire('../../../definitions/route-conditions/can-offer-date-of-claim.js', {
  '@dwp/pension-credit-date-of-claim': getDateOfClaimStub,
});

const testData = {
  [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
  [WP.ABROAD_MEDICAL]: { periodAbroadForMedical: 'no' },
  [WP.DATES_ABROAD]: {
    dateYouLeft: { yyyy: '2020', mm: '02', dd: '01' },
    dateYouReturned: { yyyy: '2020', mm: '04', dd: '01' },
  },
};

describe('route-conditions/can-offer-date-of-claim', () => {
  const stubRoute = {};

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
    expect(canOfferDateOfClaim).to.be.a('function');
  });

  it('should call getDateOfClaim with session data', () => {
    const context = new JourneyContext(testData);
    canOfferDateOfClaim(stubRoute, context);
    expect(getDateOfClaimStub).to.be.calledWith({
      dateOfBirth: new Date(1920, 0, 1),
      applicationDate: new Date(Date.now()),
      abroadPeriod: {
        from: new Date(2020, 1, 1),
        to: new Date(2020, 3, 1),
        medicalOrBereavement: false,
      },
    });
  });

  it('should call getDateOfClaim with session data with medicalOrBereavement true', () => {
    const context = new JourneyContext({ ...testData, [WP.ABROAD_MEDICAL]: { periodAbroadForMedical: 'yes' } });
    canOfferDateOfClaim(stubRoute, context);
    expect(getDateOfClaimStub).to.be.calledWith({
      dateOfBirth: new Date(1920, 0, 1),
      applicationDate: new Date(Date.now()),
      abroadPeriod: {
        from: new Date(2020, 1, 1),
        to: new Date(2020, 3, 1),
        medicalOrBereavement: true,
      },
    });
  });

  it('should return true if getDateOfClaim returns a dateOfClaim which is not null', () => {
    const context = new JourneyContext(testData);
    return expect(canOfferDateOfClaim(stubRoute, context)).to.be.true;
  });

  it('should return false if getDateOfClaim returns a dateOfClaim which is null', () => {
    const context = new JourneyContext(testData);
    getDateOfClaimStub.returns({ dateOfClaim: null });
    return expect(canOfferDateOfClaim(stubRoute, context)).to.be.false;
  });
});
