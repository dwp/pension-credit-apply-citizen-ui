/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const { expect } = chai;

const { waypoints: WP } = require('../../lib/constants.js');

const buildClaim = require('../../lib/build-claim.js');

describe('build-claim', () => {
  it('should return an object matching the expected schema', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const context = {
      getDataForPage: sinon.stub().returns(),
    };

    buildClaim(plan, context);
  });

  it('should only include "partner" section if the user has a partner', () => {
    const data = {
      [WP.LIVE_WITH_PARTNER]: { liveWithPartner: 'yes' },
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const context = {
      getDataForPage: sinon.stub().callsFake((p) => (data[p] || {})),
    };

    let claim = buildClaim(plan, context);
    expect(claim).to.haveOwnProperty('partner');
    expect(claim.hasPartner()).to.be.true;

    data[WP.LIVE_WITH_PARTNER].liveWithPartner = 'no';
    claim = buildClaim(plan, context);
    expect(claim).to.not.haveOwnProperty('partner');
    expect(claim.hasPartner()).to.be.false;
  });

  it('should oly include a "habitualResidencyTest" section if the user went down this route', () => {
    let traversed = [WP.HRT_CITIZEN_RETURNED_TO_UK];

    const plan = {
      traverse: sinon.stub().callsFake(() => traversed),
    };

    const context = {
      getDataForPage: sinon.stub().returns({}),
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
