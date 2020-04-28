const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  helpMakingClaim: sf([
    r.required.bind({
      errorMsg: 'claim-help:field.helpMakingClaim.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claim-help:field.helpMakingClaim.required',
    }),
  ]),
});

module.exports = fieldValidators;
