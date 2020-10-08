const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../lib/constants.js');

const dateOfClaimStub = sinon.stub();
const stubData = { dateOfClaim: '2020-04-04' };
dateOfClaimStub.returns(stubData);

const getOfferedDateOfClaim = proxyquire('../../utils/get-offered-date-of-claim.js', {
  '@dwp/pension-credit-date-of-claim': dateOfClaimStub,
});

describe('Utils: get-offered-date-of-claim', () => {
  let _now;

  beforeEach(() => {
    const date = new Date(2020, 5, 10);
    _now = Date.now;
    Date.now = () => (date);
  });

  afterEach(() => {
    Date.now = _now;
  });

  it('should export a function', () => {
    expect(getOfferedDateOfClaim).to.be.a('function');
  });

  describe('without periods abroad', () => {
    it('should call getDateOfClaim with claimant date of birth and application date of today', () => {
      const context = new JourneyContext({
        [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
      });
      getOfferedDateOfClaim(context);
      expect(dateOfClaimStub).to.be.calledWith({
        dateOfBirth: new Date(1920, 0, 1),
        applicationDate: new Date(Date.now()),
      });
    });

    it('should return dateOfClaim property from getDateOfClaim result', () => {
      const context = new JourneyContext({
        [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
      });
      expect(getOfferedDateOfClaim(context)).to.equal(stubData.dateOfClaim);
    });
  });

  describe('with periods abroad', () => {
    it('should return null if more than one abroad period', () => {
      const context = new JourneyContext({
        [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
        [WP.ABROAD]: { abroadMoreThan4Weeks: 'yes' },
        [WP.PERIODS_ABROAD]: { periodsAbroad: 'moreThanOne' },
      });
      expect(getOfferedDateOfClaim(context)).to.equal(null);
    });

    it('should call getDateOfClaim with dateOfBirth, applicationDate and abroadPeriod', () => {
      const context = new JourneyContext({
        [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
        [WP.ABROAD]: { abroadMoreThan4Weeks: 'yes' },
        [WP.PERIODS_ABROAD]: { periodsAbroad: 'one' },
        [WP.DATES_ABROAD]: {
          dateYouLeft: { yyyy: '2020', mm: '02', dd: '01' },
          dateYouReturned: { yyyy: '2020', mm: '04', dd: '01' },
        },
      });
      getOfferedDateOfClaim(context);
      expect(dateOfClaimStub).to.be.calledWith({
        dateOfBirth: new Date(1920, 0, 1),
        applicationDate: new Date(Date.now()),
        abroadPeriod: {
          medicalOrBereavement: false,
          from: new Date(2020, 1, 1),
          to: new Date(2020, 3, 1),
        },
      });
    });

    it('should return null if periodAbroadForMedical is yes', () => {
      const context = new JourneyContext({
        [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
        [WP.ABROAD]: { abroadMoreThan4Weeks: 'yes' },
        [WP.PERIODS_ABROAD]: { periodsAbroad: 'one' },
        [WP.ABROAD_MEDICAL]: { periodAbroadForMedical: 'yes' },
        [WP.DATES_ABROAD]: {
          dateYouLeft: { yyyy: '2020', mm: '02', dd: '01' },
          dateYouReturned: { yyyy: '2020', mm: '04', dd: '01' },
        },
      });
      expect(getOfferedDateOfClaim(context)).to.equal(null);
    });

    it('should return dateOfClaim property from getDateOfClaim result', () => {
      const context = new JourneyContext({
        [WP.DATE_OF_BIRTH]: { dateOfBirth: { yyyy: '1920', mm: '01', dd: '01' } },
        [WP.ABROAD]: { abroadMoreThan4Weeks: 'no' },
        [WP.PERIODS_ABROAD]: { periodsAbroad: 'one' },
        [WP.ABROAD_MEDICAL]: { periodAbroadForMedical: 'no' },
        [WP.DATES_ABROAD]: {
          dateYouLeft: { yyyy: '2020', mm: '02', dd: '01' },
          dateYouReturned: { yyyy: '2020', mm: '04', dd: '01' },
        },
      });
      expect(getOfferedDateOfClaim(context)).to.equal(stubData.dateOfClaim);
    });
  });
});
