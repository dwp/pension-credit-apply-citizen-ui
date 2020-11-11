/* eslint-disable sonarjs/no-duplicate-string */
const { rowFactory, radioOptionValue } = require('./utils.js');
const isoStringToDateObject = require('../../utils/iso-string-to-date-object.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.eligibility === undefined) {
    return undefined;
  }

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  // Common options for `formatDateObject()` calls
  const dateOpts = { locale: context.nav.language };

  const earliestEntitlementDate = formatDateObject(
    isoStringToDateObject(claim.earliestEntitlementDate),
    dateOpts,
  );

  const offeredDateOfClaim = claim.offeredDateOfClaim && formatDateObject(
    isoStringToDateObject(claim.offeredDateOfClaim),
    dateOpts,
  );

  const abroadMedicalSuffix = claim.moreThanOnePeriodAbroad() ? 'Plural' : '';

  return {
    heading: t('check-your-answers:sectionHeading.about-you'),
    rows: [
      /* ------------------------------------------------ country-you-live-in */
      // Do you live in England, Scotland or Wales?
      row({
        changeHref: `${WP.COUNTRY_YOU_LIVE_IN}#f-countryOfResidence`,
        changeHtml: t('country-you-live-in:field.countryOfResidence.change'),
        key: t('country-you-live-in:pageTitle'),
        value: rov('country-you-live-in.countryOfResidence', 'country-you-live-in:field.countryOfResidence.options'),
      }),

      /* ---------------------------------------------- claimed-state-pension */
      // Have you claimed your State Pension?
      row({
        changeHref: `${WP.CLAIMED_STATE_PENSION}#f-statePensionClaimed`,
        changeHtml: t('claimed-state-pension:field.statePensionClaimed.change'),
        key: t('claimed-state-pension:pageTitle'),
        value: rov('claimed-state-pension.statePensionClaimed', 'claimed-state-pension:field.statePensionClaimed.options'),
      }),

      /* ------------------------------------------- children-living-with-you */
      // Do any children or qualifying young people live with you?
      row({
        changeHref: `${WP.CHILDREN_LIVING_WITH_YOU}#f-hasChildren`,
        changeHtml: t('children-living-with-you:field.hasChildren.change'),
        key: t('children-living-with-you:pageTitle'),
        value: rov('children-living-with-you.hasChildren', 'children-living-with-you:field.hasChildren.options'),
      }),

      /* ------------------------------------------------------ date-of-birth */
      // What is your date of birth?
      row({
        changeHref: `${WP.DATE_OF_BIRTH}#f-dateOfBirth[dd]`,
        changeHtml: t('date-of-birth:field.dateOfBirth.change'),
        key: t('date-of-birth:pageTitle'),
        value: formatDateObject(context.data['date-of-birth'].dateOfBirth, dateOpts),
      }),

      /* ------------------------------------------------------------- abroad */
      // Have you been outside the UK for a period of more than four weeks since
      // ${earliestEntitlementDate}?
      claim.outsideUk === undefined ? undefined : row({
        changeHref: `${WP.ABROAD}#f-abroadMoreThan4Weeks`,
        changeHtml: t('abroad:field.abroadMoreThan4Weeks.change', { earliestEntitlementDate }),
        key: t('abroad:pageTitle', { earliestEntitlementDate }),
        value: rov('abroad.abroadMoreThan4Weeks', 'abroad:field.abroadMoreThan4Weeks.options'),
      }),

      /* ----------------------------------------------------- periods-abroad */
      // How many periods of more than 4 weeks have you spent outside the UK
      // since ${earliestEntitlementDate}?
      !claim.outsideUk ? undefined : row({
        changeHref: `${WP.PERIODS_ABROAD}#f-periodsAbroad`,
        changeHtml: t('periods-abroad:field.periodsAbroad.change', { earliestEntitlementDate }),
        key: t('periods-abroad:pageTitle', { earliestEntitlementDate }),
        value: rov('periods-abroad.periodsAbroad', 'periods-abroad:field.periodsAbroad.options'),
      }),

      /* ----------------------------------------------------- abroad-medical */
      // Was the period you spent outside the UK connected to medical treatment
      // or the death of a partner or child?
      !claim.outsideUk ? undefined : row({
        changeHref: `${WP.ABROAD_MEDICAL}#f-periodAbroadForMedical`,
        changeHtml: t(`abroad-medical:field.periodAbroadForMedical.change${abroadMedicalSuffix}`),
        key: t(`abroad-medical:pageTitle${abroadMedicalSuffix}`),
        value: rov('abroad-medical.periodAbroadForMedical', 'abroad-medical:field.periodAbroadForMedical.options'),
      }),

      /* ------------------------------------------------------- dates-abroad */
      // What were the dates of the period you spent outside the UK?
      claim.outsideUkStartDate === undefined ? undefined : row({
        changeHref: `${WP.DATES_ABROAD}#f-dateYouLeft[dd]`,
        changeHtml: t('dates-abroad:field.dateYouLeft.change'),
        key: t('dates-abroad:field.dateYouLeft.legend'),
        value: formatDateObject(context.data[WP.DATES_ABROAD].dateYouLeft, dateOpts),
      }),

      claim.outsideUkEndDate === undefined ? undefined : row({
        changeHref: `${WP.DATES_ABROAD}#f-dateYouReturned[dd]`,
        changeHtml: t('dates-abroad:field.dateYouReturned.change'),
        key: t('dates-abroad:field.dateYouReturned.legend'),
        value: formatDateObject(context.data[WP.DATES_ABROAD].dateYouReturned, dateOpts),
      }),

      /* ------------------------------------------------- offered-claim-date */
      // Do you want us to consider backdating your application to
      // ${offeredDateOfClaim}?
      claim.offeredDateOfClaim === undefined ? undefined : row({
        changeHref: `${WP.OFFERED_CLAIM_DATE}#f-acceptClaimDate`,
        changeHtml: t('offered-claim-date:field.acceptClaimDate.change', { offeredDateOfClaim }),
        key: t('offered-claim-date:pageTitle', { offeredDateOfClaim }),
        value: rov('offered-claim-date.acceptClaimDate', 'offered-claim-date:field.acceptClaimDate.options', '', { offeredDateOfClaim }),
      }),

      /* ----------------------------------------------- different-claim-date */
      // What date do you want us to consider your application from?
      claim.requestedDateOfClaim === undefined ? undefined : row({
        changeHref: `${WP.DIFFERENT_CLAIM_DATE}#f-differentClaimDate[dd]`,
        changeHtml: t('different-claim-date:field.differentClaimDate.change'),
        key: t('different-claim-date:pageTitle'),
        value: formatDateObject(context.data[WP.DIFFERENT_CLAIM_DATE].differentClaimDate, dateOpts),
      }),

      /* ------------------------------------------------- national-insurance */
      // What is your National Insurance number?
      row({
        changeHref: `${WP.NATIONAL_INSURANCE}#f-nino`,
        changeHtml: t('national-insurance:field.nino.change'),
        key: t('national-insurance:pageTitle'),
        value: context.data['national-insurance'].nino,
      }),

      /* ---------------------------------------------------------- your-name */
      // What is your full name?
      row({
        changeHref: `${WP.YOUR_NAME}#f-fullName`,
        changeHtml: t('your-name:field.fullName.change'),
        key: t('your-name:field.fullName.label'),
        value: context.data['your-name'].fullName,
      }),

      /* --------------------------------------------------- registered-blind */
      // Are you registered blind or severely sight impaired?
      row({
        changeHref: `${WP.REGISTERED_BLIND}#f-registeredBlind`,
        changeHtml: t('registered-blind:field.registeredBlind.change'),
        key: t('registered-blind:pageTitle'),
        value: rov('registered-blind.registeredBlind', 'registered-blind:field.registeredBlind.options'),
      }),

      /* -------------------------------------------------- live-with-partner */
      // Do you have a partner?
      row({
        changeHref: `${WP.LIVE_WITH_PARTNER}#f-havePartner`,
        changeHtml: t('live-with-partner:field.havePartner.change'),
        key: t('live-with-partner:pageTitle'),
        value: rov('live-with-partner.havePartner', 'live-with-partner:field.havePartner.options'),
      }),
    ],
  };
};
