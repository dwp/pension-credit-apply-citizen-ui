const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerNino: sf([
    r.required.bind({
      errorMsg: 'partner-national-insurance:field.partnerNino.required',
    }),
    r.nino.bind({
      errorMsg: 'partner-national-insurance:field.partnerNino.format',
      allowWhitespace: true,
    }),
  ]),
});

module.exports = fieldValidators;
