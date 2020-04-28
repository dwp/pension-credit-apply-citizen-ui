/* eslint-disable max-len */
const SecureJSON = require('secure-json-parse');
const formatPostcode = require('../utils/format-postcode.js');
const toDate = require('../utils/date-object-to-iso-string.js');
const { waypoints: WP } = require('./constants.js');

const isYes = (value) => value === 'yes';

const isSelected = (source = [], value) => (Array.isArray(source) ? source.includes(value) : false);

const buildingAndStreet = (data = {}) => `${data.addressLine1}${data.addressLine2 ? `, ${data.addressLine2}` : ''}`;

module.exports = (plan, context) => {
  // Build a list of traversed waypoints to help decide which attributes to
  // include in the claim dataset
  const traversedWaypoints = plan.traverse(context);
  const traversed = traversedWaypoints.includes.bind(traversedWaypoints);

  // Most field names are unique throughout the waypoints, so can be lifted to a
  // single-depth object for simpler reading. For those that duplicate, add
  // them to exclusions and inject their values into `d` some other way.
  let d = {};
  const exclusions = [
    WP.CONTACT_FORMATS,
    WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN,
    WP.LETTERS_ADDRESS_HIDDEN,
  ];
  Object.keys(WP).filter((wp) => !exclusions.includes(wp)).forEach((wp) => {
    d = { ...d, ...context.getDataForPage(WP[wp]) };
  });
  const dContactFormats = context.getDataForPage(WP.CONTACT_FORMATS) || {};
  const dHomeAddress = context.getDataForPage(WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN) || { address: {} };
  const dLettersAddress = context.getDataForPage(WP.LETTERS_ADDRESS_HIDDEN) || { address: {} };

  // Build the claim object
  let claim = Object.assign(Object.create(null), {
    nino: d.nino,
    dateOfBirth: toDate(d.dateOfBirth),
    dateOfClaim: toDate(d.dateOfClaim),
    helpMakingClaim: isYes(d.helpMakingClaim),
    eligibility: {
      statePensionClaimed: isYes(d.statePensionClaimed),
      hasChildren: isYes(d.hasChildren),
      hasPartner: isYes(d.liveWithPartner),
      partnerAgreement: !isYes(d.liveWithPartner) ? undefined : isYes(d.partnerAgree),
      partnerDateOfBirth: !isYes(d.liveWithPartner) ? undefined : toDate(d.partnerDateOfBirth),
      partnerPensionAgeHousingBenefit: !traversed(WP.PARTNER_HOUSING_BENEFIT) ? undefined : isYes(d.partnerGetsHousingBenefit),
    },
    claimant: {
      claimantFullName: d.fullName,
      claimantPreviousNames: !isYes(d.hasPreviousNames) ? undefined : d.previousNames,
      contactTelephone: d.contactTelephone,
      sightImpairedBlind: isYes(d.registeredBlind),
      ableToSpeakEnglish: isYes(d.canSpeakEnglish),
      firstLanguage: !isYes(d.canSpeakEnglish) ? undefined : d.firstLanguage,
      requestWelsh: isYes(d.speakInWelsh),
      phoneLetterHelpRequired: isYes(d.helpWithLettersPhone),
      requestBraille: isSelected(dContactFormats.contactFormats, 'braille'),
      requestLargePrint: isSelected(dContactFormats.contactFormats, 'largePrint'),
      requestAudio: isSelected(dContactFormats.contactFormats, 'audio'),
      requestSignLanguage: isSelected(dContactFormats.contactFormats, 'signLanguage'),
      requestTypeTalk: isSelected(dContactFormats.contactFormats, 'signLanguage'),
      requestTextphone: isSelected(dContactFormats.contactFormats, 'typeTalk'),
      textphoneNumber: dContactFormats.textPhoneNumber,
      otherContactHelp: isSelected(dContactFormats.contactFormats, 'other') ? dContactFormats.otherDetails : undefined,
    },
    partner: !isYes(d.liveWithPartner) ? undefined : {
      nino: d.partnerNino,
      fullName: d.partnerFullName,
      otherNames: !isYes(d.partnerHasPreviousNames) ? undefined : d.partnerPreviousNames,
      sightImpairedBlind: isYes(d.partnerRegisteredBlind),
      rightToWorkUk: isYes(d.partnerRightToReside),
      permanentResidency: isYes(d.partnerLived2Years),
    },
    whereClaimantLives: {
      livePermanentlyInCareHome: isYes(d.permanentlyInCareHome),
      ownPropertyUsedToLiveIn: !isYes(d.permanentlyInCareHome) ? undefined : isYes(d.stillOwnsHome),
      // Home address
      ...(dHomeAddress.addressFrom === 'select' ? {
        uprn: dHomeAddress.uprn,
      } : {
        buildingAndStreet: buildingAndStreet(dHomeAddress.address),
        townOrCity: dHomeAddress.address.town,
        county: dHomeAddress.address.county,
        postcode: formatPostcode(dHomeAddress.address.postcode || ''),
      }),
      homeAddressForCorrespondence: isYes(d.sendLettersToHome),
      // Contact address
      ...(!isYes(d.sendLettersToHome) && (dLettersAddress.addressFrom === 'select' ? {
        contactUprn: dLettersAddress.uprn,
      } : {
        contactBuildingAndStreet: buildingAndStreet(dLettersAddress.address),
        contactTownOrCity: dLettersAddress.address.town,
        contactCounty: dLettersAddress.address.county,
        contactPostcode: formatPostcode(dLettersAddress.address.postcode || ''),
      })),
      // Other questions only asked if claimant is not in a care home
      ...(isYes(d.permanentlyInCareHome) ? {} : {
        othersLiveInHousehold: isYes(d.othersLiveWithYou),
        othersNamesAndRelationships: !isYes(d.othersLiveWithYou) ? undefined : d.othersLiveWithYouDetails,
        responsibleForCouncilTax: isYes(d.responsibleForCouncilTax),
        rentOrOwnProperty: String(d.homeOwnership).toUpperCase(),
        rentOrOwnPropertyDescription: d.homeOwnership === 'other' ? d.homeDescription : undefined,
        serviceCharges: isYes(d.paysServiceCharges),
        serviceChargesAmount: !isYes(d.paysServiceCharges) ? undefined : d.serviceChargesAmount,
        groundRent: isYes(d.paysGroundRent),
        groundRentAmount: !isYes(d.paysGroundRent) ? undefined : d.groundRentAmount,
        receiveHousingBenefit: isYes(d.getsHousingBenefit),
        wantsToApplyForHousingBenefit: isYes(d.getsHousingBenefit) ? undefined : isYes(d.wantsHousingBenefit),
        supportWithInterest: isYes(d.wantsSMI),
        shareRentOrMortgage: isYes(d.shareRentMortgage),
      }),
    },
    pensions: {
      privatePension: isYes(d.hasPrivatePensions),
      privatePensionDescription: !isYes(d.hasPrivatePensions) ? undefined : d.privatePensionDetails,
    },
    benefits: {
      pendingBenefits: isYes(d.waitingToHearAboutBenefits),
      pendingBenefitsDescription: !isYes(d.waitingToHearAboutBenefits) ? undefined : d.benefitsDetails,
      benefitsForLookingAfterClaimant: isYes(d.anyoneGetCarers),
    },
    income: {
      employedPaidWork: isYes(d.hasEmploymentIncome),
      employedPaidWorkDescription: !isYes(d.hasEmploymentIncome) ? undefined : d.employmentIncomeDetails,
      selfEmployedPaidWork: isYes(d.hasSelfEmploymentIncome),
      selfEmployedPaidWorkDescription: !isYes(d.hasSelfEmploymentIncome) ? undefined : d.selfEmploymentIncomeDetails,
      earnOtherMoney: isYes(d.hasOtherIncome),
      earnOtherMoneyDescription: !isYes(d.hasOtherIncome) ? undefined : d.otherIncomeDetails,
    },
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
    habitualResidencyTest: !traversed(WP.HRT_CITIZEN_RETURNED_TO_UK) && !traversed(WP.HRT_PARTNER_RETURNED_TO_UK) ? undefined : {
      // Citizen
      ...(!traversed(WP.HRT_CITIZEN_RETURNED_TO_UK) ? {} : {
        cameToUk: isYes(d.cameToUk),
        ...(!traversed(WP.HRT_CITIZEN_NATIONALITY_DETAILS) ? {} : {
          nationality: d.nationality,
          country: d.country,
          lastCameToUK: toDate(d.lastCameToUK),
          cameToUkToWork: isYes(d.cameToUkToWork),
          noRecourseToPublicFunds: isYes(d.noRecourseToPublicFunds),
          livedInUkBefore: isYes(d.livedInUkBefore),
          lastLeftUK: !isYes(d.livedInUkBefore) ? undefined : toDate(d.lastLeftUK),
          familyReunionScheme: isYes(d.familyReunionScheme),
        }),
        sponsorshipUndertaking: isYes(d.sponsorshipUndertaking),
        ...(!traversed(WP.HRT_CITIZEN_SPONSORSHIP_DETAILS) ? {} : {
          sponsorName: d.sponsorName,
          homeOfficeReference: d.homeOfficeReference,
          sponsorshipUndertakingSigned: toDate(d.sponsorshipUndertakingSigned),
          // TODO: Sponsor's address; see data model on confluence for rules
        }),
        asylumSeeker: isYes(d.asylumSeeker),
        asylumBefore3April2000: !isYes(d.asylumSeeker) ? undefined : isYes(d.asylumBefore3April2000),
        successfulDecision: !isYes(d.asylumSeeker) ? undefined : isYes(d.successfulDecision),
        successfulDecisionDate: !isYes(d.successfulDecision) ? undefined : toDate(d.successfulDecisionDate),
        supportedByHomeOffice: !isYes(d.asylumSeeker) ? undefined : isYes(d.supportedByHomeOffice),
      }),

      // Partner
      ...(!traversed(WP.HRT_PARTNER_RETURNED_TO_UK) ? {} : {
        partnerCameToUk: isYes(d.partnerCameToUk),
        ...(!traversed(WP.HRT_PARTNER_NATIONALITY_DETAILS) ? {} : {
          partnerNationality: d.partnerNationality,
          partnerCountry: d.partnerCountry,
          partnerLastCameToUK: toDate(d.partnerLastCameToUK),
          partnerCameToUkToWork: isYes(d.partnerCameToUkToWork),
          partnerNoRecourseToPublicFunds: isYes(d.partnerNoRecourseToPublicFunds),
          partnerLivedInUkBefore: isYes(d.partnerLivedInUkBefore),
          partnerLastLeftUK: !isYes(d.partnerLivedInUkBefore) ? undefined : toDate(d.partnerLastLeftUK),
          partnerFamilyReunionScheme: isYes(d.partnerFamilyReunionScheme),
        }),
        partnerSponsorshipUndertaking: isYes(d.partnerSponsorshipUndertaking),
        ...(!traversed(WP.HRT_PARTNER_SPONSORSHIP_DETAILS) ? {} : {
          partnerSponsorName: d.partnerSponsorName,
          partnerHomeOfficeReference: d.partnerHomeOfficeReference,
          partnerSponsorshipUndertakingSigned: toDate(d.partnerSponsorshipUndertakingSigned),
          // TODO: Sponsor's address; see data model on confluence for rules
        }),
        partnerAsylumSeeker: isYes(d.partnerAsylumSeeker),
        partnerAsylumBefore3April2000: !isYes(d.partnerAsylumSeeker) ? undefined : isYes(d.partnerAsylumBefore3April2000),
        partnerSuccessfulDecision: !isYes(d.partnerAsylumSeeker) ? undefined : isYes(d.partnerSuccessfulDecision),
        partnerSuccessfulDecisionDate: !isYes(d.partnerSuccessfulDecision) ? undefined : toDate(d.partnerSuccessfulDecisionDate),
        partnerSupportedByHomeOffice: !isYes(d.partnerAsylumSeeker) ? undefined : isYes(d.partnerSupportedByHomeOffice),
      }),
    },
  });

  // This purges any "undefined" attributes
  claim = SecureJSON.parse(JSON.stringify(claim));

  // Some convenient inspector methods
  Object.defineProperty(claim, 'hasPartner', {
    value: () => (claim.eligibility && claim.eligibility.hasPartner),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'permanentlyInCareHome', {
    value: () => (claim.whereClaimantLives && claim.whereClaimantLives.livePermanentlyInCareHome),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'citizenHRTRequired', {
    value: () => traversed(WP.HRT_CITIZEN_RETURNED_TO_UK),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'partnerHRTRequired', {
    value: () => traversed(WP.HRT_PARTNER_RETURNED_TO_UK),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'citizenNationalityDetailsTaken', {
    value: () => (claim.habitualResidencyTest && claim.habitualResidencyTest.nationality !== undefined),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'partnerNationalityDetailsTaken', {
    value: () => (claim.habitualResidencyTest && claim.habitualResidencyTest.partnerNationality !== undefined),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'citizenHasHRTSponsor', {
    value: () => (claim.habitualResidencyTest && claim.habitualResidencyTest.sponsorName !== undefined),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'partnerHasHRTSponsor', {
    value: () => (claim.habitualResidencyTest && claim.habitualResidencyTest.partnerSponsorName !== undefined),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'citizenIsAsylumSeeker', {
    value: () => (claim.habitualResidencyTest && claim.habitualResidencyTest.asylumSeeker),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'partnerIsAsylumSeeker', {
    value: () => (claim.habitualResidencyTest && claim.habitualResidencyTest.partnerAsylumSeeker),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return claim;
};
