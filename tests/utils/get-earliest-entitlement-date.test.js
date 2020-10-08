const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai').use(require('sinon-chai'));
const { JourneyContext } = require('@dwp/govuk-casa');
const { waypoints: WP } = require('../../lib/constants.js');

const dateOfClaimStub = sinon.stub();
const stubData = { dateOfClaim: '2020-04-04' };
dateOfClaimStub.returns(stubData);

const getEarliestEntitlementDate = proxyquire('../../utils/get-earliest-entitlement-date.js', {
  '@dwp/pension-credit-date-of-claim': dateOfClaimStub,
});

describe('Utils: get-earliest-entitlement-date', () => {
  it('should call getDateOfClaim with claimant date of birth and application date of today', () => {
    const dateOfBirth = { yyyy: '1920', mm: '01', dd: '01' };
    const context = new JourneyContext({
      [WP.START]: { applicationDate: '2020-06-09' },
      [WP.DATE_OF_BIRTH]: { dateOfBirth },
    });
    getEarliestEntitlementDate(context);
    expect(dateOfClaimStub).to.be.calledWith({
      dateOfBirth: new Date(1920, 0, 1),
      applicationDate: new Date('2020-06-09'),
    });
  });

  it('should return dateOfClaim property from getDateOfClaim result', () => {
    const dateOfBirth = { yyyy: '1920', mm: '01', dd: '01' };
    const context = new JourneyContext({ [WP.DATE_OF_BIRTH]: { dateOfBirth } });
    expect(getEarliestEntitlementDate(context)).to.equal(stubData.dateOfClaim);
  });
});
