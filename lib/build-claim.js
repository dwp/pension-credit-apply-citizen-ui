/* eslint-disable max-len */
const { waypoints: WP } = require('./constants.js');

const isYes = (value) => value === 'yes';

const toDate = (d) => `${d.yyyy}-${d.mm.padStart(2, '0')}-${d.dd.padStart(2, '0')}`;

module.exports = (plan, context) => {
  // Build a list of traversed waypoints to help decide which attributes to
  // include in the claim dataset
  const traversedWaypoints = plan.traverse(context);
  const traversed = traversedWaypoints.includes.bind(traversedWaypoints);

  // Most field names are unique throughout the waypoints, so can be lifted to a
  // single-depth object for simpler reading. For those that duplicate, add
  // them to exclusions and inject their values into `d` some other way.
  let d = {};
  const exclusions = [];
  Object.keys(WP).filter((wp) => !exclusions.includes(wp)).forEach((wp) => {
    d = { ...d, ...context.getDataForPage(WP[wp]) };
  });

  // Build the claim object
  return {
    nino: 'RN001001A', // DUMMY DATA
    dateOfBirth: toDate(d.dateOfBirth),
    dateOfClaim: toDate(d.dateOfClaim),
    // "helpMakingClaim": true,
    eligibility: {
      statePensionClaimed: isYes(d.statePensionClaimed),
      hasChildren: isYes(d.hasChildren),
      hasPartner: isYes(d.liveWithPartner),
      partnerAgreement: !isYes(d.liveWithPartner) ? undefined : isYes(d.partnerAgree),
      partnerDateOfBirth: !isYes(d.liveWithPartner) ? undefined : toDate(d.partnerDateOfBirth),
      partnerPensionAgeHousingBenefit: !traversed(WP.PARTNER_HOUSING_BENEFIT) ? undefined : isYes(d.partnerGetsHousingBenefit),
    },
    // "claimant": {
    //   "claimantFullName": "Mrs Somebody",
    //   "claimantPreviousNames": "Mrs Somebody-Else",
    //   "contactTelephone": "01 234567",
    //   "sightImpairedBlind": true,
    //   "ableToSpeakEnglish": true,
    //   "firstLanguage": "French",
    //   "requestWelsh": true,
    //   "phoneLetterHelpRequired": true,
    //   "requestBraille": true,
    //   "requestLargePrint": true,
    //   "requestAudio": true,
    //   "requestSignLanguage": true,
    //   "requestTypeTalk": true,
    //   "requestTextphone": true,
    //   "textphoneNumber": "01 234567",
    //   "otherContactHelp": "string"
    // },
    partner: !isYes(d.liveWithPartner) ? undefined : {
      // "nino": "CW123456C",
      // "fullName": "Mr Somebody",
      // "otherNames": "Mr Somebody-Else",
      // "sightImpairedBlind": true,
      // "rightToWorkUk": true,
      // "permanentResidency": true
    },
    // "whereClaimantLives": {
    //   "livePermanentlyInCareHome": true,
    //   "ownPropertyUsedToLiveIn": true,
    //   "buildingAndStreet": "string",
    //   "townOrCity": "string",
    //   "county": "string",
    //   "postcode": "string",
    //   "uprn": "string",
    //   "contactBuildingAndStreet": "string",
    //   "contactTownOrCity": "string",
    //   "contactCounty": "string",
    //   "contactPostcode": "string",
    //   "contactUprn": "string",
    //   "othersLiveInHousehold": true,
    //   "othersNamesAndRelationships": "string",
    //   "responsibleForCouncilTax": true,
    //   "rentOrOwnProperty": "RENT",
    //   "rentOrOwnPropertyDescription": "string",
    //   "serviceCharges": true,
    //   "serviceChargesAmount": "string",
    //   "groundRent": true,
    //   "groundRentAmount": "string",
    //   "supportWithInterest": true,
    //   "shareRentOrMortgage": true,
    //   "receiveHousingBenefit": true,
    //   "wantsToApplyForHousingBenefit": true
    // },
    // "pensions": {
    //   "privatePension": true,
    //   "privatePensionDescription": "string"
    // },
    // "benefits": {
    //   "pendingBenefits": true,
    //   "pendingBenefitsDescription": "string",
    //   "benefitsForLookingAfterClaimant": true
    // },
    // "moneySavingsInvestments": {
    //   "moneyAmount": "3500.0",
    //   "secondProperty": true,
    //   "benefitArrears": true,
    //   "benefitArrearsDetails": "string",
    //   "councilTaxArrears": true,
    //   "councilTaxArrearsDetails": "string",
    //   "secondWorldWar": true,
    //   "secondWorldWarDetails": "string",
    //   "personalInjury": true,
    //   "personalInjuryDetails": "string",
    //   "homeInsurance": true,
    //   "homeInsuranceDetails": "string",
    //   "essentialRepairs": true,
    //   "essentialRepairsDetails": "string",
    //   "independentLiving": true,
    //   "independentLivingDetails": "string",
    //   "incidentEmergency": true,
    //   "incidentEmergencyDetails": "string",
    //   "windrush": true,
    //   "windrushDetails": "string",
    //   "bloodInfection": true,
    //   "bloodInfectionDetails": "string"
    // },
    habitualResidencyTest: !traversed(WP.HRT_CITIZEN_RETURNED_TO_UK) ? undefined : {
      // cameToUk: isYes(d.cameToUk),
      // ...(!traversed(WP.HRT_CITIZEN_NATIONALITY_DETAILS) ? {} : {
      //   nationality: d.nationality,
      //   country: d.country,
      //   lastCameToUK: toDate(d.lastCameToUK),
      //   cameToUkToWork: isYes(d.cameToUkToWork),
      //   noRecourseToPublicFunds: isYes(d.noRecourseToPublicFunds),
      //   livedInUkBefore: isYes(d.livedInUkBefore),
      //   lastLeftUK: !isYes(d.livedInUkBefore) ? undefined : toDate(d.lastLeftUK),
      //   familyReunionScheme: isYes(d.familyReunionScheme),
      // }),
      // sponsorshipUndertaking: isYes(d.sponsorshipUndertaking),
      // ...(!traversed(WP.HRT_CITIZEN_SPONSORSHIP_DETAILS) ? {} : {
      //   sponsorName: d.sponsorName,
      //   homeOfficeReference: d.homeOfficeReference,
      //   sponsorshipUndertakingSigned: toDate(d.sponsorshipUndertakingSigned),
      // }),
      // // TODO: Sponsor's address; see data model on confluence for rules
      // asylumSeeker: isYes(d.asylumSeeker),
      // asylumBefore3April2000: !isYes(d.asylumSeeker) ? undefined : isYes(d.asylumBefore3April2000),
      // successfulDecision: !isYes(d.asylumSeeker) ? undefined : isYes(d.successfulDecision),
      // successfulDecisionDate: !isYes(d.successfulDecision) ? undefined : toDate(d.successfulDecisionDate),
      // supportedByHomeOffice: !isYes(d.asylumSeeker) ? undefined : isYes(d.supportedByHomeOffice),
      // // TODO: Partner HRT
    },
    // "income": {
    //   "employedPaidWork": true,
    //   "employedPaidWorkDescription": "string",
    //   "selfEmployedPaidWork": true,
    //   "selfEmployedPaidWorkDescription": "string",
    //   "earnOtherMoney": true,
    //   "earnOtherMoneyDescription": "string"
    // }
  };
};
