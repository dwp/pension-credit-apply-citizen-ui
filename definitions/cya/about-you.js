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
  const preferredLanguageChoice = context.getDataForPage(WP.CLAIMANT_LANGUAGE).preferredLanguage;

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

      /* ------------------------------------------------------- phone-number */
      // What is your contact telephone number?
      row({
        changeHref: `${WP.PHONE_NUMBER}#f-contactTelephone`,
        changeHtml: t('phone-number:field.contactTelephone.change'),
        key: t('phone-number:pageTitle'),
        value: context.data['phone-number'].contactTelephone,
      }),

      /* -------------------------------------------------- claimant-language */
      // What language do you want us to speak to you in?
      row({
        changeHref: `${WP.CLAIMANT_LANGUAGE}#f-preferredLanguage`,
        changeHtml: t('claimant-language:field.preferredLanguage.change'),
        key: t('claimant-language:pageTitle'),
        value: rov('claimant-language.preferredLanguage', 'claimant-language:field.preferredLanguage.options'),
      }),

      // What language do you want us to use?
      preferredLanguageChoice !== 'other' ? undefined : row({
        changeHref: `${WP.CLAIMANT_LANGUAGE}#f-preferredLanguageOther`,
        changeHtml: t('claimant-language:field.preferredLanguageOther.change'),
        key: t('claimant-language:field.preferredLanguageOther.label'),
        value: context.data['claimant-language'].preferredLanguageOther,
      }),

      /* --------------------------------------------------- registered-blind */
      // Are you registered blind or severely sight impaired?
      row({
        changeHref: `${WP.REGISTERED_BLIND}#f-registeredBlind`,
        changeHtml: t('registered-blind:field.registeredBlind.change'),
        key: t('registered-blind:pageTitle'),
        value: rov('registered-blind.registeredBlind', 'registered-blind:field.registeredBlind.options'),
      }),

      /* --------------------------------------------------- claimant-details */
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
