const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidTelephoneNumber = require('../../../utils/is-valid-telephone-number.js');

const fieldValidators = Object.assign(Object.create(null), {
  contactTelephone: sf([
    r.strlen.bind({
      max: 20,
      errorMsgMax: 'claimant-details:field.contactTelephone.length',
    }),
    isValidTelephoneNumber({
      errorMsg: 'claimant-details:field.contactTelephone.format',
    }),
  ]),
  registeredBlind: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.registeredBlind.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimant-details:field.registeredBlind.required',
    }),
  ]),
  preferredLanguage: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.preferredLanguage.required',
    }),
    // See journey/about-citizen.js for controls over residence/language combos.
    // Validation is currently not run during plan traversal, so protection
    // needs to be in route conditions.
    r.inArray.bind({
      source: ['english', 'welsh', 'other'],
      errorMsg: 'claimant-details:field.preferredLanguage.required',
    }),
  ]),
  preferredLanguageOther: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.preferredLanguageOther.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'claimant-details:field.preferredLanguageOther.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).preferredLanguage === 'other'
  )),
  helpWithLettersPhone: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.helpWithLettersPhone.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimant-details:field.helpWithLettersPhone.required',
    }),
  ]),
});

module.exports = fieldValidators;
