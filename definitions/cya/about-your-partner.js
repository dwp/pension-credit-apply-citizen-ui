/* eslint-disable sonarjs/no-duplicate-string */
const { row, radioOptionValue, safeNl2br } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim) => {
  // Skip whole section if claimant does not have a partner
  if (!claim.hasPartner()) {
    return undefined;
  }

  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.about-your-partner'),
    rows: [
      /* ------------------------------------------------------ partner-agree */
      // Does your partner agree to you making this application?
      row({
        changeHref: `${WP.PARTNER_AGREE}#f-partnerAgree`,
        changeHtml: t('partner-agree:field.partnerAgree.change'),
        key: t('partner-agree:pageTitle'),
        value: rov('partner-agree.partnerAgree', 'partner-agree:field.partnerAgree.options'),
      }),

      // Your partner's date of birth
      row({
        changeHref: `${WP.LIVE_WITH_PARTNER}#f-partnerDateOfBirth`,
        changeHtml: t('live-with-partner:field.partnerDateOfBirth.change'),
        key: t('live-with-partner:field.partnerDateOfBirth.legend'),
        value: formatDateObject(context.data['live-with-partner'].partnerDateOfBirth),
      }),

      /* -------------------------------------------- partner-housing-benefit */
      // Does your partner get pension age Housing Benefit?
      !claim.eligibility.partnerPensionAgeHousingBenefit ? undefined : row({
        changeHref: `${WP.PARTNER_HOUSING_BENEFIT}#f-partnerGetsHousingBenefit`,
        changeHtml: t('partner-housing-benefit:field.partnerGetsHousingBenefit.change'),
        key: t('partner-housing-benefit:pageTitle'),
        value: rov('partner-housing-benefit.partnerGetsHousingBenefit', 'partner-housing-benefit:field.partnerGetsHousingBenefit.options'),
      }),

      /* ---------------------------------------------------- partner-details */
      // What is your partner’s full name?
      row({
        changeHref: `${WP.PARTNER_DETAILS}#f-partnerFullName`,
        changeHtml: t('partner-details:field.partnerFullName.change'),
        key: t('partner-details:field.partnerFullName.label'),
        value: context.data['partner-details'].partnerFullName,
      }),

      // Has your partner been known by any previous names?
      row({
        changeHref: `${WP.PARTNER_DETAILS}#f-partnerHasPreviousNames`,
        changeHtml: t('partner-details:field.partnerHasPreviousNames.change'),
        key: t('partner-details:field.partnerHasPreviousNames.legend'),
        value: rov('partner-details.partnerHasPreviousNames', 'partner-details:field.partnerHasPreviousNames.options'),
      }),

      // What were your partner’s previous names?
      claim.partner.otherNames === undefined ? undefined : row({
        changeHref: `${WP.PARTNER_DETAILS}#f-partnerPreviousNames`,
        changeHtml: t('partner-details:field.partnerPreviousNames.change'),
        key: t('partner-details:field.partnerPreviousNames.label'),
        valueHtml: safeNl2br(context.data['partner-details'].partnerPreviousNames),
      }),

      // What is the your partner’s National Insurance number?
      row({
        changeHref: `${WP.PARTNER_DETAILS}#f-partnerNino`,
        changeHtml: t('partner-details:field.partnerNino.change'),
        key: t('partner-details:field.partnerNino.label'),
        value: context.data['partner-details'].partnerNino,
      }),

      // Is your partner registered blind or severely sight impaired?
      row({
        changeHref: `${WP.PARTNER_DETAILS}#f-partnerRegisteredBlind`,
        changeHtml: t('partner-details:field.partnerRegisteredBlind.change'),
        key: t('partner-details:field.partnerRegisteredBlind.legend'),
        value: rov('partner-details.partnerRegisteredBlind', 'partner-details:field.partnerRegisteredBlind.options'),
      }),

      /* ------------------------------------------------ partner-nationality */
      // Does your partner have the right to live or work in the UK without any
      // immigration restrictions?
      row({
        changeHref: `${WP.PARTNER_NATIONALITY}#f-partnerLived2Years`,
        changeHtml: t('partner-nationality:field.partnerLived2Years.change'),
        key: t('partner-nationality:field.partnerLived2Years.legend'),
        value: rov('partner-nationality.partnerLived2Years', 'partner-nationality:field.partnerLived2Years.options'),
      }),

      // Has your partner lived permanently in the UK for the last 2 years?
      row({
        changeHref: `${WP.PARTNER_NATIONALITY}#f-partnerRightToReside`,
        changeHtml: t('partner-nationality:field.partnerRightToReside.change'),
        key: t('partner-nationality:field.partnerRightToReside.legend'),
        value: rov('partner-nationality.partnerRightToReside', 'partner-nationality:field.partnerRightToReside.options'),
      }),
    ],
  };
};
