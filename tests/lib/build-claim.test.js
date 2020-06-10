/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const { expect } = chai;

const { waypoints: WP } = require('../../lib/constants.js');

const buildClaim = require('../../lib/build-claim.js');

const stubDate = { dd: '1', mm: '2', yyyy: '2050' };
const stubAddress = {
  addressLine1: 'Street',
  addressLine2: 'Estate',
  town: 'Town',
  county: 'County',
  postcode: 'AA1 1AA',
};
const stubDataBase = {
  [WP.NATIONAL_INSURANCE]: {
    nino: 'RN001001A',
  },
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

  it('should include claimant nationality information', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    stubData[WP.YOUR_NATIONALITY] = {
      rightToReside: 'yes',
      lived2Years: 'yes',
    };

    const claim1 = buildClaim(plan, context);
    expect(claim1.claimant).to.haveOwnProperty('rightToWorkUk').that.equals(true);
    expect(claim1.claimant).to.haveOwnProperty('permanentResidency').that.equals(true);

    stubData[WP.YOUR_NATIONALITY] = {
      rightToReside: 'no',
      lived2Years: 'no',
    };

    const claim2 = buildClaim(plan, context);
    expect(claim2.claimant).to.haveOwnProperty('rightToWorkUk').that.equals(false);
    expect(claim2.claimant).to.haveOwnProperty('permanentResidency').that.equals(false);
  });

  it('should sanitise nino', () => {
    stubData[WP.NATIONAL_INSURANCE] = {
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
    stubData[WP.PARTNER_NI_NUMBER] = {
      partnerNino: 'NR001002B',
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
    stubData[WP.PARTNER_NI_NUMBER] = {
      partnerNino: 'rn 00 10 01 b',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.partner).to.haveOwnProperty('nino').that.equals('RN001001B');
  });

  it('should set home ownership as OWN', () => {
    stubData[WP.HOME_OWNERSHIP] = {
      homeOwnership: 'own',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('rentOrOwnProperty').that.equals('OWN');
  });

  it('should set home ownership as RENT', () => {
    stubData[WP.HOME_OWNERSHIP] = {
      homeOwnership: 'rent',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('rentOrOwnProperty').that.equals('RENT');
  });

  it('should set home ownership as SHARED_OWNERSHIP', () => {
    stubData[WP.HOME_OWNERSHIP] = {
      homeOwnership: 'sharedOwnership',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('rentOrOwnProperty').that.equals('SHARED_OWNERSHIP');
  });

  it('should set home ownership as OTHER', () => {
    stubData[WP.HOME_OWNERSHIP] = {
      homeOwnership: 'other',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('rentOrOwnProperty').that.equals('OTHER');
  });

  it('should include home address from manual entry', () => {
    stubData[WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN] = {
      addressFrom: 'manual',
      address: {
        addressLine1: '123 Test Street',
        addressLine2: 'Testerton',
        town: 'Testville',
        county: 'Testershire',
        postcode: 'TE573R',
      },
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('buildingAndStreet').that.equals('123 Test Street, Testerton');
    expect(claim.whereClaimantLives).to.haveOwnProperty('townOrCity').that.equals('Testville');
    expect(claim.whereClaimantLives).to.haveOwnProperty('county').that.equals('Testershire');
    expect(claim.whereClaimantLives).to.haveOwnProperty('postcode').that.equals('TE5 73R');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('uprn');
  });

  it('should include home uprn from select list', () => {
    stubData[WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN] = {
      addressFrom: 'select',
      completeAddressLine: '123 Test Street, Testerton',
      uprn: '1234567',
      address: {
        postcode: 'TE573R',
      },
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('uprn').that.equals('1234567');
    expect(claim.whereClaimantLives).to.haveOwnProperty('buildingAndStreet').that.equals('123 Test Street, Testerton');
    expect(claim.whereClaimantLives).to.haveOwnProperty('postcode').that.equals('TE5 73R');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('townOrCity');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('county');
  });

  it('should include contact address from manual sendLettersToHome is "no"', () => {
    stubData[WP.LETTERS_HOME] = {
      sendLettersToHome: 'no',
    };
    stubData[WP.LETTERS_ADDRESS_HIDDEN] = {
      addressFrom: 'manual',
      address: {
        addressLine1: '123 Test Street',
        addressLine2: 'Testerton',
        town: 'Testville',
        county: 'Testershire',
        postcode: 'TE573R',
      },
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('homeAddressForCorrespondence').that.equals(false);
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactBuildingAndStreet').that.equals('123 Test Street, Testerton');
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactTownOrCity').that.equals('Testville');
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactCounty').that.equals('Testershire');
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactPostcode').that.equals('TE5 73R');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('uprn');
  });

  it('should include contact uprn from select if sendLettersToHome is "no"', () => {
    stubData[WP.LETTERS_HOME] = {
      sendLettersToHome: 'no',
    };
    stubData[WP.LETTERS_ADDRESS_HIDDEN] = {
      addressFrom: 'select',
      completeAddressLine: '123 Test Street, Testerton',
      address: {
        postcode: 'TE573R',
      },
      uprn: '1234567',
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('homeAddressForCorrespondence').that.equals(false);
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactUprn').that.equals('1234567');
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactBuildingAndStreet').that.equals('123 Test Street, Testerton');
    expect(claim.whereClaimantLives).to.haveOwnProperty('contactPostcode').that.equals('TE5 73R');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('contactTownOrCity');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('contactCounty');
  });

  it('should not include contact address if sendLettersToHome is "yes"', () => {
    stubData[WP.LETTERS_HOME] = {
      sendLettersToHome: 'yes',
    };
    stubData[WP.LETTERS_ADDRESS_HIDDEN] = {
      addressFrom: 'select',
      urpn: '1234567',
      address: {
        postcode: 'TE573R',
      },
    };

    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('homeAddressForCorrespondence').that.equals(true);
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('uprn');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('contactBuildingAndStreet');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('contactTownOrCity');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('contactCounty');
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('contactPostcode');
  });

  it('should not have serviceCharges if page not traversed', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('serviceCharges');
  });

  it('should have serviceCharges if page traversed', () => {
    stubData[WP.SERVICE_CHARGES] = {
      paysServiceCharges: 'yes',
    };

    const plan = {
      traverse: sinon.stub().returns([WP.SERVICE_CHARGES]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('serviceCharges').that.equals(true);
  });

  it('should not have receiveHousingBenefit if page not traversed', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('receiveHousingBenefit');
  });

  it('should have receiveHousingBenefit if page traversed', () => {
    stubData[WP.HOUSING_BENEFIT] = {
      getsHousingBenefit: 'yes',
    };

    const plan = {
      traverse: sinon.stub().returns([WP.HOUSING_BENEFIT]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('receiveHousingBenefit').that.equals(true);
  });

  it('should not have twentyOneYearLease if page not traversed', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('lease21YearsOrMore');
  });

  it('should have twentyOneYearLease if page traversed', () => {
    stubData[WP.TWENTY_ONE_YEAR_LEASE] = {
      twentyOneYearLease: 'yes',
    };

    const plan = {
      traverse: sinon.stub().returns([WP.TWENTY_ONE_YEAR_LEASE]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('lease21YearsOrMore').that.equals(true);
  });

  it('should not have supportWithInterest if page not traversed', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.not.haveOwnProperty('supportWithInterest');
  });

  it('should have supportWithInterest if page traversed', () => {
    stubData[WP.HOME_LOAN] = {
      wantsSMI: 'yes',
    };

    const plan = {
      traverse: sinon.stub().returns([WP.HOME_LOAN]),
    };

    const claim = buildClaim(plan, context);
    expect(claim.whereClaimantLives).to.haveOwnProperty('supportWithInterest').that.equals(true);
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

  it('should set claim language based on session language', () => {
    const plan = {
      traverse: sinon.stub().returns([]),
    };

    let claim = buildClaim(plan, context, 'en');
    expect(claim).to.have.property('claimLanguage').that.equals('ENGLISH');

    claim = buildClaim(plan, context, 'cy');
    expect(claim).to.have.property('claimLanguage').that.equals('WELSH');

    claim = buildClaim(plan, context, 'unsupported');
    expect(claim).to.have.property('claimLanguage').that.equals('ENGLISH');
  });
});
