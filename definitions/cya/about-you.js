/* eslint-disable sonarjs/no-duplicate-string */
const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
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

      /* ------------------------------------------------------ date-of-claim */
      // What date do you want your Pension Credit claim to start?
      row({
        changeHref: `${WP.DATE_OF_CLAIM}#f-dateOfClaim`,
        changeHtml: t('date-of-claim:field.dateOfClaim.change'),
        key: t('date-of-claim:pageTitle'),
        value: formatDateObject(context.data['date-of-claim'].dateOfClaim, dateOpts),
      }),

      /* ------------------------------------------------------ date-of-birth */
      // What is your date of birth?
      row({
        changeHref: `${WP.DATE_OF_BIRTH}#f-dateOfBirth`,
        changeHtml: t('date-of-birth:field.dateOfBirth.change'),
        key: t('date-of-birth:pageTitle'),
        value: formatDateObject(context.data['date-of-birth'].dateOfBirth, dateOpts),
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

      // Have you been known by any previous names?
      row({
        changeHref: `${WP.YOUR_NAME}#f-hasPreviousNames`,
        changeHtml: t('your-name:field.hasPreviousNames.change'),
        key: t('your-name:field.hasPreviousNames.legend'),
        value: rov('your-name.hasPreviousNames', 'your-name:field.hasPreviousNames.options'),
      }),

      // What were your previous names?
      claim.claimant.claimantPreviousNames === undefined ? undefined : row({
        changeHref: `${WP.YOUR_NAME}#f-previousNames`,
        changeHtml: t('your-name:field.previousNames.change'),
        key: t('your-name:field.previousNames.label'),
        valueHtml: safeNl2br(context.data['your-name'].previousNames),
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
