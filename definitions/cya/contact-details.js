/* eslint-disable sonarjs/no-duplicate-string */
const {
  rowFactory, checkboxOptionValues, radioOptionValue, formatAddress,
} = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');
const daSuffix = require('../../utils/delegated-authority-suffix.js');

module.exports = (t, context, claim, cyaUrl) => {
  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);
  const cbv = checkboxOptionValues(t, context);
  const { preferredLanguage } = context.getDataForPage(WP.LANGUAGE) || {};
  const { needsDifferentFormats } = context.getDataForPage(WP.DIFFERENT_FORMATS) || {};
  const { contactFormats } = context.getDataForPage(WP.CONTACT_FORMATS) || {};
  const letterAddress = context.getDataForPage(WP.LETTERS_ADDRESS_HIDDEN) || {};
  const { whoMadeClaim } = context.getDataForPage(WP.WHO_MADE_CLAIM) || {};
  const userType = daSuffix(whoMadeClaim);

  return {
    heading: t('check-your-answers:sectionHeading.contact-details'),
    rows: [
      /* ----------------------------------------------------- who-made-claim */
      // Which of these best describes you?
      row({
        changeHref: `${WP.WHO_MADE_CLAIM}#f-whoMadeClaim`,
        changeHtml: t('who-made-claim:field.whoMadeClaim.change'),
        key: t('who-made-claim:pageTitle'),
        value: rov('who-made-claim.whoMadeClaim', 'check-your-answers:whoMadeClaim'),
      }),

      // What is your relationship to the applicant?
      !claim.userIsSomeoneElse() ? undefined : row({
        changeHref: `${WP.WHO_MADE_CLAIM}#f-relationship`,
        changeHtml: t('who-made-claim:field.relationship.change'),
        key: t('who-made-claim:field.relationship.label'),
        value: context.data[WP.WHO_MADE_CLAIM].relationship,
      }),

      /* ---------------------------------------- delegated-authority-details */
      ...(!claim.userIsDelegatedAuthority() ? [] : [
        // What is your full name?
        row({
          changeHref: `${WP.DELEGATED_AUTHORITY_DETAILS}#f-contactName`,
          changeHtml: t('delegated-authority-details:field.contactName.change'),
          key: t('delegated-authority-details:field.contactName.label'),
          value: context.data[WP.DELEGATED_AUTHORITY_DETAILS].contactName,
        }),

        //  What is your corporate ID?
        !claim.userIsCorporateActingBody() ? undefined : row({
          changeHref: `${WP.DELEGATED_AUTHORITY_DETAILS}#f-contactID`,
          changeHtml: t('delegated-authority-details:field.contactID.change'),
          key: t('delegated-authority-details:field.contactID.label'),
          value: context.data[WP.DELEGATED_AUTHORITY_DETAILS].contactID,
        }),

        // What is your National Insurance number?
        claim.userIsCorporateActingBody() ? undefined : row({
          changeHref: `${WP.DELEGATED_AUTHORITY_DETAILS}#f-contactNino`,
          changeHtml: t('delegated-authority-details:field.contactNino.change'),
          key: t('delegated-authority-details:field.contactNino.label'),
          value: context.data[WP.DELEGATED_AUTHORITY_DETAILS].contactNino,
        }),
      ]),

      /* -------------------------------------------------------- can-we-call */
      // Can we call you about this claim?
      row({
        changeHref: `${WP.CAN_WE_CALL}#f-canWeCall`,
        changeHtml: t(`can-we-call:field.canWeCall.change${userType}`),
        key: t(`can-we-call:pageTitle${userType}`),
        value: rov('can-we-call.canWeCall', 'can-we-call:field.canWeCall.options'),
      }),

      // What is your contact telephone number?
      context.data[WP.CAN_WE_CALL].canWeCall === 'no' ? undefined : row({
        changeHref: `${WP.CAN_WE_CALL}#f-contactTelephone`,
        changeHtml: t(`can-we-call:field.contactTelephone.change${userType}`),
        key: t(`can-we-call:field.contactTelephone.label${userType}`),
        value: context.data[WP.CAN_WE_CALL].contactTelephone,
      }),

      /* ----------------------------------------------------------- language */
      // What language do you want us to speak to you in?
      row({
        changeHref: `${WP.LANGUAGE}#f-preferredLanguage`,
        changeHtml: t(`language:field.preferredLanguage.change${userType}`),
        key: t(`language:pageTitle${userType}`),
        value: rov('language.preferredLanguage', 'language:field.preferredLanguage.options'),
      }),

      // What language do you want us to use?
      preferredLanguage !== 'other' ? undefined : row({
        changeHref: `${WP.LANGUAGE}#f-preferredLanguageOther`,
        changeHtml: t('language:field.preferredLanguageOther.change'),
        key: t('language:field.preferredLanguageOther.label'),
        value: context.data[WP.LANGUAGE].preferredLanguageOther,
      }),

      /* -------------------------------------------------- different-formats */
      // Do you need us to use any different formats when we contact you by
      // letter or phone?
      row({
        changeHref: `${WP.DIFFERENT_FORMATS}#f-needsDifferentFormats`,
        changeHtml: t(`different-formats:field.needsDifferentFormats.change${userType}`),
        key: t(`different-formats:pageTitle${userType}`),
        value: rov('different-formats.needsDifferentFormats', 'different-formats:field.needsDifferentFormats.options', userType),
      }),

      /* ---------------------------------------------------- contact-formats */
      ...(needsDifferentFormats === 'no' ? [] : [
        // Do you need us to contact you in any different formats?
        row({
          changeHref: `${WP.CONTACT_FORMATS}#f-contactFormats`,
          changeHtml: t(`contact-formats:field.contactFormats.change${userType}`),
          key: t(`contact-formats:pageTitle${userType}`),
          valueHtml: cbv(
            'contact-formats.contactFormats',
            'contact-formats:field.contactFormats.options',
            'contact-formats:field.contactFormats.noneSelected',
          ),
        }),

        // What is your textphone number?
        !contactFormats.includes('textPhone') ? undefined : row({
          changeHref: `${WP.CONTACT_FORMATS}#f-textPhoneNumber`,
          changeHtml: t(`contact-formats:field.textPhoneNumber.change${userType}`),
          key: t(`contact-formats:field.textPhoneNumber.label${userType}`),
          value: context.data[WP.CONTACT_FORMATS].textPhoneNumber,
        }),

        // Tell us any other ways we can help you when we contact you
        !contactFormats.includes('other') ? undefined : row({
          changeHref: `${WP.CONTACT_FORMATS}#f-otherDetails`,
          changeHtml: t(`contact-formats:field.otherDetails.change${userType}`),
          key: t(`contact-formats:field.otherDetails.label${userType}`),
          value: context.data[WP.CONTACT_FORMATS].otherDetails,
        }),
      ]),

      /* ----------------------------------------------------- letter-address */
      // Can we send letters to your home address?
      claim.whereClaimantLives.correspondenceAddress === undefined ? undefined : row({
        changeHref: `${WP.LETTERS_ADDRESS}#f-letterAddress`,
        changeHtml: t(`letter-address:field.letterAddress.change${userType}`),
        key: t('letter-address:pageTitle'),
        value: rov('letter-address.letterAddress', 'letter-address:field.letterAddress.options', userType),
      }),

      // The address we should send letters to
      (claim.userIsDelegatedAuthority() || claim.hasSeparateContactAddress()) && row({
        changeHref: letterAddress.addressFrom === 'select'
          ? `${WP.LETTERS_ADDRESS_SELECT}#f-uprn`
          : `${WP.LETTERS_ADDRESS_MANUAL}#f-addressLine1`,
        changeHtml: t(`check-your-answers:lettersAddress.change${userType}`),
        key: t(`check-your-answers:lettersAddress.label${userType}`),
        valueHtml: formatAddress(letterAddress.address),
      }),
    ],
  };
};
