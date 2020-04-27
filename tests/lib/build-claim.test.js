/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const { expect } = chai;

const { waypoints: WP } = require('../../lib/constants.js');

const buildClaim = require('../../lib/build-claim.js');

const stubDate = { dd: '1', mm: '2', yyyy: '2000' };
const stubDataBase = {
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: stubDate,
  },
  [WP.DATE_OF_CLAIM]: {
    dateOfClaim: stubDate,
  },
  [WP.HRT_CITIZEN_NATIONALITY_DETAILS]: {
    lastCameToUK: stubDate,
    lastLeftUK: stubDate,
  },
  [WP.HRT_CITIZEN_SPONSORSHIP_DETAILS]: {
    sponsorshipUndertakingSigned: stubDate,
  },
};

describe('build-claim', () => {
  let stubData;
  let context;

  beforeEach(() => {
    stubData = JSON.parse(JSON.stringify(stubDataBase));
    context = {
      getDataForPage: sinon.stub().callsFake((wp) => stubData[wp]),
    };
  });

  it('should return an object matching the expected schema', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    buildClaim(plan, context);
  });

  it('should only include "partner" section if the user has a partner', () => {
    stubData[WP.LIVE_WITH_PARTNER] = {
      liveWithPartner: 'yes',
      partnerDateOfBirth: stubDate,
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    let claim = buildClaim(plan, context);
    expect(claim).to.haveOwnProperty('partner');
    expect(claim.hasPartner()).to.be.true;

    stubData[WP.LIVE_WITH_PARTNER].liveWithPartner = 'no';
    claim = buildClaim(plan, context);
    expect(claim).to.not.haveOwnProperty('partner');
    expect(claim.hasPartner()).to.be.false;
  });

  it('should oly include a "habitualResidencyTest" section if the user went down this route', () => {
    let traversed = [WP.HRT_CITIZEN_RETURNED_TO_UK];

    const plan = {
      traverse: sinon.stub().callsFake(() => traversed),
    };

    let claim = buildClaim(plan, context);
    expect(claim).to.haveOwnProperty('habitualResidencyTest');
    expect(claim.citizenHRTRequired()).to.be.true;

    traversed = [];
    claim = buildClaim(plan, context);
    expect(claim).to.not.haveOwnProperty('habitualResidencyTest');
    expect(claim.citizenHRTRequired()).to.be.false;
  });
});
