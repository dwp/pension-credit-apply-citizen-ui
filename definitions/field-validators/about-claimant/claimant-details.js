const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const isValidTelephoneNumber = require('../../../utils/is-valid-telephone-number.js');

const fieldValidators = Object.assign(Object.create(null), {
  fullName: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.fullName.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'claimant-details:field.fullName.length',
    }),
  ]),
  hasPreviousNames: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.hasPreviousNames.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimant-details:field.hasPreviousNames.required',
    }),
  ]),
  previousNames: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.previousNames.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'claimant-details:field.previousNames.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).hasPreviousNames === 'yes'
  )),
  nino: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.nino.required',
    }),
    r.nino.bind({
      errorMsg: 'claimant-details:field.nino.format',
      allowWhitespace: true,
    }),
  ]),
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
  canSpeakEnglish: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.canSpeakEnglish.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimant-details:field.canSpeakEnglish.required',
    }),
  ]),
  firstLanguage: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.firstLanguage.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'claimant-details:field.firstLanguage.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).canSpeakEnglish === 'no'
  )),
  speakInWelsh: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.speakInWelsh.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimant-details:field.speakInWelsh.required',
    }),
  ]),
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
