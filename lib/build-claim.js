/* eslint-disable max-len */
const SecureJSON = require('secure-json-parse');
const getEarliestEntitlementDate = require('../utils/get-earliest-entitlement-date.js');
const getOfferedDateOfClaim = require('../utils/get-offered-date-of-claim.js');
const getSelfEmploymentVars = require('../utils/get-self-employment-vars.js');
const sanitiseNino = require('../utils/sanitise-nino.js');
const sanitiseMoney = require('../utils/sanitise-money.js');
const formatPostcode = require('../utils/format-postcode.js');
const needToBackdate = require('../utils/need-to-backdate.js');
const toDate = require('../utils/date-object-to-iso-string.js');
const daSuffix = require('../utils/delegated-authority-suffix.js');
const { waypoints: WP, whoMadeClaim: WMC, userTypes: UT } = require('./constants.js');

const isYes = (value) => value === 'yes';

const isSelected = (source, value) => (Array.isArray(source) ? source.includes(value) : false);

const hasPartner = (value) => ['yesLiveTogether', 'yesLiveApart'].includes(value);

const isLivingWithPartner = (value) => value === 'yesLiveTogether';

const buildingAndStreet = (data = {}) => `${data.addressLine1}${data.addressLine2 ? `, ${data.addressLine2}` : ''}`;

const getPeriodsAbroadEnum = (periodsAbroad) => ({
  one: 'ONE',
  moreThanOne: 'MORE_THAN_ONE',
}[periodsAbroad]);

const getLanguageEnum = (langCode) => ({
  en: 'ENGLISH',
  cy: 'WELSH',
}[langCode] || 'ENGLISH');

const getContactLanguageEnum = (lang) => ({
  english: 'ENGLISH',
  welsh: 'WELSH',
  other: 'OTHER',
}[lang]);

const getContactAddressEnum = (letterAddress) => ({
  homeAddress: 'HOME_ADDRESS',
  differentAddress: 'CONTACT_ADDRESS',
}[letterAddress]);

const getOwnershipEnum = (homeOwnership) => ({
  own: 'OWN',
  rent: 'RENT',
  other: 'OTHER',
  sharedOwnership: 'SHARED_OWNERSHIP',
}[homeOwnership]);

const getWhoMadeClaimEnum = (whoMadeClaim) => ({
  [WMC.CLAIMANT]: 'APPLICANT',
  [WMC.POWER_OF_ATTORNEY]: 'POWER_OF_ATTORNEY',
  [WMC.APPOINTEE]: 'APPOINTEE',
  [WMC.PERSONAL_ACTING_BODY]: 'PERSONAL_ACTING_BODY',
  [WMC.CORPORATE_ACTING_BODY]: 'CORPORATE_ACTING_BODY',
  [WMC.CHARITY]: 'HELPER_CHARITY',
  [WMC.FRIEND_OR_FAMILY]: 'HELPER_FAMILY_OR_FRIEND',
  [WMC.SOMEONE_ELSE]: 'SOMEONE_ELSE',
}[whoMadeClaim]);

