/* eslint-disable sonarjs/no-duplicate-string */
const {
  rowFactory, checkboxOptionValues, radioOptionValue, safeNl2br,
} = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.eligibility === undefined) {
    return undefined;
  }

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);
  const cbv = checkboxOptionValues(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.about-you'),
    rows: [
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

      /* ---------------------------------------- live-england-scotland-wales */
      // Do you live in England, Scotland or Wales?
      row({
        changeHref: `${WP.LIVE_ENGLAND_SCOTLAND_WALES}#f-inEnglandScotlandWales`,
        changeHtml: t('live-england-scotland-wales:field.inEnglandScotlandWales.change'),
        key: t('live-england-scotland-wales:pageTitle'),
        value: rov('live-england-scotland-wales.inEnglandScotlandWales', 'live-england-scotland-wales:field.inEnglandScotlandWales.options'),
      }),

      /* --------------------------------------------------- your-nationality */
      // Have you lived permanently in the UK for the last 2 years?
      row({
        changeHref: `${WP.YOUR_NATIONALITY}#f-lived2Years`,
        changeHtml: t('your-nationality:field.lived2Years.change'),
        key: t('your-nationality:field.lived2Years.legend'),
        value: rov('your-nationality.lived2Years', 'your-nationality:field.lived2Years.options'),
      }),

      // Do you have the right to live or work in the UK without any immigration restrictions?
      row({
        changeHref: `${WP.YOUR_NATIONALITY}#f-rightToReside`,
        changeHtml: t('your-nationality:field.rightToReside.change'),
        key: t('your-nationality:field.rightToReside.legend'),
        value: rov('your-nationality.rightToReside', 'your-nationality:field.rightToReside.options'),
      }),

      /* ------------------------------------------------------ date-of-claim */
      // What date do you want your Pension Credit claim to start?
      row({
        changeHref: `${WP.DATE_OF_CLAIM}#f-dateOfClaim`,
        changeHtml: t('date-of-claim:field.dateOfClaim.change'),
        key: t('date-of-claim:pageTitle'),
        value: formatDateObject(context.data['date-of-claim'].dateOfClaim),
      }),

      /* ------------------------------------------------------ date-of-birth */
      // What is your date of birth?
      row({
        changeHref: `${WP.DATE_OF_BIRTH}#f-dateOfBirth`,
        changeHtml: t('date-of-birth:field.dateOfBirth.change'),
        key: t('date-of-birth:pageTitle'),
        value: formatDateObject(context.data['date-of-birth'].dateOfBirth),
      }),

      /* --------------------------------------------------- claimant-details */
      // What is your full name?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-fullName`,
        changeHtml: t('claimant-details:field.fullName.change'),
        key: t('claimant-details:field.fullName.label'),
        value: context.data['claimant-details'].fullName,
      }),

      // Have you been known by any previous names?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-hasPreviousNames`,
        changeHtml: t('claimant-details:field.hasPreviousNames.change'),
        key: t('claimant-details:field.hasPreviousNames.legend'),
        value: rov('claimant-details.hasPreviousNames', 'claimant-details:field.hasPreviousNames.options'),
      }),

      // What were your previous names?
      claim.claimant.claimantPreviousNames === undefined ? undefined : row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-previousNames`,
        changeHtml: t('claimant-details:field.previousNames.change'),
        key: t('claimant-details:field.previousNames.label'),
        valueHtml: safeNl2br(context.data['claimant-details'].previousNames),
      }),

      // What is your National Insurance number?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-nino`,
        changeHtml: t('claimant-details:field.nino.change'),
        key: t('claimant-details:field.nino.label'),
        value: context.data['claimant-details'].nino,
      }),

      // What is your contact telephone number?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-contactTelephone`,
        changeHtml: t('claimant-details:field.contactTelephone.change'),
        key: t('claimant-details:field.contactTelephone.label'),
        value: context.data['claimant-details'].contactTelephone,
      }),

      // Are you registered blind or severely sight impaired?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-registeredBlind`,
        changeHtml: t('claimant-details:field.registeredBlind.change'),
        key: t('claimant-details:field.registeredBlind.legend'),
        value: rov('claimant-details.registeredBlind', 'claimant-details:field.registeredBlind.options'),
      }),

      // Are you able to speak to us in English?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-canSpeakEnglish`,
        changeHtml: t('claimant-details:field.canSpeakEnglish.change'),
        key: t('claimant-details:field.canSpeakEnglish.legend'),
        value: rov('claimant-details.canSpeakEnglish', 'claimant-details:field.canSpeakEnglish.options'),
      }),

      // What is your first language?
      claim.claimant.ableToSpeakEnglish ? undefined : row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-firstLanguage`,
        changeHtml: t('claimant-details:field.firstLanguage.change'),
        key: t('claimant-details:field.firstLanguage.label'),
        value: context.data['claimant-details'].firstLanguage,
      }),

      // If you live in Wales, do you want to speak to us in Welsh?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-speakInWelsh`,
        changeHtml: t('claimant-details:field.speakInWelsh.change'),
        key: t('claimant-details:field.speakInWelsh.legend'),
        value: rov('claimant-details.speakInWelsh', 'claimant-details:field.speakInWelsh.options'),
      }),

      // Do you need help with letters or phone calls?
      row({
        changeHref: `${WP.CLAIMANT_DETAILS}#f-helpWithLettersPhone`,
        changeHtml: t('claimant-details:field.helpWithLettersPhone.change'),
        key: t('claimant-details:field.helpWithLettersPhone.legend'),
        value: rov('claimant-details.helpWithLettersPhone', 'claimant-details:field.helpWithLettersPhone.options'),
      }),

      /* ---------------------------------------------------- contact-formats */
      ...(!claim.claimant.phoneLetterHelpRequired ? [] : [
        // Do you need us to contact you in any different formats?
        row({
          changeHref: `${WP.CONTACT_FORMATS}#f-contactFormats`,
          changeHtml: t('contact-formats:field.contactFormats.change'),
          key: t('contact-formats:pageTitle'),
          valueHtml: cbv(
            'contact-formats.contactFormats',
            'contact-formats:field.contactFormats.options',
            'contact-formats:field.contactFormats.noneSelected',
          ),
        }),

        // What is your textphone number?
        !claim.claimant.requestTextphone ? undefined : row({
          changeHref: `${WP.CONTACT_FORMATS}#f-textPhoneNumber`,
          changeHtml: t('contact-formats:field.textPhoneNumber.change'),
          key: t('contact-formats:field.textPhoneNumber.label'),
          value: context.data['contact-formats'].textPhoneNumber,
        }),

        // Tell us any other ways we can help you when we contact you
        claim.claimant.otherContactHelp === undefined ? undefined : row({
          changeHref: `${WP.CONTACT_FORMATS}#f-otherDetails`,
          changeHtml: t('contact-formats:field.otherDetails.change'),
          key: t('contact-formats:field.otherDetails.label'),
          value: context.data['contact-formats'].otherDetails,
        }),
      ]),

      /* -------------------------------------------------- live-with-partner */
      // Do you live with a partner?
      row({
        changeHref: `${WP.LIVE_WITH_PARTNER}#f-liveWithPartner`,
        changeHtml: t('live-with-partner:field.liveWithPartner.change'),
        key: t('live-with-partner:pageTitle'),
        value: rov('live-with-partner.liveWithPartner', 'live-with-partner:field.liveWithPartner.options'),
      }),
    ],
  };
};
