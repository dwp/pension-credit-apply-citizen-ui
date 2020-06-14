const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  preferredLanguage: sf([
    r.required.bind({
      errorMsg: 'claimant-language:field.preferredLanguage.required',
    }),
    // See journey/about-citizen.js for controls over residence/language combos.
    // Validation is currently not run during plan traversal, so protection
    // needs to be in route conditions.
    r.inArray.bind({
      source: ['english', 'welsh', 'other'],
      errorMsg: 'claimant-language:field.preferredLanguage.required',
    }),
  ]),
  preferredLanguageOther: sf([
    r.required.bind({
      errorMsg: 'claimant-language:field.preferredLanguageOther.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'claimant-language:field.preferredLanguageOther.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).preferredLanguage === 'other'
  )),
});

module.exports = fieldValidators;
