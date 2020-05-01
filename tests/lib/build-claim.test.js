/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const { expect } = chai;

const { waypoints: WP } = require('../../lib/constants.js');

const buildClaim = require('../../lib/build-claim.js');

const stubDate = { dd: '1', mm: '2', yyyy: '2000' };
const stubAddress = {
  addressLine1: 'Street',
  addressLine2: 'Estate',
  town: 'Town',
  county: 'County',
  postcode: 'AA1 1AA',
};
const stubDataBase = {
  [WP.DATE_OF_BIRTH]: {
    dateOfBirth: stubDate,
  },
  [WP.DATE_OF_CLAIM]: {
    dateOfClaim: stubDate,
  },
  [WP.HRT_CITIZEN_NATIONALITY_DETAILS]: {
    lastCameToUk: stubDate,
    lastLeftUk: stubDate,
  },
  [WP.HRT_CITIZEN_SPONSORSHIP_DETAILS]: {
    sponsorshipUndertakingSigned: stubDate,
  },
  [WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN]: {
    address: stubAddress,
  },
  [WP.LETTERS_ADDRESS_HIDDEN]: {
    address: stubAddress,
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

  it('should sanitise nino', () => {
    stubData[WP.CLAIMANT_DETAILS] = {
      nino: 'rn 00 10 01 a',
    };
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim).to.haveOwnProperty('nino').that.equals('RN001001A');
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

  it('should sanitise partner nino', () => {
    stubData[WP.LIVE_WITH_PARTNER] = {
      liveWithPartner: 'yes',
      partnerDateOfBirth: stubDate,
    };
    stubData[WP.PARTNER_DETAILS] = {
      partnerNino: 'rn 00 10 01 b',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.partner).to.haveOwnProperty('nino').that.equals('RN001001B');
  });

  it('should only include a "habitualResidencyTest" section if the user went down this route', () => {
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

  it('should only include disregards data if the user went down this route', () => {
    let traversed = [WP.DISREGARDED_MONEY];

    const plan = {
      traverse: sinon.stub().callsFake(() => traversed),
    };

    let claim = buildClaim(plan, context);
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('benefitArrears');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('councilTaxArrears');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('secondWorldWar');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('personalInjury');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('homeInsurance');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('essentialRepairs');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('independentLiving');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('incidentEmergency');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('windrush');
    expect(claim.moneySavingsInvestments).to.haveOwnProperty('bloodInfection');
    expect(claim.askedAboutDisregards()).to.be.true;

    traversed = [];
    claim = buildClaim(plan, context);
    expect(claim.moneySavingsInvestments).to.not.haveOwnProperty('benefitArrears');
    expect(claim.askedAboutDisregards()).to.be.false;
  });
});
