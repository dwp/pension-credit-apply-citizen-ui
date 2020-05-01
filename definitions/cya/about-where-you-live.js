/* eslint-disable sonarjs/no-duplicate-string */
const formatMoney = require('../../utils/format-money.js');
const { waypoints: WP } = require('../../lib/constants.js');
const {
  rowFactory, radioOptionValue, formatAddress, safeNl2br,
} = require('./utils.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.whereClaimantLives === undefined) {
    return undefined;
  }

  const { hasPartner } = claim.eligibility || {};
  const jointSingle = hasPartner ? 'Joint' : 'Single';

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);
  const homeAddress = context.getDataForPage(WP.WHERE_YOU_LIVE_ADDRESS_HIDDEN) || {};
  const lettersAddress = context.getDataForPage(WP.LETTERS_ADDRESS_HIDDEN) || {};

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

    /* ------------------------------------------------------- letters-home */
    // Can we send letters to your home address?
    row({
      changeHref: `${WP.LETTERS_HOME}#f-sendLettersToHome`,
      changeHtml: t('letters-home:field.sendLettersToHome.change'),
      key: t('letters-home:pageTitle'),
      value: rov('letters-home.sendLettersToHome', 'letters-home:field.sendLettersToHome.options'),
    }),

    /* ---------------------------------------------------- letters address */
    // The address we should send letters to
    !claim.whereClaimantLives.homeAddressForCorrespondence && row({
      changeHref: lettersAddress.addressFrom === 'select'
        ? `${WP.LETTERS_ADDRESS_SELECT}#f-uprn`
        : `${WP.LETTERS_ADDRESS_MANUAL}#f-addressLine1`,
      changeHtml: t('check-your-answers:lettersAddress.change'),
      key: t('check-your-answers:lettersAddress.label'),
      valueHtml: formatAddress(lettersAddress.address),
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

    /* --------------------------------------------------- rent-council-tax */
    // Are you responsible for paying the rent, Council Tax or both for the
    // place where you live?
    row({
      changeHref: `${WP.RENT_COUNCIL_TAX}#f-responsibleForCouncilTax`,
      changeHtml: t('rent-council-tax:field.responsibleForCouncilTax.change'),
      key: t(`rent-council-tax:pageTitle${jointSingle}`),
      value: rov('rent-council-tax.responsibleForCouncilTax', 'rent-council-tax:field.responsibleForCouncilTax.options'),
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
    row({
      changeHref: `${WP.SERVICE_CHARGES}#f-paysServiceCharges`,
      changeHtml: t('service-charges:field.paysServiceCharges.change'),
      key: t('service-charges:field.paysServiceCharges.legend'),
      value: rov('service-charges.paysServiceCharges', 'service-charges:field.paysServiceCharges.options'),
    }),

    // How much do you pay in service charges each month?
    claim.whereClaimantLives.serviceCharges && row({
      changeHref: `${WP.SERVICE_CHARGES}#f-serviceChargesAmount`,
      changeHtml: t('service-charges:field.serviceChargesAmount.change'),
      key: t('service-charges:field.serviceChargesAmount.label'),
      value: formatMoney(claim.whereClaimantLives.serviceChargesAmount),
    }),

    // Do you pay ground rent?
    row({
      changeHref: `${WP.SERVICE_CHARGES}#f-paysGroundRent`,
      changeHtml: t('service-charges:field.paysGroundRent.change'),
      key: t('service-charges:field.paysGroundRent.legend'),
      value: rov('service-charges.paysGroundRent', 'service-charges:field.paysGroundRent.options'),
    }),

    // How much do you pay in service charges each month?
    claim.whereClaimantLives.groundRent && row({
      changeHref: `${WP.SERVICE_CHARGES}#f-groundRentAmount`,
      changeHtml: t('service-charges:field.groundRentAmount.change'),
      key: t('service-charges:field.groundRentAmount.label'),
      value: formatMoney(claim.whereClaimantLives.groundRentAmount),
    }),

    // Do you get Housing Benefit?
    row({
      changeHref: `${WP.SERVICE_CHARGES}#f-getsHousingBenefit`,
      changeHtml: t('service-charges:field.getsHousingBenefit.change'),
      key: t('service-charges:field.getsHousingBenefit.legend'),
      value: rov('service-charges.getsHousingBenefit', 'service-charges:field.getsHousingBenefit.options'),
    }),

    // Do you want to apply for Housing Benefit?
    !claim.whereClaimantLives.receiveHousingBenefit && row({
      changeHref: `${WP.SERVICE_CHARGES}#f-wantsHousingBenefit`,
      changeHtml: t('service-charges:field.wantsHousingBenefit.change'),
      key: t('service-charges:field.wantsHousingBenefit.legend'),
      value: rov('service-charges.wantsHousingBenefit', 'service-charges:field.wantsHousingBenefit.options'),
    }),

    /* ---------------------------------------------------------- home-loan */
    // Do you want to apply for support with interest on a mortgage or loan
    // secured against your home?
    row({
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
      key: t(`share-rent-mortgage:pageTitle${jointSingle}`),
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
