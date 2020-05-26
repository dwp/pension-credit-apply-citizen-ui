/* eslint-disable max-len */
const { rowFactory, radioOptionValue, formatAddress } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if claimant does not need to go through the HRT questions
  if (!claim.citizenHRTRequired()) {
    return undefined;
  }

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);
  const sponsorAddress = context.getDataForPage(WP.HRT_CITIZEN_SPONSOR_ADDRESS_HIDDEN) || {};
  const nationalityDetails = context.data['nationality-details'] || {};
  const sponsorshipDetails = context.data['sponsorship-details'] || {};
  const asylumSeeker = context.data['asylum-seeker'] || {};

  // Common options for `formatDateObject()` calls
  const dateOpts = { locale: context.nav.language };

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
  const nationalityDetailsRows = !claim.citizenNationalityDetailsTaken() ? [] : [

    // What is your nationality?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-nationality`,
      changeHtml: t('nationality-details:field.nationality.change'),
      key: t('nationality-details:field.nationality.label'),
      value: nationalityDetails.nationality,
    }),

    // Which country have you come from?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-country`,
      changeHtml: t('nationality-details:field.country.change'),
      key: t('nationality-details:field.country.label'),
      value: nationalityDetails.country,
    }),

    // What date did you last come to the UK?
    row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-lastCameToUk[dd]`,
      changeHtml: t('nationality-details:field.lastCameToUk.change'),
      key: t('nationality-details:field.lastCameToUk.legend'),
      value: formatDateObject(nationalityDetails.lastCameToUk, dateOpts),
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
    nationalityDetails.livedInUkBefore !== 'yes' ? undefined : row({
      changeHref: `${WP.HRT_CITIZEN_NATIONALITY_DETAILS}#f-lastLeftUk[dd]`,
      changeHtml: t('nationality-details:field.lastLeftUk.change'),
      key: t('nationality-details:field.lastLeftUk.legend'),
      value: formatDateObject(nationalityDetails.lastLeftUk, dateOpts),
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

  /* ---------------------------------------------------- sponsorship-details */
  const sponsorshipDetailsRows = !claim.citizenHasHRTSponsor() ? [] : [
    row({
      changeHref: `${WP.HRT_CITIZEN_SPONSORSHIP_DETAILS}#f-sponsorName`,
      changeHtml: t('sponsorship-details:field.sponsorName.change'),
      key: t('sponsorship-details:field.sponsorName.label'),
      value: sponsorshipDetails.sponsorName,
    }),

    row({
      changeHref: `${WP.HRT_CITIZEN_SPONSORSHIP_DETAILS}#f-homeOfficeReference`,
      changeHtml: t('sponsorship-details:field.homeOfficeReference.change'),
      key: t('sponsorship-details:field.homeOfficeReference.label'),
      value: sponsorshipDetails.homeOfficeReference,
    }),

    row({
      changeHref: `${WP.HRT_CITIZEN_SPONSORSHIP_DETAILS}#f-sponsorshipUndertakingSigned[dd]`,
      changeHtml: t('sponsorship-details:field.sponsorshipUndertakingSigned.change'),
      key: t('sponsorship-details:field.sponsorshipUndertakingSigned.legend'),
      value: formatDateObject(sponsorshipDetails.sponsorshipUndertakingSigned, dateOpts),
    }),
  ];

  /* -------------------------------------------------------- sponsor-address */
  let sponsorAddressRows = [];

  if (claim.citizenHasHRTSponsor()) {
    sponsorAddressRows = [
      row({
        changeHref: sponsorAddress.addressFrom === 'select'
          ? `${WP.HRT_CITIZEN_SPONSOR_ADDRESS_SELECT}#f-uprn`
          : `${WP.HRT_CITIZEN_SPONSOR_ADDRESS_MANUAL}#f-addressLine1`,
        changeHtml: t('check-your-answers:sponsorAddress.change'),
        key: t('check-your-answers:sponsorAddress.label'),
        valueHtml: formatAddress(sponsorAddress.address),
      }),
    ];
  }

  /* ---------------------------------------------------------- asylum-seeker */
  const asylumSeekerRows = [
    // Are you an asylum seeker?
    row({
      changeHref: `${WP.HRT_CITIZEN_ASYLUM_SEEKER}#f-asylumSeeker`,
      changeHtml: t('asylum-seeker:field.asylumSeeker.change'),
      key: t('asylum-seeker:pageTitle'),
      value: rov('asylum-seeker.asylumSeeker', 'asylum-seeker:field.asylumSeeker.options'),
    }),

    // Did you first apply for asylum before 3 April 2000?
    !claim.citizenIsAsylumSeeker() ? undefined : row({
      changeHref: `${WP.HRT_CITIZEN_ASYLUM_SEEKER}#f-asylumBefore3April2000`,
      changeHtml: t('asylum-seeker:field.asylumBefore3April2000.change'),
      key: t('asylum-seeker:field.asylumBefore3April2000.legend'),
      value: rov('asylum-seeker.asylumBefore3April2000', 'asylum-seeker:field.asylumBefore3April2000.options'),
    }),

    // Have you recently had a successful decision on your asylum application?
    !claim.citizenIsAsylumSeeker() ? undefined : row({
      changeHref: `${WP.HRT_CITIZEN_ASYLUM_SEEKER}#f-successfulDecision`,
      changeHtml: t('asylum-seeker:field.successfulDecision.change'),
      key: t('asylum-seeker:field.successfulDecision.legend'),
      value: rov('asylum-seeker.successfulDecision', 'asylum-seeker:field.successfulDecision.options'),
    }),

    // What date did you get a successful decision on your application?
    !claim.citizenIsAsylumSeeker() || !claim.habitualResidencyTest.successfulDecision ? undefined : row({
      changeHref: `${WP.HRT_CITIZEN_ASYLUM_SEEKER}#f-successfulDecisionDate[dd]`,
      changeHtml: t('asylum-seeker:field.successfulDecisionDate.change'),
      key: t('asylum-seeker:field.successfulDecisionDate.legend'),
      value: formatDateObject(asylumSeeker.successfulDecisionDate, dateOpts),
    }),

    // Have you been supported by the Home Office while waiting for a decision on your application?
    !claim.citizenIsAsylumSeeker() ? undefined : row({
      changeHref: `${WP.HRT_CITIZEN_ASYLUM_SEEKER}#f-supportedByHomeOffice`,
      changeHtml: t('asylum-seeker:field.supportedByHomeOffice.change'),
      key: t('asylum-seeker:field.supportedByHomeOffice.legend'),
      value: rov('asylum-seeker.supportedByHomeOffice', 'asylum-seeker:field.supportedByHomeOffice.options'),
    }),
  ];

  /* ------------------------------------------------------------------- Rows */
  return {
    heading: t('check-your-answers:sectionHeading.hrt-citizen'),
    rows: [
      ...returnedToUkRows,
      ...nationalityDetailsRows,
      ...ukSponsorshipRows,
      ...sponsorshipDetailsRows,
      ...sponsorAddressRows,
      ...asylumSeekerRows,
    ],
  };
};
