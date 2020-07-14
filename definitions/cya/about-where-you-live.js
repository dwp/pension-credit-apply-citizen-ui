/* eslint-disable sonarjs/no-duplicate-string */
const { waypoints: WP } = require('../../lib/constants.js');
const rentOrMortgage = require('../../utils/rent-or-mortgage.js');
const {
  rowFactory, radioOptionValue, formatAddress, safeNl2br,
} = require('./utils.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.whereClaimantLives === undefined) {
    return undefined;
  }

  const { liveWithPartner } = claim.eligibility || {};
  const jointSingle = liveWithPartner ? 'Joint' : 'Single';
  const paymentType = rentOrMortgage(context);
  const northernIreland = claim.isNorthernIrelandClaim() ? 'northernIreland.' : '';

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);
  const homeAddress = context.getDataForPage(WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN) || {};

  // Rows for home and contact addresses
  const addressRows = [
    /* ---------------------------------------------------------- care-home */
    // Do you live permanently in a care home?
    row({
      changeHref: `${WP.CARE_HOME}#f-permanentlyInCareHome`,
      changeHtml: t('care-home:field.permanentlyInCareHome.change'),
      key: t('care-home:pageTitle'),
      value: rov('care-home.permanentlyInCareHome', 'care-home:field.permanentlyInCareHome.options'),
    }),

    // Do you own the property you used to live in?
    claim.whereClaimantLives.permanentlyInCareHome && row({
      changeHref: `${WP.CARE_HOME}#f-stillOwnsHome`,
      changeHtml: t('care-home:field.stillOwnsHome.change'),
      key: t('care-home:pageTitle'),
      value: rov('care-home.stillOwnsHome', 'care-home:field.stillOwnsHome.options'),
    }),

    /* ------------------------------------------------------- home address */
    // Your home address
    row({
      changeHref: homeAddress.addressFrom === 'select'
        ? `${WP.WHERE_YOU_LIVE_ADDRESS_SELECT}#f-uprn`
        : `${WP.WHERE_YOU_LIVE_ADDRESS_MANUAL}#f-addressLine1`,
      changeHtml: t('check-your-answers:homeAddress.change'),
      key: t('check-your-answers:homeAddress.label'),
      valueHtml: formatAddress(homeAddress.address),
    }),
  ];

  // Rows for questions asked to claimants not in a care home
  const nonCareHomeRows = claim.permanentlyInCareHome() ? [] : [
    /* ----------------------------------------------------- lives-with-you */
    // Does anyone else live with you?
    row({
      changeHref: `${WP.LIVES_WITH_YOU}#f-othersLiveWithYou`,
      changeHtml: t('lives-with-you:field.othersLiveWithYou.change'),
      key: t(`lives-with-you:pageTitle${jointSingle}`),
      value: rov('lives-with-you.othersLiveWithYou', 'lives-with-you:field.othersLiveWithYou.options'),
    }),

    // Details of anyone else that lives with you
    claim.whereClaimantLives.othersLiveInHousehold && row({
      changeHref: `${WP.LIVES_WITH_YOU}#f-othersLiveWithYouDetails`,
      changeHtml: t('lives-with-you:field.othersLiveWithYouDetails.change'),
      key: t('check-your-answers:othersLiveWithYouDetails.label'),
      valueHtml: safeNl2br(claim.whereClaimantLives.othersNamesAndRelationships),
    }),

    /* --------------------------------------------- rent-council-tax-rates */
    // Are you responsible for paying the rent, Council Tax or both for the
    // place where you live?
    row({
      changeHref: `${WP.RENT_COUNCIL_TAX_RATES}#f-responsibleForCouncilTax`,
      changeHtml: t(`rent-council-tax-rates:${northernIreland}field.responsibleForCouncilTax.change`),
      key: t(`rent-council-tax-rates:${northernIreland}pageTitle${jointSingle}`),
      value: rov('rent-council-tax-rates.responsibleForCouncilTax', 'rent-council-tax-rates:field.responsibleForCouncilTax.options'),
    }),

    /* ----------------------------------------------------- home-ownership */
    // Which best describes the place where you live?
    row({
      changeHref: `${WP.HOME_OWNERSHIP}#f-homeOwnership`,
      changeHtml: t('home-ownership:field.homeOwnership.change'),
      key: t('home-ownership:pageTitle'),
      value: rov('home-ownership.homeOwnership', 'home-ownership:field.homeOwnership.options'),
    }),

    // Description of where you live
    claim.whereClaimantLives.rentOrOwnProperty === 'OTHER' && row({
      changeHref: `${WP.HOME_OWNERSHIP}#f-homeDescription`,
      changeHtml: t('home-ownership:field.homeDescription.change'),
      key: t('home-ownership:field.homeDescription.label'),
      valueHtml: safeNl2br(claim.whereClaimantLives.rentOrOwnPropertyDescription),
    }),

    /* ---------------------------------------------------- service-charges */
    // Do you pay any service charges?
    claim.whereClaimantLives.serviceCharges !== undefined && row({
      changeHref: `${WP.SERVICE_CHARGES}#f-paysServiceCharges`,
      changeHtml: t('service-charges:field.paysServiceCharges.change'),
      key: t('service-charges:pageTitle'),
      value: rov('service-charges.paysServiceCharges', 'service-charges:field.paysServiceCharges.options'),
    }),

    /* -------------------------------------------------------- ground-rent */
    // Do you pay ground rent?
    row({
      changeHref: `${WP.GROUND_RENT}#f-paysGroundRent`,
      changeHtml: t('ground-rent:field.paysGroundRent.change'),
      key: t('ground-rent:pageTitle'),
      value: rov('ground-rent.paysGroundRent', 'ground-rent:field.paysGroundRent.options'),
    }),

    /* ------------------------------------------------------ 21-year-lease */
    // Is the lease for your property or land for 21 years or more?
    claim.whereClaimantLives.lease21YearsOrMore !== undefined && row({
      changeHref: `${WP.TWENTY_ONE_YEAR_LEASE}#f-twentyOneYearLease`,
      changeHtml: t('21-year-lease:field.twentyOneYearLease.change'),
      key: t('21-year-lease:pageTitle'),
      value: rov('21-year-lease.twentyOneYearLease', '21-year-lease:field.twentyOneYearLease.options'),
    }),

    /* ---------------------------------------------------- housing-benefit */
    // Do you get Housing Benefit?
    claim.whereClaimantLives.receiveHousingBenefit !== undefined && row({
      changeHref: `${WP.HOUSING_BENEFIT}#f-getsHousingBenefit`,
      changeHtml: t('housing-benefit:field.getsHousingBenefit.change'),
      key: t('housing-benefit:pageTitle'),
      value: rov('housing-benefit.getsHousingBenefit', 'housing-benefit:field.getsHousingBenefit.options'),
    }),

    // Do you want to apply for Housing Benefit?
    claim.whereClaimantLives.wantsToApplyForHousingBenefit !== undefined && row({
      changeHref: `${WP.HOUSING_BENEFIT}#f-wantsHousingBenefit`,
      changeHtml: t('housing-benefit:field.wantsHousingBenefit.change'),
      key: t('housing-benefit:field.wantsHousingBenefit.legend'),
      value: rov('housing-benefit.wantsHousingBenefit', 'housing-benefit:field.wantsHousingBenefit.options'),
    }),

    /* ---------------------------------------------------------- home-loan */
    // Do you want to apply for support with interest on a mortgage or loan
    // secured against your home?
    claim.whereClaimantLives.supportWithInterest !== undefined && row({
      changeHref: `${WP.HOME_LOAN}#f-wantsSMI`,
      changeHtml: t('home-loan:field.wantsSMI.change'),
      key: t('home-loan:pageTitle'),
      value: rov('home-loan.wantsSMI', 'home-loan:field.wantsSMI.options'),
    }),

    /* ------------------------------------------------ share-rent-mortgage */
    // Do you share the rent or mortgage for the place where you live with
    // anyone?
    row({
      changeHref: `${WP.SHARE_RENT_MORTGAGE}#f-shareRentMortgage`,
      changeHtml: t('share-rent-mortgage:field.shareRentMortgage.change'),
      key: t(`share-rent-mortgage:pageTitle${paymentType}${jointSingle}`),
      value: rov('share-rent-mortgage.shareRentMortgage', 'share-rent-mortgage:field.shareRentMortgage.options'),
    }),
  ];

  return {
    heading: t('check-your-answers:sectionHeading.about-where-you-live'),
    rows: [
      ...addressRows,
      ...nonCareHomeRows,
    ],
  };
};
