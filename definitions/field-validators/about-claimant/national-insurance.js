const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  nino: sf([
    r.required.bind({
      errorMsg: 'national-insurance:field.nino.required',
    }),
    r.nino.bind({
      errorMsg: 'national-insurance:field.nino.format',
      allowWhitespace: true,
    }),
  ]),
});

module.exports = fieldValidators;
