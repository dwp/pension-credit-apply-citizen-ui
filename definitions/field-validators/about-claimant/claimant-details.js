const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  registeredBlind: sf([
    r.required.bind({
      errorMsg: 'claimant-details:field.registeredBlind.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimant-details:field.registeredBlind.required',
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
