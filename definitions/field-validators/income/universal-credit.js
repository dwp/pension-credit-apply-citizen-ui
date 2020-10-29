const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  claimsUniversalCredit: sf([
    r.required.bind({
      errorMsg: 'universal-credit:field.claimsUniversalCredit.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'universal-credit:field.claimsUniversalCredit.required',
    }),
  ]),
});

module.exports = fieldValidators;
