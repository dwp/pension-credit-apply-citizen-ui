const { row, radioOptionValue } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, traversed) => {
  // Skip whole section if claimant does not have a partner
  if (!traversed.includes(WP.HRT_CITIZEN_RETURNED_TO_UK)) {
    return undefined;
  }

  const rov = radioOptionValue(t, context);
  const data = context.data['nationality-details'] || {};

  /* --------------------------------------------------------- returned-to-uk */
  const returnedToUkRows = [
    // At any time, have you come to live in the UK or returned to the UK to live from abroad?
    row({
      changeHref: `${WP.HRT_CITIZEN_RETURNED_TO_UK}#f-cameToUk`,
      changeHtml: t('returned-to-uk:field.cameToUk.change'),
      key: t('returned-to-uk:pageTitle'),
      value: rov('returned-to-uk.cameToUk', 'returned-to-uk:field.cameToUk.options'),
    }),
  ];

  /* ---------------------------------------------------- nationality-details */
  const nationalityDetailsRows = !traversed.includes(WP.HRT_CITIZEN_NATIONALITY_DETAILS) ? [] : [

    // What is your nationality?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-nationality`,
      changeHtml: t('nationality-details:field.nationality.change'),
      key: t('nationality-details:field.nationality.label'),
      value: data.nationality,
    }),

    // Which country have you come from?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-country`,
      changeHtml: t('nationality-details:field.country.change'),
      key: t('nationality-details:field.country.label'),
      value: data.nationality,
    }),

    // What date did you last come to the UK?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-lastCameToUK[dd]`,
      changeHtml: t('nationality-details:field.lastCameToUK.change'),
      key: t('nationality-details:field.lastCameToUK.legend'),
      value: formatDateObject(data.lastCameToUK),
    }),

    // Did you come to the UK to work?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-cameToUkToWork`,
      changeHtml: t('nationality-details:field.cameToUkToWork.change'),
      key: t('nationality-details:field.cameToUkToWork.legend'),
      value: rov('nationality-details.cameToUkToWork', 'nationality-details:field.cameToUkToWork.options'),
    }),

    // Does your passport say you have no recourse to public funds?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-noRecourseToPublicFunds`,
      changeHtml: t('nationality-details:field.noRecourseToPublicFunds.change'),
      key: t('nationality-details:field.noRecourseToPublicFunds.legend'),
      value: rov('nationality-details.noRecourseToPublicFunds', 'nationality-details:field.noRecourseToPublicFunds.options'),
    }),

    // Have you lived in the UK before?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-livedInUkBefore`,
      changeHtml: t('nationality-details:field.livedInUkBefore.change'),
      key: t('nationality-details:field.livedInUkBefore.legend'),
      value: rov('nationality-details.livedInUkBefore', 'nationality-details:field.livedInUkBefore.options'),
    }),

    // What date did you last leave the UK?
    data.livedInUkBefore !== 'yes' ? undefined : row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-lastLeftUK[dd]`,
      changeHtml: t('nationality-details:field.lastLeftUK.change'),
      key: t('nationality-details:field.lastLeftUK.legend'),
      value: formatDateObject(data.lastLeftUK),
    }),

    // Have you come to the UK under the Family Reunion Scheme?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-familyReunionScheme`,
      changeHtml: t('nationality-details:field.familyReunionScheme.change'),
      key: t('nationality-details:field.familyReunionScheme.legend'),
      value: rov('nationality-details.familyReunionScheme', 'nationality-details:field.familyReunionScheme.options'),
    }),
  ];

  /* --------------------------------------------------------- uk-sponsorship */
  const ukSponsorshipRows = [
    row({
      changeHref: `${WP.HRT_CITIZEN_UK_SPONSORSHIP}#f-sponsorshipUndertaking`,
      changeHtml: t('uk-sponsorship:field.sponsorshipUndertaking.change'),
      key: t('uk-sponsorship:pageTitle'),
      value: rov('uk-sponsorship.sponsorshipUndertaking', 'uk-sponsorship:field.sponsorshipUndertaking.options'),
    }),
  ];

  /* ------------------------------------------------------------------- Rows */
  return {
    heading: t('check-your-answers:sectionHeading.hrt-citizen'),
    rows: [
      ...returnedToUkRows,
      ...nationalityDetailsRows,
      ...ukSponsorshipRows,
    ],
  };
};
