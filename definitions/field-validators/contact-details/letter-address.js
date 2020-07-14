const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  letterAddress: sf([
    r.required.bind({
      errorMsg: 'letter-address:field.letterAddress.required',
    }),
    r.inArray.bind({
      source: ['homeAddress', 'differentAddress'],
      errorMsg: 'letter-address:field.letterAddress.required',
    }),
  ]),
});

module.exports = fieldValidators;