module.exports = (plan, context, language = 'en') => {
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
    WP.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN,
    WP.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN,
  ];
  Object.keys(WP).filter((wp) => !exclusions.includes(wp)).forEach((wp) => {
    d = { ...d, ...context.getDataForPage(WP[wp]) };
  });
  const dContactFormats = context.getDataForPage(WP.CONTACT_FORMATS) || {};
  const dHomeAddress = context.getDataForPage(WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN) || { address: {} };
  const dLettersAddress = context.getDataForPage(WP.LETTERS_ADDRESS_HIDDEN) || { address: {} };
  const dCitizenSponserAddress = context.getDataForPage(WP.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN) || { address: {} };
  const dPartnerSponserAddress = context.getDataForPage(WP.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN) || { address: {} };
  const userType = daSuffix(d.whoMadeClaim);
  const offeredDateOfClaim = getOfferedDateOfClaim(context);
  const { selfEmployedEarningsDate } = getSelfEmploymentVars(context);

  // Ensure disregardedMoney is empty array if no checkboxes were checked
  d.disregardedMoney = d.disregardedMoney ? d.disregardedMoney : [];

  // Build the claim object
  let claim = Object.assign(Object.create(null), {
    applicationDate: d.applicationDate,
    whoIsMakingClaim: getWhoMadeClaimEnum(d.whoMadeClaim),
    relationshipToApplicant: d.whoMadeClaim !== WMC.SOMEONE_ELSE ? undefined : d.relationship,
    earliestEntitlementDate: getEarliestEntitlementDate(context),
    ...(!traversed(WP.ABROAD) ? {} : {
      outsideUk: isYes(d.abroadMoreThan4Weeks),
      outsideUkPeriods: isYes(d.abroadMoreThan4Weeks) ? getPeriodsAbroadEnum(d.periodsAbroad) : undefined,
      outsideUkMedical: isYes(d.abroadMoreThan4Weeks) ? isYes(d.periodAbroadForMedical) : undefined,
      ...(!traversed(WP.DATES_ABROAD) ? {} : {
        outsideUkStartDate: toDate(d.dateYouLeft),
        outsideUkEndDate: toDate(d.dateYouReturned),
      }),
    }),
    ...(!traversed(WP.OFFERED_CLAIM_DATE) ? {} : {
      // Only set this value if they saw the offered-claim-date page
      offeredDateOfClaim,
      offeredDateOfClaimAccepted: isYes(d.acceptClaimDate),
      requestedDateOfClaim: isYes(d.acceptClaimDate) ? undefined : toDate(d.differentClaimDate),
    }),
    ...(userType !== UT.DELEGATED_AUTHORITY ? {} : {
      delegatedAuthority: {
        fullName: d.contactName,
        corporateId: d.whoMadeClaim === WMC.CORPORATE_ACTING_BODY ? d.contactID : undefined,
        nino: d.whoMadeClaim !== WMC.CORPORATE_ACTING_BODY ? sanitiseNino(d.contactNino) : undefined,
        contactTelephoneCanCall: isYes(d.canWeCall),
        contactTelephone: isYes(d.canWeCall) ? d.contactTelephone : undefined,
        contactLanguage: getContactLanguageEnum(d.preferredLanguage),
        contactLanguageOther: d.preferredLanguage === 'other' ? d.preferredLanguageOther : undefined,
        contactDifferentFormat: isYes(d.needsDifferentFormats),
        requestBraille: isSelected(dContactFormats.contactFormats, 'braille'),
        requestLargePrint: isSelected(dContactFormats.contactFormats, 'largePrint'),
        requestAudio: isSelected(dContactFormats.contactFormats, 'audio'),
        requestTypeTalk: isSelected(dContactFormats.contactFormats, 'typeTalk'),
        requestTextphone: isSelected(dContactFormats.contactFormats, 'textPhone'),
        textphoneNumber: isSelected(dContactFormats.contactFormats, 'textPhone') ? dContactFormats.textPhoneNumber : undefined,
        otherContactHelp: isSelected(dContactFormats.contactFormats, 'other') ? dContactFormats.otherDetails : undefined,
        // Contact address
        ...(dLettersAddress.addressFrom === 'select' ? {
          buildingAndStreet: dLettersAddress.completeAddressLine,
          postcode: formatPostcode(dLettersAddress.address.postcode || ''),
          uprn: dLettersAddress.uprn,
        } : {
          buildingAndStreet: buildingAndStreet(dLettersAddress.address),
          townOrCity: dLettersAddress.address.town,
          county: dLettersAddress.address.county,
          postcode: formatPostcode(dLettersAddress.address.postcode || ''),
        }),
      },
    }),
    claimLanguage: getLanguageEnum(language),
    nino: sanitiseNino(d.nino),
    dateOfBirth: toDate(d.dateOfBirth),
    eligibility: {
      statePensionClaimed: isYes(d.statePensionClaimed),
      hasChildren: isYes(d.hasChildren),
      hasPartner: hasPartner(d.havePartner),
      liveWithPartner: isLivingWithPartner(d.havePartner),
      partnerAgreement: !isLivingWithPartner(d.havePartner) ? undefined : isYes(d.partnerAgree),
      partnerDateOfBirth: !isLivingWithPartner(d.havePartner) ? undefined : toDate(d.partnerDateOfBirth),
      partnerPensionAgeHousingBenefit: !traversed(WP.PARTNER_HOUSING_BENEFIT) ? undefined : isYes(d.partnerGetsHousingBenefit),
    },
    claimant: {
      rightToWorkUk: isYes(d.rightToReside),
      permanentResidency: isYes(d.lived2Years),
      claimantFullName: d.fullName,
      claimantPreviousNames: !isYes(d.hasPreviousNames) ? undefined : d.previousNames,
      sightImpairedBlind: isYes(d.registeredBlind),
      ...(userType === UT.DELEGATED_AUTHORITY ? {} : {
        contactTelephoneCanCall: isYes(d.canWeCall),
        contactTelephone: isYes(d.canWeCall) ? d.contactTelephone : undefined,
        contactLanguage: getContactLanguageEnum(d.preferredLanguage),
        contactLanguageOther: d.preferredLanguage === 'other' ? d.preferredLanguageOther : undefined,
        contactDifferentFormat: isYes(d.needsDifferentFormats),
        requestBraille: isSelected(dContactFormats.contactFormats, 'braille'),
        requestLargePrint: isSelected(dContactFormats.contactFormats, 'largePrint'),
        requestAudio: isSelected(dContactFormats.contactFormats, 'audio'),
        requestTypeTalk: isSelected(dContactFormats.contactFormats, 'typeTalk'),
        requestTextphone: isSelected(dContactFormats.contactFormats, 'textPhone'),
        textphoneNumber: isSelected(dContactFormats.contactFormats, 'textPhone') ? dContactFormats.textPhoneNumber : undefined,
        otherContactHelp: isSelected(dContactFormats.contactFormats, 'other') ? dContactFormats.otherDetails : undefined,
      }),
    },
    partner: !isLivingWithPartner(d.havePartner) ? undefined : {
      nino: sanitiseNino(d.partnerNino),
      fullName: d.partnerFullName,
      otherNames: !isYes(d.partnerHasPreviousNames) ? undefined : d.partnerPreviousNames,
      sightImpairedBlind: isYes(d.partnerRegisteredBlind),
      rightToWorkUk: isYes(d.partnerRightToReside),
      permanentResidency: isYes(d.partnerLived2Years),
    },
    whereClaimantLives: {
      countryOfResidence: d.countryOfResidence,
      livePermanentlyInCareHome: isYes(d.permanentlyInCareHome),
      ownPropertyUsedToLiveIn: !isYes(d.permanentlyInCareHome) ? undefined : isYes(d.stillOwnsHome),
      // Home address
      ...(dHomeAddress.addressFrom === 'select' ? {
        buildingAndStreet: dHomeAddress.completeAddressLine,
        postcode: formatPostcode(dHomeAddress.address.postcode || ''),
        uprn: dHomeAddress.uprn,
      } : {
        buildingAndStreet: buildingAndStreet(dHomeAddress.address),
        townOrCity: dHomeAddress.address.town,
        county: dHomeAddress.address.county,
        postcode: formatPostcode(dHomeAddress.address.postcode || ''),
      }),
      // Other questions only asked if claimant is not in a care home
      ...(isYes(d.permanentlyInCareHome) ? {} : {
        othersLiveInHousehold: isYes(d.othersLiveWithYou),
        othersNamesAndRelationships: !isYes(d.othersLiveWithYou) ? undefined : d.othersLiveWithYouDetails,
        responsibleForCouncilTax: isYes(d.responsibleForCouncilTax),
        rentOrOwnProperty: d.homeOwnership ? getOwnershipEnum(d.homeOwnership) : undefined,
        rentOrOwnPropertyDescription: d.homeOwnership === 'other' ? d.homeDescription : undefined,
        serviceCharges: traversed(WP.SERVICE_CHARGES) ? isYes(d.paysServiceCharges) : undefined,
        groundRent: isYes(d.paysGroundRent),
        lease21YearsOrMore: traversed(WP.TWENTY_ONE_YEAR_LEASE) ? isYes(d.twentyOneYearLease) : undefined,
        receiveHousingBenefit: traversed(WP.HOUSING_BENEFIT) ? isYes(d.getsHousingBenefit) : undefined,
        wantsToApplyForHousingBenefit: traversed(WP.HOUSING_BENEFIT) && !isYes(d.getsHousingBenefit) ? isYes(d.wantsHousingBenefit) : undefined,
        supportWithInterest: traversed(WP.HOME_LOAN) ? isYes(d.wantsSMI) : undefined,
        shareRentOrMortgage: isYes(d.shareRentMortgage),
      }),
      correspondenceAddress: userType !== UT.DELEGATED_AUTHORITY ? getContactAddressEnum(d.letterAddress) : undefined,
      // Contact address
      ...((d.letterAddress === 'differentAddress') && (dLettersAddress.addressFrom === 'select' ? {
        contactBuildingAndStreet: dLettersAddress.completeAddressLine,
        contactPostcode: formatPostcode(dLettersAddress.address.postcode || ''),
        contactUprn: dLettersAddress.uprn,
      } : {
        contactBuildingAndStreet: buildingAndStreet(dLettersAddress.address),
        contactTownOrCity: dLettersAddress.address.town,
        contactCounty: dLettersAddress.address.county,
        contactPostcode: formatPostcode(dLettersAddress.address.postcode || ''),
      })),
    },
    benefits: {
      pendingBenefits: isYes(d.waitingToHearAboutBenefits),
      pendingBenefitsDescription: !isYes(d.waitingToHearAboutBenefits) ? undefined : d.benefitsDetails,
      benefitsForLookingAfterClaimant: isYes(d.anyoneGetCarers),
    },
    income: {
      employedPaidWork: isYes(d.hasEmploymentIncome),
      selfEmployedPaidWorkSince: selfEmployedEarningsDate,
      selfEmployedPaidWork: isYes(d.hasSelfEmploymentIncome),
      earnOtherMoney: isYes(d.hasOtherIncome),
      earnOtherMoneyDescription: !isYes(d.hasOtherIncome) ? undefined : d.otherIncomeDetails,
    },
    moneySavingsInvestments: {
      moneyAmount: !d.moneyToday ? undefined : sanitiseMoney(d.moneyToday),
      moneyBackdatedAmount: !needToBackdate(context) ? undefined : sanitiseMoney(d.moneyBackdated),
      secondProperty: isYes(d.hasSecondProperty),
      ...(!traversed(WP.DISREGARDED_MONEY) ? {} : {
        benefitArrears: d.disregardedMoney.includes('officialError'),
        benefitArrearsDetails: !d.disregardedMoney.includes('officialError') ? undefined : d.officialErrorDetails,
        councilTaxArrears: d.disregardedMoney.includes('councilTaxReduction'),
        councilTaxArrearsDetails: !d.disregardedMoney.includes('councilTaxReduction') ? undefined : d.councilTaxReductionDetails,
        secondWorldWar: d.disregardedMoney.includes('armedForces'),
        secondWorldWarDetails: !d.disregardedMoney.includes('armedForces') ? undefined : d.armedForcesDetails,
        personalInjury: d.disregardedMoney.includes('personalInjury'),
        personalInjuryDetails: !d.disregardedMoney.includes('personalInjury') ? undefined : d.personalInjuryDetails,
        homeInsurance: d.disregardedMoney.includes('homeInsurance'),
        homeInsuranceDetails: !d.disregardedMoney.includes('homeInsurance') ? undefined : d.homeInsuranceDetails,
        essentialRepairs: d.disregardedMoney.includes('homeRepairs'),
        essentialRepairsDetails: !d.disregardedMoney.includes('homeRepairs') ? undefined : d.homeRepairsDetails,
        independentLiving: d.disregardedMoney.includes('liveIndependent'),
        independentLivingDetails: !d.disregardedMoney.includes('liveIndependent') ? undefined : d.liveIndependentDetails,
        incidentEmergency: d.disregardedMoney.includes('incident'),
        incidentEmergencyDetails: !d.disregardedMoney.includes('incident') ? undefined : d.incidentDetails,
        windrush: d.disregardedMoney.includes('windrush'),
        windrushDetails: !d.disregardedMoney.includes('windrush') ? undefined : d.windrushDetails,
        bloodInfection: d.disregardedMoney.includes('blood'),
        bloodInfectionDetails: !d.disregardedMoney.includes('blood') ? undefined : d.bloodDetails,
        incomeOrCapitalBonds: isYes(d.hasIncomeOrCapitalBonds),
      }),
    },
    habitualResidencyTest: !traversed(WP.HRT_CITIZEN_RETURNED_TO_UK) && !traversed(WP.HRT_PARTNER_RETURNED_TO_UK) ? undefined : {
      // Citizen
      ...(!traversed(WP.HRT_CITIZEN_RETURNED_TO_UK) ? {} : {
        cameToUk: isYes(d.cameToUk),
        ...(!traversed(WP.HRT_CITIZEN_NATIONALITY_DETAILS) ? {} : {
          nationality: d.nationality,
          country: d.country,
          lastCameToUk: toDate(d.lastCameToUk),
          cameToUkToWork: isYes(d.cameToUkToWork),
          noRecourseToPublicFunds: isYes(d.noRecourseToPublicFunds),
          livedInUkBefore: isYes(d.livedInUkBefore),
          lastLeftUk: !isYes(d.livedInUkBefore) ? undefined : toDate(d.lastLeftUk),
          familyReunionScheme: isYes(d.familyReunionScheme),
        }),
        sponsorshipUndertaking: isYes(d.sponsorshipUndertaking),
        ...(!traversed(WP.HRT_CITIZEN_SPONSORSHIP_DETAILS) ? {} : {
          sponsorName: d.sponsorName,
          homeOfficeReference: d.homeOfficeReference,
          sponsorshipUndertakingSigned: toDate(d.sponsorshipUndertakingSigned),
          // Citizen's sponsor's address
          ...(dCitizenSponserAddress.addressFrom === 'select' ? {
            sponsorBuildingAndStreet: dCitizenSponserAddress.completeAddressLine,
            sponsorPostcode: formatPostcode(dCitizenSponserAddress.address.postcode || ''),
            sponsorUprn: dCitizenSponserAddress.uprn,
          } : {
            sponsorBuildingAndStreet: buildingAndStreet(dCitizenSponserAddress.address),
            sponsorTownOrCity: dCitizenSponserAddress.address.town,
            sponsorCounty: dCitizenSponserAddress.address.county,
            sponsorPostcode: formatPostcode(dCitizenSponserAddress.address.postcode || ''),
          }),
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
          partnerLastCameToUk: toDate(d.partnerLastCameToUk),
          partnerCameToUkToWork: isYes(d.partnerCameToUkToWork),
          partnerNoRecourseToPublicFunds: isYes(d.partnerNoRecourseToPublicFunds),
          partnerLivedInUkBefore: isYes(d.partnerLivedInUkBefore),
          partnerLastLeftUk: !isYes(d.partnerLivedInUkBefore) ? undefined : toDate(d.partnerLastLeftUk),
          partnerReunionScheme: isYes(d.partnerFamilyReunionScheme),
        }),
        partnerSponsorshipUndertaking: isYes(d.partnerSponsorshipUndertaking),
        ...(!traversed(WP.HRT_PARTNER_SPONSORSHIP_DETAILS) ? {} : {
          partnerSponsorName: d.partnerSponsorName,
          partnerHomeOfficeReference: d.partnerHomeOfficeReference,
          partnerSponsorshipUndertakingSigned: toDate(d.partnerSponsorshipUndertakingSigned),
          // Partner's sponsor's address
          ...(dPartnerSponserAddress.addressFrom === 'select' ? {
            partnerSponsorBuildingAndStreet: dPartnerSponserAddress.completeAddressLine,
            partnerSponsorPostcode: formatPostcode(dPartnerSponserAddress.address.postcode || ''),
            partnerSponsorUprn: dPartnerSponserAddress.uprn,
          } : {
            partnerSponsorBuildingAndStreet: buildingAndStreet(dPartnerSponserAddress.address),
            partnerSponsorTownOrCity: dPartnerSponserAddress.address.town,
            partnerSponsorCounty: dPartnerSponserAddress.address.county,
            partnerSponsorPostcode: formatPostcode(dPartnerSponserAddress.address.postcode || ''),
          }),
        }),
        partnerAsylumSeeker: isYes(d.partnerAsylumSeeker),
        partnerAsylumBefore3April2000: !isYes(d.partnerAsylumSeeker) ? undefined : isYes(d.partnerAsylumBefore3April2000),
        partnerSuccessfulDecision: !isYes(d.partnerAsylumSeeker) ? undefined : isYes(d.partnerSuccessfulDecision),
        partnerSuccessfulDecisionDate: !isYes(d.partnerSuccessfulDecision) ? undefined : toDate(d.partnerSuccessfulDecisionDate),
        partnerSupportedByHomeOffice: !isYes(d.partnerAsylumSeeker) ? undefined : isYes(d.partnerSupportedByHomeOffice),
      }),
    },
    claimingUniversalCredit: isYes(d.claimsUniversalCredit),
  });

  // Date of claim is what the user requested OR what we could have offered them
  // (even if they didn't see offered-claim-date page, eg. advanced claims)
  claim.dateOfClaim = claim.requestedDateOfClaim || offeredDateOfClaim || undefined;

  // This purges any "undefined" attributes
  claim = SecureJSON.parse(JSON.stringify(claim));

  // Some convenient inspector methods
  Object.defineProperty(claim, 'hasPartner', {
    value: () => (claim.eligibility && claim.eligibility.hasPartner),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'liveWithPartner', {
    value: () => (claim.eligibility && claim.eligibility.liveWithPartner),
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

  Object.defineProperty(claim, 'ownsAdditionalProperty', {
    value: () => (
      (claim.permanentlyInCareHome() && claim.whereClaimantLives.ownPropertyUsedToLiveIn)
      || (claim.moneySavingsInvestments && claim.moneySavingsInvestments.secondProperty)
    ),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'askedAboutDisregards', {
    value: () => traversed(WP.DISREGARDED_MONEY),
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

  Object.defineProperty(claim, 'isNorthernIrelandClaim', {
    value: () => (claim.whereClaimantLives.countryOfResidence === 'NORTHERN_IRELAND'),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'userIsSomeoneElse', {
    value: () => (claim.whoIsMakingClaim === 'SOMEONE_ELSE'),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'userIsCorporateActingBody', {
    value: () => (claim.whoIsMakingClaim === 'CORPORATE_ACTING_BODY'),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'userIsDelegatedAuthority', {
    value: () => (userType === UT.DELEGATED_AUTHORITY),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'hasSeparateContactAddress', {
    value: () => (claim.whereClaimantLives.correspondenceAddress === 'CONTACT_ADDRESS'),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'moreThanOnePeriodAbroad', {
    value: () => (claim.outsideUkPeriods === 'MORE_THAN_ONE'),
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'abroadForMedical', {
    value: () => claim.outsideUkMedical,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'hasBonds', {
    value: () => claim.moneySavingsInvestments.incomeOrCapitalBonds,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  Object.defineProperty(claim, 'selfEmployed', {
    value: () => claim.income.selfEmployedPaidWork,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return claim;
};
