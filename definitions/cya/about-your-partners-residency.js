/* eslint-disable max-len */
const { rowFactory, radioOptionValue, formatAddress } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if claimant does not have a partner
  if (!claim.liveWithPartner()) {
    return undefined;
  }

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);
  const sponsorAddress = context.getDataForPage(WP.HRT_PARTNER_SPONSOR_ADDRESS_HIDDEN) || {};
  const nationalityDetails = context.data[WP.HRT_PARTNER_NATIONALITY_DETAILS] || {};
  const sponsorshipDetails = context.data[WP.HRT_PARTNER_SPONSORSHIP_DETAILS] || {};
  const asylumApplication = context.data[WP.HRT_PARTNER_ASYLUM_APPLICATION] || {};

  // Common options for `formatDateObject()` calls
  const dateOpts = { locale: context.nav.language };

  /* ---------------------------------------------------- partner-nationality */
  const nationalityRows = [
    // Does your partner have the right to live or work in the UK without any
    // immigration restrictions?
    row({
      changeHref: `${WP.PARTNER_NATIONALITY}#f-partnerRightToReside`,
      changeHtml: t('partner-nationality:field.partnerRightToReside.change'),
      key: t('partner-nationality:field.partnerRightToReside.legend'),
      value: rov('partner-nationality.partnerRightToReside', 'partner-nationality:field.partnerRightToReside.options'),
    }),

    // Has your partner lived permanently in the UK for the last 2 years?
    row({
      changeHref: `${WP.PARTNER_NATIONALITY}#f-partnerLived2Years`,
      changeHtml: t('partner-nationality:field.partnerLived2Years.change'),
      key: t('partner-nationality:field.partnerLived2Years.legend'),
      value: rov('partner-nationality.partnerLived2Years', 'partner-nationality:field.partnerLived2Years.options'),
    }),
  ];

  /* ------------------------------------------------- partner-returned-to-uk */
  const returnedToUkRows = !claim.partnerHRTRequired() ? [] : [
    // At any time, have you come to live in the UK or returned to the UK to
    // live from abroad?
    row({
      changeHref: `${WP.HRT_PARTNER_RETURNED_TO_UK}#f-partnerCameToUk`,
      changeHtml: t('partner-returned-to-uk:field.partnerCameToUk.change'),
      key: t('partner-returned-to-uk:pageTitle'),
      value: rov('partner-returned-to-uk.partnerCameToUk', 'partner-returned-to-uk:field.partnerCameToUk.options'),
    }),
  ];

  /* -------------------------------------------- partner-nationality-details */
  const nationalityDetailsRows = !claim.partnerNationalityDetailsTaken() ? [] : [

    // What is your nationality?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerNationality`,
      changeHtml: t('partner-nationality-details:field.partnerNationality.change'),
      key: t('partner-nationality-details:field.partnerNationality.label'),
      value: nationalityDetails.partnerNationality,
    }),

    // Which country have you come from?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerCountry`,
      changeHtml: t('partner-nationality-details:field.partnerCountry.change'),
      key: t('partner-nationality-details:field.partnerCountry.label'),
      value: nationalityDetails.partnerCountry,
    }),

    // What date did you last come to the UK?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerLastCameToUk[dd]`,
      changeHtml: t('partner-nationality-details:field.partnerLastCameToUk.change'),
      key: t('partner-nationality-details:field.partnerLastCameToUk.legend'),
      value: formatDateObject(nationalityDetails.partnerLastCameToUk, dateOpts),
    }),

    // Did you come to the UK to work?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerCameToUkToWork`,
      changeHtml: t('partner-nationality-details:field.partnerCameToUkToWork.change'),
      key: t('partner-nationality-details:field.partnerCameToUkToWork.legend'),
      value: rov('partner-nationality-details.partnerCameToUkToWork', 'partner-nationality-details:field.partnerCameToUkToWork.options'),
    }),

    // Does your passport say you have no recourse to public funds?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerNoRecourseToPublicFunds`,
      changeHtml: t('partner-nationality-details:field.partnerNoRecourseToPublicFunds.change'),
      key: t('partner-nationality-details:field.partnerNoRecourseToPublicFunds.legend'),
      value: rov('partner-nationality-details.partnerNoRecourseToPublicFunds', 'partner-nationality-details:field.partnerNoRecourseToPublicFunds.options'),
    }),

    // Have you lived in the UK before?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerLivedInUkBefore`,
      changeHtml: t('partner-nationality-details:field.partnerLivedInUkBefore.change'),
      key: t('partner-nationality-details:field.partnerLivedInUkBefore.legend'),
      value: rov('partner-nationality-details.partnerLivedInUkBefore', 'partner-nationality-details:field.partnerLivedInUkBefore.options'),
    }),

    // What date did you last leave the UK?
    nationalityDetails.partnerLivedInUkBefore !== 'yes' ? undefined : row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerLastLeftUk[dd]`,
      changeHtml: t('partner-nationality-details:field.partnerLastLeftUk.change'),
      key: t('partner-nationality-details:field.partnerLastLeftUk.legend'),
      value: formatDateObject(nationalityDetails.partnerLastLeftUk, dateOpts),
    }),

    // Have you come to the UK under the Family Reunion Scheme?
    row({
      changeHref: `${WP.HRT_PARTNER_NATIONALITY_DETAILS}#f-partnerFamilyReunionScheme`,
      changeHtml: t('partner-nationality-details:field.partnerFamilyReunionScheme.change'),
      key: t('partner-nationality-details:field.partnerFamilyReunionScheme.legend'),
      value: rov('partner-nationality-details.partnerFamilyReunionScheme', 'partner-nationality-details:field.partnerFamilyReunionScheme.options'),
    }),
  ];

  /* ------------------------------------------------- partner-uk-sponsorship */
  const ukSponsorshipRows = !claim.partnerHRTRequired() ? [] : [
    row({
      changeHref: `${WP.HRT_PARTNER_UK_SPONSORSHIP}#f-partnerSponsorshipUndertaking`,
      changeHtml: t('partner-uk-sponsorship:field.partnerSponsorshipUndertaking.change'),
      key: t('partner-uk-sponsorship:pageTitle'),
      value: rov('partner-uk-sponsorship.partnerSponsorshipUndertaking', 'partner-uk-sponsorship:field.partnerSponsorshipUndertaking.options'),
    }),
  ];

  /* -------------------------------------------- partner-sponsorship-details */
  const sponsorshipDetailsRows = !claim.partnerHasHRTSponsor() ? [] : [
    row({
      changeHref: `${WP.HRT_PARTNER_SPONSORSHIP_DETAILS}#f-partnerSponsorName`,
      changeHtml: t('partner-sponsorship-details:field.partnerSponsorName.change'),
      key: t('partner-sponsorship-details:field.partnerSponsorName.label'),
      value: sponsorshipDetails.partnerSponsorName,
    }),

    row({
      changeHref: `${WP.HRT_PARTNER_SPONSORSHIP_DETAILS}#f-partnerHomeOfficeReference`,
      changeHtml: t('partner-sponsorship-details:field.partnerHomeOfficeReference.change'),
      key: t('partner-sponsorship-details:field.partnerHomeOfficeReference.label'),
      value: sponsorshipDetails.partnerHomeOfficeReference,
    }),

    row({
      changeHref: `${WP.HRT_PARTNER_SPONSORSHIP_DETAILS}#f-partnerSponsorshipUndertakingSigned[dd]`,
      changeHtml: t('partner-sponsorship-details:field.partnerSponsorshipUndertakingSigned.change'),
      key: t('partner-sponsorship-details:field.partnerSponsorshipUndertakingSigned.legend'),
      value: formatDateObject(sponsorshipDetails.partnerSponsorshipUndertakingSigned, dateOpts),
    }),
  ];

  /* -------------------------------------------------------- sponsor-address */
  let sponsorAddressRows = [];

  if (claim.partnerHasHRTSponsor()) {
    sponsorAddressRows = [
      row({
        changeHref: sponsorAddress.addressFrom === 'select'
          ? `${WP.HRT_PARTNER_SPONSOR_ADDRESS_SELECT}#f-uprn`
          : `${WP.HRT_PARTNER_SPONSOR_ADDRESS_MANUAL}#f-addressLine1`,
        changeHtml: t('check-your-answers:partnerSponsorAddress.change'),
        key: t('check-your-answers:partnerSponsorAddress.label'),
        valueHtml: formatAddress(sponsorAddress.address),
      }),
    ];
  }

  /* ---------------------------------------------------------- partner-asylum-seeker */
  const asylumSeekerRows = !claim.partnerHRTRequired() ? [] : [
    // Are you an asylum seeker?
    row({
      changeHref: `${WP.HRT_PARTNER_ASYLUM_SEEKER}#f-partnerAsylumSeeker`,
      changeHtml: t('partner-asylum-seeker:field.partnerAsylumSeeker.change'),
      key: t('partner-asylum-seeker:pageTitle'),
      value: rov('partner-asylum-seeker.partnerAsylumSeeker', 'partner-asylum-seeker:field.partnerAsylumSeeker.options'),
    }),

    // Did you first apply for asylum before 3 April 2000?
    !claim.partnerIsAsylumSeeker() ? undefined : row({
      changeHref: `${WP.HRT_PARTNER_ASYLUM_APPLICATION}#f-partnerAsylumBefore3April2000`,
      changeHtml: t('partner-asylum-application:field.partnerAsylumBefore3April2000.change'),
      key: t('partner-asylum-application:field.partnerAsylumBefore3April2000.legend'),
      value: rov('partner-asylum-application.partnerAsylumBefore3April2000', 'partner-asylum-application:field.partnerAsylumBefore3April2000.options'),
    }),

    // Have you recently had a successful decision on your asylum application?
    !claim.partnerIsAsylumSeeker() ? undefined : row({
      changeHref: `${WP.HRT_PARTNER_ASYLUM_APPLICATION}#f-partnerSuccessfulDecision`,
      changeHtml: t('partner-asylum-application:field.partnerSuccessfulDecision.change'),
      key: t('partner-asylum-application:field.partnerSuccessfulDecision.legend'),
      value: rov('partner-asylum-application.partnerSuccessfulDecision', 'partner-asylum-application:field.partnerSuccessfulDecision.options'),
    }),

    // What date did you get a successful decision on your application?
    !claim.partnerIsAsylumSeeker() || !claim.habitualResidencyTest.partnerSuccessfulDecision ? undefined : row({
      changeHref: `${WP.HRT_PARTNER_ASYLUM_APPLICATION}#f-partnerSuccessfulDecisionDate[dd]`,
      changeHtml: t('partner-asylum-application:field.partnerSuccessfulDecisionDate.change'),
      key: t('partner-asylum-application:field.partnerSuccessfulDecisionDate.legend'),
      value: formatDateObject(asylumApplication.partnerSuccessfulDecisionDate, dateOpts),
    }),

    // Have you been supported by the Home Office while waiting for a decision on your application?
    !claim.partnerIsAsylumSeeker() ? undefined : row({
      changeHref: `${WP.HRT_PARTNER_ASYLUM_APPLICATION}#f-partnerSupportedByHomeOffice`,
      changeHtml: t('partner-asylum-application:field.partnerSupportedByHomeOffice.change'),
      key: t('partner-asylum-application:field.partnerSupportedByHomeOffice.legend'),
      value: rov('partner-asylum-application.partnerSupportedByHomeOffice', 'partner-asylum-application:field.partnerSupportedByHomeOffice.options'),
    }),
  ];

  /* ------------------------------------------------------------------- Rows */
  return {
    heading: t('check-your-answers:sectionHeading.hrt-partner'),
    rows: [
      ...nationalityRows,
      ...returnedToUkRows,
      ...nationalityDetailsRows,
      ...ukSponsorshipRows,
      ...sponsorshipDetailsRows,
      ...sponsorAddressRows,
      ...asylumSeekerRows,
    ],
  };
};
